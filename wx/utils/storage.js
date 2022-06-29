module.exports =  {
    storagePreifx:'STORAGE_PRE_',
    setStorage(key, value) {		//  设置Storage    key:设置的名称。value：设置的内容
        let curTime = new Date().getTime();
        wx.setStorageSync(this.storagePreifx +key, JSON.stringify({ data: value, time: curTime }));
    },
    getStorage: function (key, day = 3) {  //  获取Storage		key:获取的名称。day：超过过期的天数
        let data = wx.getStorageSync(this.storagePreifx +key);
        if (data) {
            let dataObj = JSON.parse(data);
            if (new Date().getTime() - dataObj.time > 1000 * 60 * 60 * 24 * day) {
                return false;
            } else {
                let dataObjDatatoJson = dataObj.data;
                return dataObjDatatoJson;
            }
        } else {
            return false;
        }
    },
    removeStorage: function (key) {
        wx.removeStorageSync(this.storagePreifx + key + '');
    },
}
