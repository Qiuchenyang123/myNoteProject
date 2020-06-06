const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const articleModel = require("../data/model/article");

// 设置 multer 存储空间
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assert/img'))
    },
    filename(req, file, callback) {
        const {ext} = path.parse(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
});
// 配置 multer
const myUpload = multer({
    storage, // 存储空间
    limits: { // 限制
        fileSize: 8 * 1024 * 1024
    },
    fileFilter(req, file, callback) {
        const {ext} = path.parse(file.originalname);
        callback(null, /\.jpg|\.png|\.jpeg|\.gif$/.test(ext))
    }
}).single('file');


router.get('/articleList', (req, res) => {
    articleModel.find()
        .then(data => {
            res.send({
                code: 1,
                msg: '成功获取文章列表',
                data
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                msg: err,
            })
        })
});

router.get('/articleInfo', (req, res) => {

});

router.post('/articleSurfaceUpload', (req, res) => {
    console.log(123)
    myUpload(req, res, function (err) {
        console.log(55, err)
        debugger
        if (err instanceof multer.MulterError) {
            res.send({
                code: 0,
                msg: `multer错误:${err}`
            })
        } else if(err) {
            res.send({
                code: 0,
                msg: `非multer错误：${err}`
            })
        } else {
            res.send({
                code: 1,
                msg: `上传成功`
            })
        }
    })

    // if (req.session.userInfo.id) {
    // }
});

router.post('/addArticle', (req, res) => {
    const {title, content, origin, surface, tag, description} = req.body;
    if (!title || !content || !origin || !tag) {
        res.send({
            code: 0,
            msg: '文章标题、内容、类型、标签是必须的',
        })
    }
    console.log(req.session);
    const author = req.session.userInfo.id;
    articleModel.create({
        title, content, origin, surface, tag, description, author
    })
        .then(() => {
            res.send({
                code: 1,
                msg: '创建成功'
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                msg: '创建失败：' + err
            });
            console.log(err)
        })
});

module.exports = router;