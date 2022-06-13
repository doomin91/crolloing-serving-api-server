const wordModel = require("../models/wordModel")
const axios = require("axios")
const cheerio = require("cheerio")
const Iconv = require("iconv-lite")
const promisePool = require("../lib/database")
const { rawListeners, exit } = require("process")

const getWords = async function (req, res) {
    try {
        let result = await wordModel.getWords();
        res.status(200).json(result);
    } catch (e) {
        res.json("error")
    }
}

const insertWord = async function (req, res) {
    try {

        let data = {
            cate: req.body.cate,
            name: req.body.name,
            url: req.body.url,
            wordRank: req.body.wordRank,
            impotance: req.body.impotance,
        }
        let result = await wordModel.insertWord(data);
        res.status(200).json(result);
    } catch (e) {
        res.json("error")
    }
}

const deleteWord = async function (req, res) {
    try {
        let wordSeq = req.body.seq;
        let result = await wordModel.deleteWord(wordSeq);
        res.status(200).json(result);
    } catch (e) {
        res.json("error")
    }

}

const getNewsData = async function(req, res){
    /*
        정치        100
        경제        101
        사회        102
        생활/문화   103
        IT/과학     104
        세계        105
    */
    try{
        let newsCode = req.body.code
        let mainUrl = `https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=${newsCode}`
        // let content = ""
        const main = await getHtml(mainUrl)
        .then(data => {
            var ulList = []
            const $ = cheerio.load(data)
            const $bodyList = $("div.cluster").children("div.cluster_group")
            $bodyList.each(function(idx, val) {
                let url = $(this).find("div.cluster_text a").attr("href")
                let split = url.split('/')
                let id = split[split.length - 1].split('?')[0]
                ulList[idx] = {
                    "id": id,
                    "code": newsCode,
                    "title": $(this).find("div.cluster_text a").text(),
                    "url" : url,
                    "content": ""
                }        
            })
            return ulList
        })

        date = new Date()
        console.log(date);
        return false;

        const content = await main.reduce(async (prev, current, index, array) =>{
            const result = await prev.then()        
            const data = await getHtml(current.url).then(async (data) => {
                const $ = cheerio.load(data)
                const $content = $("div._article_content").text()
                const $regDate  = $("span._ARTICLE_DATE_TIME").attr("data-date-time")
                Date()
                const $modDate  = $("span._ARTICLE_MODIFY_DATE_TIME").attr("data-date-time")
                array[index]["content"] = $content
                array[index]["regDate"] = $regDate
                array[index]["modDate"] = $modDate
                check = await wordModel.getRawData(array[index]['id'])
                if(check == ""){
                    await wordModel.insertRawData(array[index])
                }   
            })
        }, Promise.resolve([]))
        res.status(200).json(main)
    } catch(e) {
        console.log(e)
        res.json("error")
    }

}

const getAllNewsInfo = async function (req, res) {
    try {
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
                    "url" : $(this).find("div.cluster_text a").attr("href")
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
        } catch (e) {
        res.json("error")
    }
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
    getNewsData,
    getAllNewsInfo
}