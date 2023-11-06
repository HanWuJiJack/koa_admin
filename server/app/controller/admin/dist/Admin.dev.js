"use strict";

var ADeptAdminController = require('./ADeptAdminController');

var ADictAdminController = require('./ADictAdminController');

var ADictTypeAdminController = require('./ADictTypeAdminController');

var AFaasAdminController = require('./AFaasAdminController');

var AFileController = require('./AFileController');

var AFileExcelController = require('./AFileExcelController');

var ALeavesAdminController = require('./ALeavesAdminController');

var AMenuAdminController = require('./AMenuAdminController');

var ARolesAdminController = require('./ARolesAdminController');

var AUserAdminController = require('./AUserAdminController');

var PLoginAdminController = require('./PLoginAdminController');

var PPublicRasController = require('./PPublicRasController');

var PUserAdminController = require('./PUserAdminController');

var AModelsAdminController = require('./AModelsAdminController');

module.exports = {
  auth: [ADeptAdminController, ADictAdminController, ADictTypeAdminController, AFaasAdminController, AFileController, AFileExcelController, ALeavesAdminController, AMenuAdminController, ARolesAdminController, AUserAdminController, AModelsAdminController],
  "public": [// PUserAdminController,
  PLoginAdminController, PPublicRasController]
};