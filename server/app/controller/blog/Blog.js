const PLoginBlogController = require('./PLoginBlogController');
const PPublicRasController = require('./PPublicRasController');
const PRegisterBlogController = require('./PRegisterBlogController');
const ATokenBlogController = require('./ATokenBlogController');






module.exports = {
    auth: [
        ATokenBlogController
    ],
    public: [
        PLoginBlogController,
        PPublicRasController,
        PRegisterBlogController
    ]
};