# Flexible Storage
[![Build Status](https://travis-ci.org/Horat1us/flexible-storage.svg?branch=master)](https://travis-ci.org/Horat1us/flexible-storage)
[![codecov](https://codecov.io/gh/Horat1us/flexible-storage/branch/master/graph/badge.svg)](https://codecov.io/gh/Horat1us/flexible-storage)

Module for front-end storage using LocalStorage (or any [another Storage](https://developer.mozilla.org/ru/docs/Web/API/Storage)).  
It introduces some features:
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
You can use default import to use FlexibleStorage with Local

### Instantiating
```typescript
import { FlexibleStorage } from "flexible-cache";

// Using Session Storage and some string prefix
const sessionFlexibleStorage = new FlexibleStorage(
    window.sessionStorage,
    'some_prefix_' // this prefix will be used internally when working with storage
);

// Using Local Storage and function prefix
const prefix = (key) => "<key>" + key + "</key>";
const FlexibleStorage = new FlexibleStorage(window.localStorage, prefix);
```
*Note: prefix may be skipped*

### Caching values
```typescript
import { FlexibleStorage } from "flexible-cache";

const expires = new Date(); // also can be Moment.js instance
const flexibleStorage = new FlexibleStorage(localStorage);

flexibleStorage.push('key', {
    someProperty: 2,
}, expires);
```
### Getting values
```typescript
import { FlexibleStorage }, { arrayOrEmptyArray } from "flexible-cache";

const flexibleStorage = new FlexibleStorage(localStorage);
// Value will be stored array or empty array if nothing stored
let value = flexibleStorage.pull('key', arrayOrEmptyArray);
// Just to pull value with validating only key expiring
value = flexibleStorage.pull('key');
```
Find more validators [here](./src/validators.ts)

### Other

```typescript
import { FlexibleStorage } from "flexible-cache";

const flexibleStorage = new FlexibleStorage(localStorage, 'prefix_');
flexibleStorage.exists('key'); // will try to find and validate `prefix_key` in LocalStorage
flexibleStorage.remove('key'); // will remove `prefix_key` from LocalStorage
``` 

## Testing
```bash
npm test
```

## Author
[Alexander <horat1us> Letnikow](mailto:reclamme@gmail.com)