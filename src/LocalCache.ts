import {Moment} from "moment";

export class FlexibleStorage {
    public buildKey: (key: string) => string;
    protected storage: Storage;

    constructor(storage: Storage, keyPrefix: string | ((key: string) => string) = "") {
        this.storage = storage;
        this.buildKey = "function" === typeof keyPrefix
            ? keyPrefix
            : (key: string) => keyPrefix + key;
    }

    public exists(key: string): boolean {
        key = this.buildKey(key);
        const cached = this.storage.getItem(key);
        if (!cached) {
            return false;
        }
        try {
            const value = JSON.parse(cached);

            if ("object" !== typeof value || !value.hasOwnProperty("expires") || !value.hasOwnProperty("value")) {
                throw new Error(`Invalid cache value on ${key}`);
            }
            if (new Date().getTime() >= value.expires) {
                throw new Error(`Cache for ${key} should be invalidated`);
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    public pull = <T = any>(key: string, validator: (value?: T) => T | void = this.defaultValidator): T => {
        if (!this.exists(key)) {
            return validator() as T;
        }

        const {value} = JSON.parse(this.storage.getItem(this.buildKey(key)));

        return validator(value) as T;
    };

    public push = (key: string, value: any, expires?: Moment | Date) => {
        key = this.buildKey(key);

        const m = expires as Moment;
        let date: Date;

        if (expires) {
            date = "toDate" in m ? m.toDate() : expires as Date;
        } else {
            date = new Date();
            date.setMonth(date.getMonth() + 1);
        }

        const cache = {
            expires: date.getTime(),
            value,
        };
        this.storage.setItem(key, JSON.stringify(cache));
    };

    public remove(key: string): void {
        this.storage.removeItem(this.buildKey(key));
    }

    protected defaultValidator = (value: any): any | undefined => {
        return value;
    }
}
