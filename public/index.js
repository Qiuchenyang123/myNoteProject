const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectMongo = require("connect-mongo")(session);
const cors = require("cors");

const app = express();

// 配置监听端口
app.listen(23333);

// 设置跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-requested-with,Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    // res.header('Content-Type', 'multipart/form-data;');
    // res.header('Content-Type', 'application/json;charset=utf-8;multipart/form-data;');
    next()
});
// app.use(cors());

// 设置session
app.use(session({
    secret: 'myApp',
    cookie: {maxAge: 5 * 60 * 1000},
    rolling: true, // 用户每次和后台交互时刷新session
    resave: false, // 是否每次重新保存session
    saveUninitialized: false, // 初始化
    store: new connectMongo({url: 'mongodb://localhost:27017/blog'}) // 将session保存到数据库
}));

// cookie 解析
app.use(cookieParser());

// 配置静态文件
app.use(express.static(path.join(__dirname, '../public')));

// 配置接口参数
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置路由
app.use('/user', require('./router/user'));
app.use('/home', require('./router/home'));
app.use('/article', require('./router/article'));