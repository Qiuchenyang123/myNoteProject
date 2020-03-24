const mongoose = require('mongoose');
///*47.98.234.0*/
mongoose
    .connect('mongodb://localhost/27017/test')
    .then(() => {console.log('数据库连接成功')})
    .catch(err => {console.log('数据库连接失败， err：' + err)});

module.exports = mongoose;