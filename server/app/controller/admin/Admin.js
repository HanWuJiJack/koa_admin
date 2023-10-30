const ADeptAdminController = require('./ADeptAdminController');
const ADictAdminController = require('./ADictAdminController');
const ADictTypeAdminController = require('./ADictTypeAdminController');
const AFaasAdminController = require('./AFaasAdminController');
const AFileController = require('./AFileController');
const AFileExcelController = require('./AFileExcelController');
const ALeavesAdminController = require('./ALeavesAdminController');
const AMenuAdminController = require('./AMenuAdminController');
const ARolesAdminController = require('./ARolesAdminController');
const AUserAdminController = require('./AUserAdminController');
const PLoginAdminController = require('./PLoginAdminController');
const PPublicRasController = require('./PPublicRasController');
const PUserAdminController = require('./PUserAdminController');





module.exports = {
    auth: [
        ADeptAdminController,
        ADictAdminController,
        ADictTypeAdminController,
        AFaasAdminController,
        AFileController,
        AFileExcelController,
        ALeavesAdminController,
        AMenuAdminController,
        ARolesAdminController,
        AUserAdminController,
    ],
    public: [
        PUserAdminController, 
        PLoginAdminController, 
        PPublicRasController
    ]
};
