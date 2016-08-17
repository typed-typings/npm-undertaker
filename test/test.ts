
import * as fs from 'fs';
import { Registry }  from 'undertaker';
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

let registry: Registry;
function CommonRegistry(options: { buildDir: string }): Registry {
    return registry;
}

taker = new Undertaker(CommonRegistry({ buildDir: '/dist' }));

taker.task('build', taker.series('clean', function build(cb: () => void) {
    // do things
    cb();
}));
