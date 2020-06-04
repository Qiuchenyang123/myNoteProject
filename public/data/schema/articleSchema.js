const Schema = require("mongoose").Schema;
const articleSchema = new Schema({
    title: {
        type: String,
        require: [true, '标题是必须的'],
        minlength: 1,
        maxlength: 30,
    },
    tag: {
        type: String,
        require: [true, 'tag是必须的']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    surface: {
        type: String,
        default: '/assert/img/js.jpg'
    },
    articleTag: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    pv: {
        type: Number,
        default: 0
    },
    comment: [{
        type: Schema.Types.ObjectID,
        ref: 'comment'
    }],
    author: {
        type: Schema.Types.ObjectID,
        ref: 'user'
    }
});

module.exports = articleSchema;