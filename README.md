# Local Cache
[![Build Status](https://travis-ci.org/Horat1us/flexible-storage.svg?branch=master)](https://travis-ci.org/Horat1us/flexible-storage)
[![codecov](https://codecov.io/gh/Horat1us/flexible-storage/branch/master/graph/badge.svg)(https://codecov.io/gh/Horat1us/flexible-storage)

Module for front-end cache storage using LocalStorage (or any [another Storage](https://developer.mozilla.org/ru/docs/Web/API/Storage)).  
Main features:
- allows choose between localStorage and sessionStorage
- define expiration date (using Moment or native Date instance)
- define storage key prefix or filter
- store any object as JSON
- written on TypeScript and includes TypeScript definition files

## Installation
Using NPM:

```bash
npm i --save flexible-cache
```

## Usage
You can use default import to use LocalCache with Local

### Instantiating
```typescript
import {LocalCache} from "flexible-cache";

// Using Session Storage and some string prefix
const sessionLocalCache = new LocalCache(
    window.sessionStorage,
    'some_prefix_' // this prefix will be used internally when working with storage
);

// Using Local Storage and function prefix
const prefix = (key) => "<key>" + key + "</key>";
const localCache = new LocalCache(window.localStorage, prefix);
```
*Note: prefix may be skipped*

### Caching values
```typescript
import localCache from "flexible-cache";

const expires = new Date(); // also can be Moment.js instance

localCache.push('key', {
    someProperty: 2,
}, expires);
```
### Getting values
```typescript
import localCache, {arrayOrEmptyArray} from "flexible-cache";

// Value will be stored array or empty array if nothing stored
let value = localCache.pull('key', arrayOrEmptyArray);
// Just to pull value with validating only key expiring
value = localCache.pull('key');
```
Find more validators [here](./src/validators.ts)

### Other

```typescript
import {LocalCache} from "flexible-cache";

const localCache = new LocalCache(localStorage, 'prefix_');
localCache.exists('key'); // will try to find and validate `prefix_key` in LocalStorage
localCache.remove('key'); // will remove `prefix_key` from LocalStorage
``` 

## Testing
```bash
npm test
```

## Author
[Alexander <horat1us> Letnikow](mailto:reclamme@gmail.com)