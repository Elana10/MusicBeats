"use strict";

const db = require('../db');
const bcrypt = require('bcrypt');

const {BCRYPT_WORK_FACTOR} = require('../config')

class User {

    static async register({username, password, email}){
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        )

        if(duplicateCheck.rows[0]){
            throw new Error('Username taken.')
        }

        const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
            (username, password, email)
            VALUES($1, $2, $3)
            RETURNING username, id, email`,
            [username, hashedPW, email]
        );

        const newUser = result.rows[0];

        return newUser;
    }

    static async authenticate(username, password){
        const result = await db.query(
            `SELECT username, password, email, id 
            FROM users
            WHERE username = $1`,
            [username]
        )

        const user = result.rows[0];

        if(user){
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid === true){
                delete user.password;
                return user;
            }
        }

        throw new Error(`Invalid username/password.`)
    }

}

module.exports = User;