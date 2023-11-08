# 功能介绍 
基础框架：后端：koa+mongodb;前端：vue3+Element Plus  
系统核心功能：权限管理、token验权、token续期、Rsa加密登录账户信息、功能即服务（FaaS）、接口权限控制、接口级别限流、动态表单等。  
## 本项目（约定优于配置）有以下约定

#### 类内部函数方法名包含以下
```
    if (key.indexOf('Get') > -1) {
        return 'get'
    }
    if (key.indexOf('Create') > -1) {
        return 'post'
    }
    if (key.indexOf('Update') > -1) {
        return 'put'
    }
    if (key.indexOf('Remove') > -1) {
        return 'delete'
    }
```

# 云函数使用流程

首先在模型管理内部添加模型
 
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
在faas函数模块添加具体函数
```
module.exports = async () => {
    await ApiAuth({
            userInfo: ctx.state.userInfo,
            code: ["faas:form:list"]
    })
    const {
        name,
        state = 1
    } = ctx.request.query
    const {
        page,
        skipIndex
    } = Tools.pager(ctx.request.query)
    const params = {}
    if (name) params.name = new RegExp(`${name}`, 'ig')
    params.state = parseInt(state);
    const query = modelSchemas.formSchema.find(params)
    const list = await query.sort({
        id: -1
    }).skip(skipIndex).limit(page.pageSize)
    const total = await modelSchemas.formSchema.countDocuments(params);
    return Tools.success({
        data: {
            page: {
                ...page,
                total
            },
            list
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
            code: ["faas:form:list"]
    })
    const {
        name,
        state = 1
    } = ctx.request.query
    const {
        page,
        skipIndex
    } = Tools.pager(ctx.request.query)
    const params = {}
    if (name) params.name = new RegExp(`${name}`, 'ig')
    params.state = parseInt(state);
    const query = modelSchemas.formSchema.find(params)
    const list = await query.sort({
        id: -1
    }).skip(skipIndex).limit(page.pageSize)
    const total = await modelSchemas.formSchema.countDocuments(params);
    return Tools.success({
        data: {
            page: {
                ...page,
                total
            },
            list
        }
    })
}
```

# 数据库基础数据
数据库基础数据 查看db文件夹

<!--### mongoose.Schema 支持类型  
 [https://mongoosejs.com/docs/guide.html]
 String
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
    "Get|list" Get "Get:id" 
    Update "Update:id" 
    Create 
    Remove "Remove:ids" 
    
    | 代表拼接后端字符串 
    : 代表拼接后端动态路由 
    

    例如:  
    "Get|list:id"

    path:list/:id 
    method:get  


<!-- # 体验 -->
<!-- [后台管理系统链接](https://s1.z100.vip:8555/vue/welcome) -->
<!-- 
账户：admin@qq.com

密码：123456 -->

## 运行
yarn dev : 单线程线程运行模式
yarn cluster : 多线程运行模式（默认本地电脑cpu线程数/2） (具体查看cluster.js)
