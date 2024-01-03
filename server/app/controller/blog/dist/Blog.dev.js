"use strict";

var PLoginBlogController = require('./PLoginBlogController');

var PPublicRasController = require('./PPublicRasController');

var PRegisterBlogController = require('./PRegisterBlogController');

var ATokenBlogController = require('./ATokenBlogController');

module.exports = {
  auth: [ATokenBlogController],
  "public": [PLoginBlogController, PPublicRasController, PRegisterBlogController]
};