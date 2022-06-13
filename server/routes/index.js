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
     *  /api/insertWord:
     *    post:
     *      tags:
     *      - word
     *      description: 새로운 워드를 추가합니다.
     *      parameters:
     *      - in: body
     *        name: Request
     *        description: 모든 값을 알맞게 넣어주세요.
     *        schema:
     *          $ref: '#/definitions/insertWord'
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description: 생성이 완료되었습니다.
     * definitions:
     *  insertWord:
     *    type: object
     *    required:
     *      - cate
     *      - name
     *      - url
     *      - wordRank
     *      - impotance
     *    properties:
     *      cate:
     *        type: string
     *      name:
     *        type: string
     *      url:
     *        type: string
     *      wordRank:
     *        type: integer
     *      impotance:
     *        type: integer
     */
     router.post("/api/insertWord",               wordController.insertWord)


    /**
     * @swagger
     *  /api/deleteWord:
     *    post:
     *      tags:
     *      - word
     *      description: 특정 토픽을 삭제합니다.
     *      parameters:
     *      - in: body
     *        name: Request
     *        description: 모든 값을 알맞게 넣어주세요.
     *        schema:
     *          $ref: '#/definitions/deleteWord'
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description: 삭제가 완료되었습니다.
     * definitions:
     *  deleteWord:
     *    type: object
     *    required:
     *      - seq
     *    properties:
     *      seq:
     *        type: integer
     */
     router.post("/api/deleteWord",               wordController.deleteWord)

    /**
     * @swagger
     *  /api/getNewsData:
     *    post:
     *      tags:
     *      - word
     *      description: 코드 값에 따라 뉴스 데이터를 가져옵니다.<br>
     *          <table>
     *             <tr>
     *                <td>항목</td>
     *                <td>코드</td>
     *            </tr>
     *            <tr>
     *                <td>정치</td>
     *                <td>100(default)</td>
     *            </tr>
     *            <tr>
     *                <td>경제</td>
     *                <td>101</td>
     *            </tr>
     *            <tr>
     *                <td>사회</td>
     *                <td>102</td>
     *            </tr>
     *            <tr>
     *                <td>생활/문화</td>
     *                <td>103</td>
     *            </tr>
     *            <tr>
     *                <td>IT/과학</td>
     *                <td>104</td>
     *            </tr>
     *            <tr>
     *                <td>세계</td>
     *                <td>105</td>
     *            </tr>
     *          </table>
     *      parameters:
     *      - in: body
     *        name: Request
     *        description: 모든 값을 알맞게 넣어주세요.
     *        schema:
     *          $ref: '#/definitions/getNewsData'
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description: Success
     * definitions:
     *  getNewsData:
     *    type: object
     *    required:
     *      - code
     *    properties:
     *      code:
     *        type: integer
     *        default: 100
     */

     router.post("/api/getNewsData",               wordController.getNewsData)

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