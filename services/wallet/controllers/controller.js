'use strict';

const properties = require('../package.json');
const { Sequelize, QueryTypes } = require('sequelize');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

const sequelize = new Sequelize('backend-test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

var controllers = {
    about: (req, res) => {
        var aboutInfo = {
            name: properties.name,
            version: properties.version,
        }
        res.json(aboutInfo);
    },

    /**
     * 
     * @param {Integer} user_id 
     * @returns 
     */
    _getBalance: async (user_id) => {
        return await sequelize.query(
            "SELECT SUM(`amount`) `balance` FROM `transactions` WHERE `user_id`= ?", {
                replacements: [user_id],
                type: QueryTypes.SELECT
            }
        );
    },

    getBalance: async (req, res) => {
        try {
            let user_id = parseInt(req.params.user_id);
            if (user_id) {
                let record = await this._getBalance(user_id);
                res.json({'balance': parseFloat(record[0].balance)});
            } else {
                res.json({'error': '`user_id` is required.'});
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * 
     * @param {Integer} record_id 
     * @returns 
     */
    _deleteMoney: async (record_id) => {
        return await sequelize.query(
            'DELETE FROM `transactions` WHERE `id` = ?;', {
                replacements: [record_id],
                type: Sequelize.QueryTypes.DELETE
            });
    },

    /**
     * 
     * @param {Integer} user_id 
     * @param {Float} amount 
     * @returns 
     */
    _addMoney: async (user_id, amount) => {
        let uuid = uuidv1() + '-' + uuidv4();
        return await sequelize.query(
            'INSERT INTO `transactions` (`user_id`, `amount`, `date_time`, `reference_id`) VALUES (?, ?, now(), ?);', {
            replacements: [user_id, amount, uuid],
            type: Sequelize.QueryTypes.INSERT
        });
    },
    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    addMoney: async (req, res) => {
        let amount = parseFloat(req.params.amount);
        let user_id = parseInt(req.params.user_id);
        if ( Math.abs(amount) && user_id ) {
            let record = await this._addMoney(user_id, amount);
            if (record[0] && record[1]) {
                res.json({'reference_id': uuid});
            } else {
                res.json({'error': 'transaction failed.'});
            }
        } else {
            res.json({'error': '`user_id` and `amount` are required.'});
        }
    }
};

module.exports = controllers;