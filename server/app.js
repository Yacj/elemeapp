let Koa = require('koa');//引入koa
let app = new Koa();
//引入bodyparser解析post传递的参数
let bodyparser=require('koa-bodyparser')
//引入koa-router中间件
let Router = require('koa-router');
const cors=require('koa2-cors')   //引入

let router = new Router();
//引入路由
let index=require('./router/router');
let city = require('./router/city');
let user = require('./router/user')
//使用路由
router.use('/',index.routes())
router.use('/city',city.routes())
router.use('/user',user.routes())

app.use(cors())
app.use(bodyparser());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8866);