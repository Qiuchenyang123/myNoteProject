const express = require('express');
const path = require('path');

const app = express();

// 配置监听端口
app.listen(23333);

// 配置静态文件
app.use(express.static(path.join(__dirname, '../public')));

// 配置接口参数
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置路由
app.use('/home', require('./router/home'));