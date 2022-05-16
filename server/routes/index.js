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
     *        description: 모든 토픽 조회
     */
    router.get("/api/getWords",               wordController.getWords)

    /**
     * @swagger
     *  /api/getAllNewsInfo:
     *    get:
     *      tags:
     *      - word
     *      description: 네이버 뉴스 조회 Api
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:  네이버 뉴스 조회 Api
     */
     router.get("/api/getAllNewsInfo",        wordController.getAllNewsInfo)


    
router.get('/', (req, res) => {
    res.send('404 . Not Found!')
  })

module.exports = router;