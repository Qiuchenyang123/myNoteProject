const express = require('express');
const path = require('path');
const userModel = require('../data/model/user');

const router = express.Router();

/*
* code: 0——失败，1——成功
* errMsg： 错误信息
* data： 数据
* msg： 返回信息
* */
// 注册用户
router.post('/register', (req, res) => {
    const {email, password, nickname, phone, avatar} = req.body;
    userModel
        .findOne({email})
        .then((data) => {
            if (data) {
                res.send({
                    code: 0,
                    errMsg: '用户名已被注册。'
                })
            } else {
                userModel
                    .create({
                        email,
                        password,
                        nickname,
                        phone,
                        avatar
                    })
                    .then(() => {
                        res.send({
                            code: 1,
                            msg: '创建成功'
                        })
                    })
                    .catch(err => {
                        console.log('创建用户错误：' + err);
                        res.send({
                            code: 0,
                            errMsg: '创建失败'
                        })
                    })
            }
        })
        .catch((err) => {
            console.log('用户注册错误：' + err)
        })
});

// 修改用户信息(除了用户名)
router.post('/update', (req, res) => {
    const { email, password, nickname, phone, avatar } = req.body;
    userModel
        .updateOne({ email }, { password, nickname, phone, avatar })
        .then(() => {})
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    userModel
        .findOne({ email })
        .then((data) => {
            if (data.password === password) {
                if (data.status === 1) {
                    res.send({
                        code: 1,
                        success: true,
                        msg: '登录成功'
                    });
                    req.session.login = true
                } else {
                    res.send({
                        code: 1,
                        success: true,
                        msg: '登录失败，账号未启用'
                    })
                }
            } else {
                res.send({
                    code: 1,
                    success: true,
                    msg: '账号或密码错误'
                })
            }
        })
        .catch(err => {
            res.send({
                code: 0,
                success: false,
                errMsg: '报错，err：' + err
            })
        })
});

module.exports = router;