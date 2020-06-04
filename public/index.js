const express = require('express');
const path = require('path');
const session=require("express-session");
const cors = require('cors');

const app = express();

// 配置监听端口
app.listen(23333);

// 设置跨域
const allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
//使用跨域中间件
app.use(allowCors);
app.use(cors());
// 配置静态文件
app.use(express.static(path.join(__dirname, '../public')));

// 配置接口参数
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//配置session中间件
app.use(session({
    secret: "myNoteApp",
    resave: false,
    saveUninitialized: true,
    cookie: ('name', 'value', { maxAge:  5*60*1000, secure: false }),
    rolling: true
}));

// 配置路由
app.use('/home', require('./router/home'));
app.use('/user', require('./router/user'));