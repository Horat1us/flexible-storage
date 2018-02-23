export function arrayOrEmptyArray(value?: Array<any>) {
    return Array.isArray(value) ? value : [];
}

export function arrayOrUndefined(value?: Array<any>) {
    return Array.isArray(value) ? value : undefined;
}

export function objectOrUndefined(value?: object) {
    return "object" === typeof value ? value : undefined;
}

export function stringOrUndefined(value?: string) {
    return "string" === typeof value ? value : undefined;
}

export function numberOrUndefined(value?: number) {
    return "number" === typeof value ? value : undefined;
}
