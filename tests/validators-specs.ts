import { expect } from "chai";
import { arrayOrEmptyArray, objectOrUndefined, arrayOrUndefined, stringOrUndefined, numberOrUndefined } from "../src";

describe("validators", () => {
    describe("arrayOrEmptyArray()", () => {
        it("should return passed value if it is array", () => {
            const arr = [1, 2, 3];
            expect(arrayOrEmptyArray(arr)).to.be.equal(arr);
        })
        it("should return empty array if not array passed", () => {
            expect(arrayOrEmptyArray()).to.be.instanceOf(Array).and.empty;
            expect(arrayOrEmptyArray({} as any)).to.be.instanceOf(Array).and.empty;
            expect(arrayOrEmptyArray(2 as any)).to.be.instanceOf(Array).and.empty;
        });
    });
    describe("arrayOrUndefined()", () => {
        it("should return passed value if it is array", () => {
            const arr = [1, 2, 3];
            expect(arrayOrEmptyArray(arr)).to.be.equal(arr);
        });
        it("should return nothing if not array passed", () => {
            expect(arrayOrUndefined()).to.be.undefined;
            expect(arrayOrUndefined({} as any)).to.be.undefined;
            expect(arrayOrUndefined(2 as any)).to.be.undefined;
        });
    })
    describe("objectOrUndefined()", () => {
        it("should return passed value if it is object", () => {
            const obj = {};
            expect(objectOrUndefined(obj)).to.be.equal(obj);
        });
        it("should return undefined if not object passed", () => {
            expect(objectOrUndefined()).to.be.undefined;
            expect(objectOrUndefined(2 as any)).to.be.undefined;
        });
    })
    describe("stringOrUndefined()", () => {
        it("should return passed value if it is string", () => {
            const str = "string";
            expect(stringOrUndefined(str)).to.be.equal(str);
        });
        it("should return undefined if not string passed", () => {
            expect(stringOrUndefined()).to.be.undefined;
            expect(stringOrUndefined(2 as any)).to.be.undefined;
        });
    })
    describe("numberOrUndefined()", () => {
        it("should return passed value if it is number", () => {
            const num = Math.random();
            expect(numberOrUndefined(num)).to.be.equal(num);
        });
        it("should return undefined if not number passed", () => {
            expect(numberOrUndefined()).to.be.undefined;
            expect(numberOrUndefined({} as any)).to.be.undefined;
        });
    })
});
