const Router = require('koa-router')
const query = require('../mysql/query')
const router = new Router()
const addToken = require('../token/token')
let SELECT_SQL = `select * from user where userPhone=?`
let INSERT_SQL = `insert into user (userPhone,userPassword) values ('','')`
router.post('/login', async (ctx) => {
    let res = JSON.stringify(ctx.request.body)
    res = JSON.parse(res)
    let password;
    if (res.passowrd === undefined) {
        password = 0
    } else {
        password = res.passowrd
    }
    const phone = res.phone
    // let login = await query(`select * from user where userPhone=${phone}`)
    let uuid = require('node-uuid');
    let uid = uuid.v1();
    console.info(phone+uid);
    // if (login.results.length === 0) {
    //     const insert = await query( `insert into user (userPhone,userPassword) values ('${phone}','${password}')`)
    //     let id = insert.results.insertId
    //     let userToken = addToken({
    //         user:phone,
    //         id
    //     })
    //     ctx.body = {
    //       userToken,
    //       code:200
    //     }
    // }else{
    //
    // }
    // const data = await query( `insert into user (userPhone,userPassword) values ('${phone}','${password}')`)
    // console.log(data.results.insertId)
})
module.exports = router