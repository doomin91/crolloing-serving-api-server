'use strict'

const wordModel = require("../models/wordModel")

const getWords = async function (req, res) {
    let result = await wordModel.getWords();
    res.status(200).json(result);
}

module.exports = {
    getWords,
}