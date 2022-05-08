// 'use strict'
const express = require("express");
const router = express.Router();

const wordController = require("../controllers/wordController")
    /**
     * @swagger
     *  /api/getWords:
     *    get:
     *      tags:
     *      - word
     *      description: 모든 토픽 조회
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description: 제품 조회 성공
     */
    router.get("/api/getWords",        wordController.getWords)


    
router.get('/', (req, res) => {
    res.send('404 . Not Found!')
  })

module.exports = router;