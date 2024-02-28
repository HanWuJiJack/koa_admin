const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const path = require("path")
const redis = require(path.join(process.cwd(), "./config/Redis"))
const {
    logger
} = require(path.join(process.cwd(), "./config/Logger"))
const AutoID = require('./../../utils/AutoID')
const ApiRatelimit = require("./../../middleware/ApiRatelimit")
const ApiAuth = require("./../../middleware/ApiAuth")

class MenuAdminController extends BaseController {
    constructor({
        ctx = {
            state: {
                userInfo: {}
            }
        },
        next
    }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.userInfo = this.ctx.state.userInfo;
        this.url = "/admin/menu"
        this.middleLists = {
            "Get|list": [ApiAuth(["system:menu:list"]), ApiRatelimit(1, 3)],
            Create: [ApiAuth(["system:menu:post"]), ApiRatelimit(1, 1)],
            "Update:id": [ApiAuth(["system:menu:put"]), ApiRatelimit(1, 1)],
            "Remove:id": [ApiAuth(["system:menu:remove"]), ApiRatelimit(1, 1)],
            "Get|info:id": [ApiAuth(["system:menu:get"]), ApiRatelimit(1, 3)],
        }
    }
    // "Get|list" Get "Get:id"
    // Update "Update:id"
    // Create
    // Remove "Remove:ids"
    // | 代表拼接后端字符串
    // : 代表拼接后端动态路由
    async "Get|list"() {
        const userInfo = this.userInfo
        try {
            const {
                menuName,
                state = 1
            } = this.ctx.request.query;
            const params = {}
            if (menuName) params.menuName = new RegExp(`^${menuName}`, 'ig')
            params.state = parseInt(state);
            var rootList
            if (userInfo.role === 0) { // 0是超级管理员
                // console.log("params", params)
                rootList = await Schema.menusSchema.find(params) || []
            } else { // 1普通用户
                // 先根据用户的角色列表字段查出对应角色数据
                var roleData = await Schema.rolesSchema.find({
                    id: {
                        $in: userInfo.roleList
                    }
                })
                // 然后根据取出来的角色，取出角色拥有的菜单数据，多角色出现相同的对他进行合并，也就是并集了【去重处理】~
                var resultPermissonList = []
                roleData.forEach(item => {
                    resultPermissonList = resultPermissonList.concat([...item.permissionList.checkedKeys, ...item.permissionList.halfCheckedKeys])
                })
                resultPermissonList = [...new Set(resultPermissonList)] // 去重相同的菜单id
                rootList = await Schema.menusSchema.find({
                    ...params,
                    id: {
                        $in: resultPermissonList
                    },
                }) || []
            }
            const permissionList = super.TreeMenu(rootList, null)
            this.ctx.body = super.success({
                data: permissionList
            });
        } catch (error) {
            logger.error(error)
        }
    }

    async Create() {
        const {
            action,
            ...params
        } = this.ctx.request.body;
        let res, info;
        try {
            const currentIndex = await AutoID({
                code: "menuId"
            })
            params.id = currentIndex
            params.createByUser = this.ctx.state.userId.id
            res = await Schema.menusSchema.create(params)
            info = '创建成功'
            this.ctx.body = super.success({
                msg: info
            });
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            });
        }
    }
    async "Update:id"() {
        const {
            id,
            action,
            ...params
        } = this.ctx.request.body;

        let res, info;
        try {
            params.updateTime = new Date();
            params.updateByUser = this.ctx.state.userId.id
            res = await Schema.menusSchema.findOneAndUpdate({
                id
            }, params);
            info = '编辑成功'
            this.ctx.body = super.success({
                msg: info
            });
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            });
        }
    }
    async "Remove:id"() {
        const {
            id,
        } = this.ctx.request.body;
        let res, info;
        try {
            const menusInfo = await Schema.menusSchema.findOne({
                parentId: {
                    $all: [id]
                },
                state: 1
            })
            if (menusInfo) {
                this.ctx.body = super.fail({
                    msg: "请先将子集删除！"
                });
                return
            }

            const rolesInfo = await Schema.rolesSchema.findOne({
                $or: [{
                        "permissionList.checkedKeys": {
                            $all: [id]
                        }
                    },
                    {
                        "permissionList.permissionList": {
                            $all: [id]
                        }
                    }
                ]
            })
            // console.log("rolesInfo", rolesInfo)
            if (rolesInfo) {
                this.ctx.body = super.fail({
                    msg: "请先将绑定的角色删除！"
                });
                return
            }
            res = await Schema.menusSchema.findOneAndUpdate({
                id
            }, {
                state: 2
            });
            info = '删除成功'
            this.ctx.body = super.success({
                msg: info
            });
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            });
        }
    }
    async "Get|info:id"() {
        try {
            const {
                id
            } = this.ctx.params
            const params = {}
            if (id) params.id = id
            const query = await Schema.menusSchema.findOne(params) // 查询所有数据
            this.ctx.body = super.success({
                data: {
                    ...query._doc
                }
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }

    async "Get|list_permisson_menu"() {
        const userInfo = this.userInfo
        const {
            btnList,
            menuList,
            routeList,
        } = await super.list_menu(userInfo.role, userInfo.roleList)
        await redis.setHashMap(String(userInfo.id), {
            btnList
        })
        this.ctx.body = super.success({
            data: {
                menuList,
                btnList,
                routeList
            }
        })
    }
}

module.exports = MenuAdminController;