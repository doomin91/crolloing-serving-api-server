const authModel = require("../models/wordModel")
const axios = require("axios")
const cheerio = require("cheerio")
const Iconv = require("iconv-lite")

const login = async function(req, res) {
    try{
        res.json("1")
    } catch (e){
        res.json(e)
    }
}
const me = async function(req, res) {
    try{
        res.json("1")
    } catch (e){
        res.json(e)
    }
}
const refresh = async function(req, res) {
    try{
        res.json("1")
    } catch (e){
        res.json(e)
    }
}
const getUsers = async function(req, res) {
    try{
        res.json("1")
    } catch (e){
        res.json(e)
    }
}
const getUserByName = async function(req, res) {
    try{
        res.json("1")
    } catch (e){
        res.json(e)
    }
}
const insertUser = async function(req, res) {
    try{
        res.json("1")
    } catch (e){
        res.json(e)
    }
}
const updateUser = async function(req, res) {
    try{
        res.json("1")
    } catch (e){
        res.json(e)
    }
}
const deleteUser = async function(req, res) {

}

module.exports = {
    login,
    me,
    refresh,
    getUsers,
    getUserByName,
    insertUser,
    updateUser,
    deleteUser,
}
