import { expect } from "chai";
import { FlexibleStorage } from "../src";
import { Moment } from "moment";

const MemoryStorage = require("memorystorage");

describe("FlexibleStorage", () => {
    const storage: Storage = MemoryStorage("local-cache-test");
    const prefix = (key: string) => "<key>" + key + "</key>";
    const cache: FlexibleStorage = new FlexibleStorage(storage, prefix);

    const defaultCacheKey = "defaultCacheKey";
    const defaultStorageKey = prefix(defaultCacheKey);

    afterEach(() => {
        storage.clear();
    });

    describe("default buildKey()", () => {
        const cacheWithDefaultBuildKey = new FlexibleStorage(storage, "prefix_");
        expect(cacheWithDefaultBuildKey.buildKey("key")).to.be.equal("prefix_key");

        const cacheWithNoKeyPrefix = new FlexibleStorage(storage);
        expect(cacheWithNoKeyPrefix.buildKey("key")).to.equal("key");
    });

    describe("exists()", () => {
        it("should return false if not JSON stored", () => {
            storage.setItem(defaultStorageKey, "notJsonString");
            expect(cache.exists(defaultCacheKey)).to.be.false;
        });
        it("should return false if stored JSON does not contain object", () => {
            storage.setItem(defaultStorageKey, "[]");
            expect(cache.exists(defaultCacheKey)).to.be.false;
        });
        it("should return false if object with no `expires` or `value` stored", () => {
            storage.setItem(defaultStorageKey, JSON.stringify({ value: 1 }));
            expect(cache.exists(defaultCacheKey)).to.be.false;
            storage.setItem(defaultStorageKey, JSON.stringify({ expires: new Date() }));
            expect(cache.exists(defaultCacheKey)).to.be.false;
        });
        it("should return false if key expired", () => {
            storage.setItem(defaultStorageKey, JSON.stringify({
                value: 1,
                expires: new Date().getTime() - 1000,
            }));
            expect(cache.exists(defaultCacheKey)).to.be.false;
        })
        it("should return true if stored object valid and not expired", () => {
            storage.setItem(defaultStorageKey, JSON.stringify({
                value: 1,
                expires: new Date().getTime() + 1000,
            }));
            expect(cache.exists(defaultCacheKey)).to.be.true;
        })
    })

    describe("pull()", () => {
        it("should run validator with undefiend if no data stored", () => {
            const validatorReturnValue = "abc";
            const testValidator = (value: string | undefined) => {
                expect(value).to.be.undefined;
                return validatorReturnValue;
            };
            expect(cache.pull(defaultCacheKey, testValidator)).to.be.equal(validatorReturnValue);
        })
        it("should run validator with stored value", () => {
            const validatorReturnValue = 4;
            const storedValue = 2;
            const testValidator = (value: number | undefined): number => {
                expect(value).to.be.equal(storedValue);
                return validatorReturnValue;
            };
            cache.push(defaultCacheKey, storedValue);
            expect(cache.pull<number>(defaultCacheKey, testValidator)).to.be.equal(validatorReturnValue);
        });
    })

    describe("push()", () => {
        it("should save JSON represantation to storage", () => {
            const value = {
                key: "value",
            };

            cache.push(defaultCacheKey, value);

            const cachedValue = JSON.parse(storage.getItem(defaultStorageKey));
            expect(cachedValue).to.have.property("value");
            expect(cachedValue).to.have.property("expires");

            expect(cachedValue.value).to.have.property("key");
            expect(cachedValue.value.key).to.be.equal("value");
        });

        it("should save passed native expire Date", () => {
            const expires = new Date();
            expires.setMonth(expires.getMonth());

            cache.push(defaultCacheKey, undefined, expires);

            const cachedValue = JSON.parse(storage.getItem(defaultStorageKey));
            expect(cachedValue).to.have.property("expires");
            expect(cachedValue.expires).to.be.equal(expires.valueOf());
        });

        it("should save passed Moment instance timestamp value", () => {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);

            // consider, it is Moment instance with toDate function that return native Date instance
            const expires = {
                toDate: () => {
                    return date;
                }
            };

            cache.push(defaultCacheKey, undefined, expires as Moment);

            const cachedValue = JSON.parse(storage.getItem(defaultStorageKey));
            expect(cachedValue).to.have.property("expires");
            expect(cachedValue.expires).to.be.equal(date.valueOf());
        })
    });

    describe("remove()", () => {
        it("should remove value from storage considering prefix", () => {
            const value = "value";

            storage.setItem(defaultStorageKey, value);
            cache.remove(defaultCacheKey);
            expect(storage.getItem(defaultStorageKey)).to.not.exist;
        });
    });
});
