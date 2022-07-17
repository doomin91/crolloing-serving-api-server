const authModel = require("../models/authModel")
const axios = require("axios")
const cheerio = require("cheerio")
const Iconv = require("iconv-lite")
const jwt = require('jsonwebtoken')

const login = async function(req, res) {
    try{
        const secretKey = process.env.SECRET_KEY
        const algorithm = process.env.JWT_ALG
        const expiresIn = process.env.JWT_EXP
        const issuer = process.env.JWT_ISSUER
        const option = {algorithm, expiresIn, issuer}
        const result = jwt.sign(payload, secretKey, option)
        res.json(result)
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
