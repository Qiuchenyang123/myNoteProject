const express = require('express');
const path = require('path');
const userModel = require('../data/model/user');

const router = express.Router();

/*
* code: 0——失败，1——成功
* errMsg： 错误信息
* data： 数据
* */
// 注册用户
router.post('/register', (req, res) => {
    const {username, password, avatar} = req.body;
    userModel
        .findOne({username})
        .then((data) => {
            if (data) {
                res.send({
                    code: 0,
                    errMsg: '用户名已被注册。'
                })
            } else {
                userModel
                    .create({
                        username,
                        password,
                        avatar
                    })
                    .then(() => {
                        res.send({
                            code: 1,
                            errMsg: ''
                        })
                    })
                    .catch(err => {
                        console.log('创建用户错误：' + err)
                    })
            }
        })
        .catch((err) => {
            console.log('用户注册错误：' + err)
        })
});

// 修改用户信息(除了用户名)
router.post('/update', (req, res) => {
    const { username, password, avatar } = req.body;
    userModel
        .updateOne({ username }, { password, avatar })
        .then(() => {})
});