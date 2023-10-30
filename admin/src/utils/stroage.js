/**
 * 本地存储二次封装
 */
const config = {
    stroageSpace: "hsueh"
}
export default {
    setItem(key, val) {
        let obj = this.getStroage();
        obj[key] = val;
        window.sessionStorage.setItem(config.stroageSpace, JSON.stringify(obj));
    },
    //获取本地已存储的数据
    getStroage() {
        return JSON.parse(window.sessionStorage.getItem(config.stroageSpace)) || {};
    },
    getItem(key) {
        return this.getStroage()[key];
    },
    clearItem(key) {
        let obj = this.getStroage();
        delete obj[key];
        window.sessionStorage.setItem(config.stroageSpace, JSON.stringify(obj));
    },
    clearAll() {
        window.sessionStorage.clear();
    }
}