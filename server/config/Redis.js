const redis = require('redis');

// exprires:单位秒

class Redis {
    async init(data) {
        if(!data){
            data = {}
        }
        const {
            username = null,
            password = null,
            host = "127.0.0.1",
            port = '6379',
            dbnumber = 0
        } = data
        
        this.username = username
        this.password = password
        this.host = host
        this.port = port
        this.dbnumber = dbnumber

        this.redisClient = await redis.createClient({
                // `redis[s]://[[username][:password]@][host][:port][/db-number]`
                url: this.username ? `redis://${this.username}:${ this.password}@${ this.host}:${ this.port}/${ this.dbnumber}` : `redis://${this.host}:${this.port}/${this.dbnumber}`,
            })
            .on('ready', () => {
                console.log('Redis Client: ready')
            })
            .on('connect', () => {
                console.log(new Date(), 'redis is now connected!');
            })
            .on('reconnecting', () => {
                console.log(new Date(), 'redis reconnecting', arguments);
            })
            .on('end', () => {
                console.log('Redis Closed!');
            })
            .on('warning', () => {
                console.log('Redis client: warning', arguments);
            })
            .on('error', err => {
                console.log('Redis Error ' + err);
            })

        // 判断redis是否连接
        if (this.redisClient.isOpen) {
            console.log('rredis is now connected!')
        } else {
            await this.redisClient.connect()
        }
    }

    async contect() {
        await this.redisClient.connect()
    }

    async quit() {
        await this.redisClient.quit();
    }

    // 判断是否有值 1|0
    async exists(key) {
        return await this.redisClient.exists(key)
    }

    // 给key添加过期时间
    async expire(key, exprires) {
        await this.redisClient.expire(key, exprires);
    }

    async setString(key, value, exprires) {
        if (typeof value !== 'string') {
            throw new Error("value类型为：string")
        }
        // set(key,value,[EX|PX],[NX|XX])
        // 描述：set设置key为保持字符串value
        // KEY：键名
        // VALUE:键值
        // EX:设置指定的过期时间，以秒为单位
        // PX:设置指定的过期时间，以毫秒为单位
        // NX:仅设置密钥（如果密钥尚不存在）
        // XX:仅设置密钥（如果密钥已存在）
        if (exprires) {
            return await this.redisClient.set(key, value, {
                EX: exprires,
            })
        } else {
            return await this.redisClient.set(key, value)
        }

    }

    async getString(key) {
        // res | null
        return await this.redisClient.get(key);
    }

    async setHashMap(key, value, exprires) {
        if (Object.prototype.toString.call(value) !== '[object Object]') {
            throw new Error("value类型为：object")
        }
        this.setString(key, JSON.stringify(value), exprires)
    }

    async getHashMap(key) {
        const result = await this.getString(key)
        return JSON.parse(result)
    }

    async setList(key, value, exprires) {
        if (Object.prototype.toString.call(value) !== '[object Array]') {
            throw new Error("value类型为：Array")
        }
        this.setString(key, JSON.stringify(value), exprires)
    }

    async getList(key) {
        return await this.getHashMap(key)
    }


    async remove(key) {
        return await this.redisClient.del(key)
    }

    // push 将给定值推入列表的右端 返回值 当前列表长度
    async rPush(key, list) {
        await this.redisClient.rPush(key, list)
    }

    // 查询list的值
    async lrange(key, startIndex = 0, stopIndex = -1) {
        return await this.redisClient.lRange(key, startIndex, stopIndex)
    }

    // 清除list中n个值为value的项
    async lrem(key, n = 1, value) {
        return await this.redisClient.lRem(key, n, value)
    }

    // lpop 从列表左端弹出一个值，并返回被弹出的值 lpop('key')
    async lpop(key) {
        return await this.redisClient.lPop(key)
    }
    // rpop 从列表右端弹出一个值，并返回被弹出的值 rpop('key')
    async rpop(key) {
        return await this.redisClient.rPop(key)
    }

    async publish(channel, value) {
        if (typeof value !== 'string') {
            throw new Error("value类型为：string")
        }
        await this.redisClient.publish(channel, value);
    }

    duplicate() {
        return this.redisClient.duplicate()
    }
}

module.exports = new Redis();