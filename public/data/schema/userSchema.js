const Schema = require('../mongoose').Schema;
const userSchema = new Schema({
    email: {
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
    },
    nickname: {
        type: String,
        default: '' + Date.now()
    },
    phone: {
        type: Number,
        match: /^1[2-9]\d{9}/
    },
    article: [{
        type: Schema.Types.ObjectID,
        ref: 'article'
    }]
});

module.exports = userSchema;