'use strict'
const express = require('express')

const app = express()
const routes_path = require('./routes/index.js')
const cors = require('cors');
const { swaggerUi, specs } = require('./src/swagger.js')

// request * 허용
const runType = "DEV"

if(runType == "DEV"){
    app.use(cors())
}

process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

// Post 요청을 사용하기 위해 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use('/', routes_path);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer:true }))


app.listen(5000, function(){
    console.log("start! express server on port 5000")
})

module.exports = app;