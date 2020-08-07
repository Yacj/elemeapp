/*Cookie*/
// setCookie("username",'101',365);
// console.log(getCookie('username'))
//  delCookie('username')
export let cookie = {
    setCookie(name, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = name + "=" + cvalue + "; " + expires;
    },
    getCookie(name) {
        var name = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }

}

/*storage*/
/*
storage.set('list',''list);
storage.get('list')
*/
export let storage = {
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    get(key){

        return JSON.parse(localStorage.getItem(key))
    },
    remove(key){
        localStorage.removeItem(key)
    }
}

/*验证手机号*/
/**
 * @param { string } value
 */
export const isPhone = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value);

/* 数字加逗号*/
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/*微信*/
export  const wxBrowser = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) === "micromessenger"

export  const isUndef = (v) => {
    return v === undefined || v === null
}


