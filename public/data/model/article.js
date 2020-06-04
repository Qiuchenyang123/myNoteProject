const mongoose = require("mongoose");
const articleSchema = require("../schema/articleSchema");

const article = mongoose.model('articles', articleSchema);

module.exports = article;