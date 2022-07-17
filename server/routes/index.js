// 'use strict'
const express = require("express");
const router = express.Router();

const wordController = require("../controllers/wordController")
const authController = require("../controllers/authController")

    /**
     * @swagger
     *  /api/auth/login:
     *    post:
     *      tags:
     *      - auth
     *      description: username과 password로 API에 로그인합니다. token을 return합니다.
     *      parameters:
     *      - in: body
     *        name: Request
     *        schema:
     *          $ref: '#/definitions/login'
     *      responses:
     *        200:
     *          description: Successfully login
     *          schema:
     *            properties:
     *              status:
     *                type: string
     *              data:
     *                type: object
     *                properties:
     *                  auth:
     *                    type: boolean
     *                  token:
     *                    type: string
     *                  faId:
     *                    type: string
     *                  roles:
     *                    type: string
     */
    router.post("/api/auth/login",               authController.login), 

    /**
     * @swagger
     *  /api/auth/me:
     *    get:
     *      tags:
     *      - auth
     *      description: login
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:
     */

    router.get("/api/auth/me",                   authController.me),
    /**
     * @swagger
     *  /api/auth/refresh:
     *    get:
     *      tags:
     *      - auth
     *      description: login
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:
     */
    router.get("/api/auth/refresh",              authController.refresh),
    /**
     * @swagger
     *  /api/users:
     *    get:
     *      tags:
     *      - auth
     *      description: login
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:
     */
     router.get("/api/users",                     authController.getUsers),
         /**
     * @swagger
     *  /api/users/{username}:
     *    get:
     *      tags:
     *      - auth
     *      description: login
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:
     */
     router.get("/api/users/{username}",          authController.getUserByName),
         /**
     * @swagger
     *  /api/users:
     *    post:
     *      tags:
     *      - auth
     *      description: login
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:
     */
     router.post("/api/users",                    authController.insertUser),
         /**
     * @swagger
     *  /api/users/{username}:
     *    put:
     *      tags:
     *      - auth
     *      description: login
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:
     */
     router.put("/api/users/{username}",          authController.updateUser),
         /**
     * @swagger
     *  /api/users/{username}:
     *    delete:
     *      tags:
     *      - auth
     *      description: login
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:
     */
     router.delete("/api/users/{username}",       authController.deleteUser),

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
     *      description: (크롤링) 코드 값에 따라 뉴스 데이터를 가져옵니다.<br>
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
    //  router.post("/api/getNewsData",               wordController.getNewsData)

    /**
     * @swagger
     *  /api/getRankingData:
     *    post:
     *      tags:
     *      - word
     *      description: 네이버 뉴스 RAW DB 조회
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:  네이버 뉴스 RAW DB 조회
     */
     router.post("/api/getRankingData",        wordController.getRankingData)

    /**
     * @swagger
     *  /api/getRawData:
     *    get:
     *      tags:
     *      - word
     *      description: 네이버 뉴스 RAW DB 조회
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:  네이버 뉴스 RAW DB 조회
     */
     router.get("/api/getRawData",        wordController.getRawData)

    /**
     * @swagger
     *  /api/updateRawData:
     *    post:
     *      tags:
     *      - word
     *      description: 분석이 완료된 Raw Data를 사용완료 상태로 변환합니다.
     *      produces:
     *      - application/json
     *      responses:
     *       200:
     *        description:  완료
     *      parameters:
     *      - in: body
     *        name: Request
     *        description: 모든 값을 알맞게 넣어주세요.
     *        schema:
     *          $ref: '#/definitions/updateRawData'
     * definitions:
     *  updateRawData:
     *    type: object
     *    required:
     *      - id
     *    properties:
     *      id:
     *        type: integer
     */
     router.post("/api/updateRawData",        wordController.updateRawData)


    
router.get('/', (req, res) => {
    res.send('404 . Not Found!')
  })

module.exports = router;