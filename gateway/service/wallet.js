require('dotenv').config();
const request = require('request');

var wallet = {
    getBalance: (req, res, next) => {
        request('http://localhost:' + process.env.WALLET_PORT + '/balance/' + req.params.user_id,
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    response = JSON.parse(body);
                    res.send(response);
                } else {
                    console.error('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                    console.log('body:', body);
                    res.send({
                        error: 1
                    });
                }
            });
    },

    addMoney: (req, res, next) => {
        request('http://localhost:' + process.env.WALLET_PORT + '/balance/add/' + req.params.user_id + '/' + req.params.amount,
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    response = JSON.parse(body);
                    res.send(response);
                } else {
                    console.error('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                    console.log('body:', body);
                    res.send({
                        error: 1
                    });
                }
            });
    }
};

module.exports = wallet;