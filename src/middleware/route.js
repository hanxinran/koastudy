/**
 * Created by hasee on 2017/12/13.
 */
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
moudle.export =  async function route(url) {
    let filename = `./views/${url}.html`;
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}
