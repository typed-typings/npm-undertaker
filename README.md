# Typed undertaker
[![Build Status](https://travis-ci.org/types/npm-undertaker.svg?branch=master)](https://travis-ci.org/types/npm-undertaker)

Typescript Typings for [undertaker](https://www.npmjs.com/package/undertaker).

## Installation
```sh
typings install --save undertaker
```

## Usage

```ts
import * as fs from 'fs';
import Undertaker = require('undertaker');

let taker = new Undertaker();

taker.task('task1', cb => {
    // do things

    cb(); // when everything is done
});

taker.task('task2', () => {
    return fs.createReadStream('./myFile.js')
        .pipe(fs.createWriteStream('./myFile.copy.js'));
});

taker.task('task3', () => {
    return new Promise((resolve, reject) => {
        // do things

        resolve(); // when everything is done
    });
});

taker.task('combined', taker.series('task1', 'task2'));

taker.task('all', taker.parallel('combined', 'task3'));
```

[More examples](./test)


## Contributing
You can run them the tests with `npm run build` and `npm run test`.

--------------------------------

_Based on typings by [Qubo](https://github.com/tkqubo)_
