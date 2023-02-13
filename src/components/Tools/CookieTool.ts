export default class CookieUtil {
    static get(name:string) {
        let cookieName = `${encodeURIComponent(name)}`,
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }

        return cookieValue;
    }

    static set(name:string, value:string, expires:any = null, path:string = '', domain:string = '', secure:boolean = false) {
        let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
        if (expires instanceof Date) {
            cookieText += `; expires=${expires.toUTCString()}`; //toGMTString() 被废除了，用这个返回的结果一样
        }
        if (path) {
            cookieText += `; path=${path}`;
        }
        if (domain) {
            cookieText += `; domain=${domain}`;
        }
        if (secure) {
            cookieText += `; secure`;
        }

        document.cookie = cookieText;
    }

    static unset(name:string) { //没有直接的删除方法，所以用过期时间特性进行删除
        CookieUtil.set(name, "", new Date(0));
    }
}