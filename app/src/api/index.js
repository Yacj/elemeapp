import axios from 'axios'
import qs from 'qs'

// 请求响应时间
axios.defaults.timeout = 50000;
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'
// 请求代理
axios.defaults.baseURL = 'http://localhost:8866';
// axios.defaults.baseURL = '/api';

//  axios.interceptors.request.use(config => {
//     config.headers.Authorization = getStorage("token")
//     return config
// })

// /**
//  * 封装get方法
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        var uuid = localStorage.getItem("uid");
        if (!uuid) {
            uuid = ''
        }
        axios.get(url, {
            params: params,
            headers: {
                'sessionKey': uuid
            },
            /* 请求头加上特定数据如token等 如不需要可以删除 */
        })
            .then(response => {
                if (response.errcode == 1003) {
                    // 特定状态码判断
                }
                resolve(response.data);
                // console.log(response.data.errcode)
                // console.log(JSON.stringify(response))
            })
            .catch(err => {
                reject(err)
            })
    })
}


// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        var uuid = localStorage.getItem("uid");
        if (!uuid) {
            uuid = ''
        }
        /* qs.stringify(params) formdata格式转换
           不需要formdata 改成 JSON.stringify(params) 把 content-type 删除*/
        axios.post(url, qs.stringify(params), {
            headers: {
                'sessionKey': uuid,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                if (response.errcode == 1003) {
                    // 特定状态码判断
                }
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}