const wordModel = require("../models/wordModel")
const axios = require("axios")
const cheerio = require("cheerio")
const Iconv = require("iconv-lite")
const promisePool = require("../lib/database")

const getWords = async function (req, res) {
    let result = await wordModel.getWords();
    res.status(200).json(result);
}

const insertWord = async function (req, res) {
    let data = {
        cate: req.body.cate,
        name: req.body.name,
        url: req.body.url,
        wordRank: req.body.wordRank,
        impotance: req.body.impotance,
    }
    let result = await wordModel.insertWord(data);
    res.status(200).json(result);
}

const deleteWord = async function (req, res) {
    let wordSeq = req.body.seq;
    let result = await wordModel.deleteWord(wordSeq);
    res.status(200).json(result);

}

const getAllNewsInfo = async function (req, res) {
    let mainUrl = "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=100"
    // let content = ""
    const main = await getHtml(mainUrl)
    .then(data => {
        var ulList = []
        const $ = cheerio.load(data)
        const $bodyList = $("div.cluster").children("div.cluster_group")
        $bodyList.each(function(idx, val) {
            ulList[idx] = {
                "title": $(this).find("div.cluster_text a").text(),
                "url" : $(this).find("div.cluster_text a").attr("href"),
                "content": ""
            }        
        })
        return ulList
    })
    const content = await main.reduce(async (prev, current, index, array) =>{
        const result = await prev.then()        
        const data = await getHtml(current.url).then(data => {
            const $ = cheerio.load(data)
            const $content = $("div._article_content").text()
            array[index]["content"] = $content
            return $content
        })
    }, Promise.resolve([]))

    res.status(200).json(main)
}

const getHtml = (url) => {
    try {
        return new Promise(async (resolve) => {
            const res = await axios({
            method: "GET",
            url: url,
            responseType: "arraybuffer"
            }).then(html => {
                const contentType = html.headers["content-type"]
                const charset = contentType.includes("charset=")
                ? contentType.split("charset=")[1] : 'UTF-8'
                const content = Iconv.decode(html.data, charset).toString();
                return content
            })
            resolve(res)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getWords,
    insertWord,
    deleteWord,
    getAllNewsInfo
}