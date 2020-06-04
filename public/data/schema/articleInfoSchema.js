const Schema = require("mongoose").Schema;
const articleInfoSchema = new Schema({
    tags: {
        type: Array
    },
    num: {
        type: Number,
        default: 100
    }
});

module.exports = articleInfoSchema;