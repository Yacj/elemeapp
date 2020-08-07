const mysql = require('mysql')
const MYSQL_CONFIG = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'eleapp', //数据库名
}

let pools = {};
if (!pools.hasOwnProperty('data')) {
    pools['data'] = mysql.createPool(MYSQL_CONFIG);
}

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        //初始化连接池
        pools['data'].getConnection((err, connection) => {
            if (err) {
                console.log(err,'数据库连接失败');
            }
            else{
                console.log('数据库连接成功');
                //操作数据库
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        connection.release();
                        resolve({
                            status: 200,
                            results
                        });
                    }
                });
            }
        })
    });
}
module.exports =  query