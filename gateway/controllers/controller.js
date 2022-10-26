'use strict';

const properties = require('../package.json');
const wallet = require('../service/wallet');

var controllers = {
    about: (req, res) => {
        var aboutInfo = {
            name: properties.name,
            version: properties.version,
        }
        res.json(aboutInfo);
    },

    getBalance: (req, res) => {
        wallet.getBalance(req, res, (err, dist) => {
            if (err)
                res.send(err);
            res.json(dist);
        });
    },

    addMoney: (req, res) => {
        wallet.addMoney(req, res, (err, dist) => {
            if (err)
                res.send(err);
            res.json(dist);
        });
    }
};

module.exports = controllers;