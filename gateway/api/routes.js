'use strict';

const controller = require('../controllers/controller');

module.exports = (app) => {
    app.route('/').get(controller.about);
    app.route('/user/:user_id/balance').get(controller.getBalance);
    app.route('/user/:user_id/balance/add/:amount').get(controller.addMoney);
}