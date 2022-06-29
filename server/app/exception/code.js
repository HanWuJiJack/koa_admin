module.exports = {
     /*------ 通用错误码 1000~9999 ------*/
  // 参数错误
  UNDEFINED: {
    code: 1000,
    message: '未定义异常'
  },
  INVALID_PARAMS: {
    code: 1001,
    message: '参数异常'
  },
  API_ERROR: {
    code: 1002,
    message: '接口异常'
  },
  AUTH_FAILED: {
    code: 1003,
    message: '无效验证'
  },
  USER_NOT_EXISTS: {
    code: 1004,
    message: '账号不存在'
  },
  USER_ROLE_NO_PRIVILEGE: {
    code: 1005,
    message: '操作权限不足'
  },
  BE_OVERUD: {
    code: 1006,
    message: '验证码过期'
  },
  USER_EXISTS: {
    code: 1007,
    message: '账号已经存在'
  },
  INVALID_PASSWORD: {
    code: 1008,
    message: '密码错误'
  },
  AUTH_LOGIN: {
    code: 1009,
    message: '请先授权登录'
  },
  PHONE_NOT_INPUT: {
    code: 1010,
    message: '请输入手机号码'
  },
  PHONE_IS_REGISTER: {
    code: 1011,
    message: '该手机号码已经注册'
  },
  TODO: {
    code: 1012,
    message: '功能开发中'
  },
  FILE_TYPE_ERR: {
    code: 1013,
    message: '不支持上传该类型文件'
  },
  FILE_SIZE_ERR: {
    code: 1014,
    message: '文件大小请小于在20m'
  },
  FILE_SIZE_ERR: {
    code: 1014,
    message: '文件大小请小于在20m'
  },
  FILE_NETWORK_INSTABILITY: {
    code: 1015,
    message: '网络不稳定请重新上传'
  },
  FILE_ROUTER_ERR: {
    code: 1016,
    message: '暂无该接口'
  },
  FILE_EMAIL_CODE_ERR: {
    code: 1017,
    message: '邮箱验证码过期'
  },
  FILE_GET_EMAIL_ERR: {
    code: 1017,
    message: '邮箱验证码发送失败'
  },
  DISABLE_LOGIN: {
    code: 1018,
    message: '禁止登录'
  },
  TOKEN_FAILED: {
    code: 1019,
    message: 'token过期'
  },
  // RESTFUL
  RESTFUL_GET_ID: {
    code: 2001,
    message: '查询数据不存在'
  },
  RESTFUL_DELETE_ID: {
    code: 2002,
    message: '删除数据不存在'
  },
  RESTFUL_UPDATE_ID: {
    code: 2003,
    message: '更新数据不存在'
  },
  RESTFUL_DUPLICATION: {
    code: 2004,
    message: '数据已经存在'
  },
  RESTFUL_TODO: {
    code: 2005,
    message: '该接口未实现'
  },
  RESTFUL_HAS_DELETED: {
    code: 2006,
    message: '该数据已被删除'
  },
  RESTFUL_GET_AUTH: {
    code: 2007,
    message: '该权限不存在'
  },

  // SQL
  SQL_ERROR: {
    code: 3000,
  },

  // 配置出错 4000
  CONFIGURARTION_EMAILE: {
    code: 4000,
    message: '请联系后端更新邮箱code配置'
  },
  CONFIGURARTION_REDIS: {
    code: 4001,
    message: '请联系后端更新redis配置'
  },
  CONFIGURARTION_FILES: {
    code: 4002,
    message: '请联系后端更新文件配置'
  },

  // 通知
  MSG_CTEATE: {
    code: 5001,
    message: '创建成功!'
  },
  MSG_SEND: {
    code: 5002,
    message: '发送成功!'
  },
  MSG_UPDATE: {
    code: 5003,
    message: '更新成功!'
  },
  MSG_DELETE: {
    code: 5004,
    message: '删除成功!'
  },
  MSG_TOKEN: {
    code: 5005,
    message: '成功获取token!'
  },
  MSG_FILES: {
    code: 5006,
    message: '上传成功'
  },
};