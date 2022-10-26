'use strict';

const controller = require('../controllers/controller');

module.exports = (app) => {
    app.route('/').get(controller.about);
    app.route('/balance/:user_id').get(controller.getBalance);
    app.route('/balance/add/:user_id/:amount').get(controller.addMoney);
}