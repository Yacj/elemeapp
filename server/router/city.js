const query = require('../mysql/query')
let Router = require('koa-router')
let router = new Router()
const QUERY_SQL = `select * from city`
const SELECT_SQL = `select * from city where district_name=?`

router.get('/cityList', async ctx => {
    const data = await query(QUERY_SQL)
    ctx.body = {
        code: 200,
        data,
    };
})

router.post('/citySearch', async (ctx, next) => {
    let res = JSON.stringify(ctx.request.body)
        res = JSON.parse(res)
    const name = res.name;
    const data = await query(SELECT_SQL,name)
    ctx.body = {
        status:200,
        data
    }
})

module.exports = router