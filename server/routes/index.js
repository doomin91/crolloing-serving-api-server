// 'use strict'
const express = require("express");
const router = express.Router();

/**
 * router 선언
 */


const wordController = require("../controllers/wordController")
    router.get("/api/getWords",        wordController.getWords)

router.get('/', (req, res) => {
    res.send('404 . Not Found!')
  })

module.exports = router;