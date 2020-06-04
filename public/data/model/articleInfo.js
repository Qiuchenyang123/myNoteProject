const mongoose = require("mongoose");
const articleInfoSchema = require("../schema/articleInfoSchema");
const articleInfo = mongoose.model('articleInfo', articleInfoSchema);

module.exports = articleInfo;