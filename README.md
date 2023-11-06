# 功能介绍 
基础框架：后端：koa+mongodb;前端：vue3+Element Plus  
系统核心功能：权限管理、token验权、token续期、Rsa加密登录账户信息、功能即服务（FaaS）、接口权限控制、动态表单等。  
## 本项目（约定优于配置）有以下约定

#### 类内部函数方法名包含以下 如：list、get、create、update、remove、del等会默认使用以下对应的method进行请求 
```
if (key.indexOf('list') > -1) {
        return 'get'
    }
    if (key.indexOf('get') > -1) {
        return 'get'
    }
    if (key.indexOf('create') > -1) {
        return 'post'
    }
    if (key.indexOf('update') > -1) {
        return 'put'
    }
    if (key.indexOf('remove') > -1) {
        return 'delete'
    }
    if (key.indexOf('del') > -1) {
        return 'delete'
    }
```

#### 请求地址默认为 类内部url字段+当前函数名，如果配置了prefix字段 格式为：prefix+类内部url字段+当前函数名

```
    let api = controller.url + '/' + keys[i]
    if (keys[i].indexOf('get') > -1) {
        api+=`/:id`
    }
    if (keys[i].indexOf('update') > -1) {
        api+=`/:id`
    }
    if (keys[i].indexOf('remove') > -1) {
        api+=`/:ids`
    }
```


# 云函数使用流程

将model 加入Schema_type字典中  
约定-例如： 
字典键值：model100001-test1（请严格遵守此格式） 

字典标签： 
```
module.exports = async () => {
    modelSchemas.formSchema = mongoose.model('form', mongoose.Schema({
        id: Number,
        "state": {
            type: Number,
            default: 1
        },
        "name": String,
        "code": String,
        "config": mongoose.Schema.Types.Mixed,
        "createTime": {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        },
        updateByUser:Number,
        createTime: {
            type: Date,
            default: Date.now()
        },
        createByUser:Number,
        remark: String
    }, {
        autoCreate: true
    }), 'form')
}

```
具体实现函数 在faas模块中添加具体的方法
```
module.exports = async () => {
    await ApiAuth({
            userInfo: ctx.state.userInfo,
            code: ["faas:form:get"]
    })
    const {
        id,
    } = ctx.request.query
    if (!id) {
        throw ExceptionCode.INVALID_PARAMS
    }
    const params = {}
    params.id = parseInt(id);
    const query = await modelSchemas.formSchema.findOne(params)

    return Tools.success({
        data: {
            ...query._doc
        }
    })
}
```

# 接口权限设置
核心逻辑：ApiAuth函数 如果列表中不存在权限字段 然后进行抛错 通过GlobalException中间件进行捕获处理

```
module.exports = async () => {
    await ApiAuth({
            userInfo: ctx.state.userInfo,
            code: ["faas:form:get"]
    })
    const {
        id,
    } = ctx.request.query
    if (!id) {
        throw ExceptionCode.INVALID_PARAMS
    }
    const params = {}
    params.id = parseInt(id);
    const query = await modelSchemas.formSchema.findOne(params)

    return Tools.success({
        data: {
            ...query._doc
        }
    })
}
```

# 数据库基础数据
数据库基础数据 查看db文件夹

### mongoose.Schema 支持类型  
 [https://mongoosejs.com/docs/guide.html]
<!-- String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map -->

###  Controller写法
    // async list(){}
    结果：
        url：xxx/list
        method: get

    例如：
    // async list_all(){}
    结果：
        url：xxx/list_all
        method: get 


    // async get(){}

    结果：
        url：xxx/get
        method: get

    // async create(){}
    结果：
        url：xxx/create
        method: post 

    // async update(){}
    结果：
        url：xxx/update
        method: put 

    // async remove(){}
    结果：
        url：xxx/remove
        method: delete 

# 体验
<!-- [后台管理系统链接](https://s1.z100.vip:8555/vue/welcome) -->

账户：admin@qq.com

密码：123456

## 运行
yarn dev : 单线程线程运行模式
yarn cluster : 多线程运行模式（默认本地电脑cpu线程数/2） (具体查看cluster.js)
