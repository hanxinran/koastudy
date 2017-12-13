/**
 * Created by hasee on 2017/12/13.
 */

let Koa = require('koa');
let app = new Koa();
const path = require('path');
const static = require('koa-static');
const route = require('./middleware/route')
const parseBody = require('./middleware/body-parser');


app.use(static(
    path.resolve('./static')
));
app.use(ctx => {
    let visit = ctx.cookies.get('visit');
    if(visit){
        visit = parseInt(visit)+1;
    }else {
        visit = 1;
    }
    ctx.cookies.set('visit',visit);
    ctx.body = `这是你的第${visit}次访问`;
});
app.use(async ctx => {
    let html = await route(ctx.request.url);
    ctx.body = html;
});

const session = require('koa-session');
app.keys = ['some secret hurr'];
let options = {

}
app.use(session(options,app));
app.use(ctx=>{
    let visit = ctx.session.visit;
    if(visit){
        visit = visit + 1;
    }else{
        visit = 1;
    }
    ctx.session.visit = visit;
    ctx.body = `${visit}`;
});
app.use(async ctx => {
    if (ctx.request.url == '/' && ctx.request.method == 'GET') {
        ctx.body = (
            `
        <form method="post"><input type="text" name="username"/><input type="submit"/></form>
      `
        )
    } else if (ctx.request.url == '/' && ctx.request.method == 'POST') {
        let html = await parseBody(ctx.req);
        ctx.body = html;
    }else{
        ctx.body = '404';
    }
});
app.listen(3000);