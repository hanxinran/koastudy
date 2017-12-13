/**
 * Created by hasee on 2017/12/13.
 */
const Koa = require('koa');
let querystring = require('querystring');
const app = new Koa();
moudle.export =async function parseBody(req){
    return new Promise(function(resolve,reject){
        let buffers = [];
        req.on('data',function(data){
            buffers.push(data);
        });
        req.on('end',function(){
            let result = Buffer.concat(buffers).toString();
            resolve(querystring.parse(result));
        });
        req.on('err',function(err){
            reject(err);
        });
    });
}