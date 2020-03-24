const Schema = require('../mongoose').Schema;
const userSchema = new Schema({
    username: {
        type: String,
        require: [true, '用户名是必须的'],
        minlength: 6,
        maxlength: 18
    },
    password: {
        type: String,
        require: [true, '密码必须'],
        match: /^[\da-z_]{6,18}$/i
    },
    avatar: {
        type: String,
        default: ''
    }
});

module.exports = userSchema;