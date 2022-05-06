'use strict'

const ToDo = require("../models/toDoModel")

const findAll = async function (req, res) {
    let result = await ToDo.findAll();
    res.status(200).json(result);
}

const findListById = function (req, res) {
    ToDo.findListById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}

const insertList = async function (req, res) {
    let result = await ToDo.insertList(req.body);
    res.status(200).json(result);
}
const updateListById = function (req, res) {
    ToDo.updateListById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}
const deleteListById = function (req, res) {
    ToDo.deleteListById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}
const findCardById = function (req, res) {
    ToDo.findCardById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}

const insertCard = async function (req, res) {
    let result = await ToDo.insertCard(req.body)
    res.json(result);
}

const updateCardById = function (req, res) {
    ToDo.updateCardById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}

const deleteCardById = function (req, res) {
    ToDo.deleteCardById( req.param.id, function (err, callback) {
        if (err) res.json(err);
        res.json(callback);
    })
}

/**
 * 
 * @param {card} req * 이벤트 발생 Card Seq
 * @param {todoSeq} req  * 이동하려는 ToDoList Seq
 * @param {futureIndex} req  * 이동되는 Index
 */
const moveCard = async function(req, res){
    let nodes, result;
    const cardSeq = req.body.cardSeq;
    const cardInfo = await ToDo.findCardById(cardSeq);
    const oldParentSeq = cardInfo[0].CL_PARENT_SEQ;
    const newParentSeq = req.body.todoSeq;
    const futureIndex = req.body.futureIndex;
    // 현재 위치에서 링크 끊기 뒤 Row의 Next와 앞 Row의 Next 이어주기
    result = await ToDo.unlinkNode(cardSeq, oldParentSeq);
    result = await ToDo.linkNode(cardSeq, newParentSeq, futureIndex);
    res.status(200).json(nodes);
}

/**
 * 
 * @param {*} todoSeq 
 * @param {*} futureIndex 
 * @returns 
 */

module.exports = {
    findAll,
    findListById,
    insertList,
    updateListById,
    deleteListById,
    findCardById,
    moveCard,
    insertCard,
    updateCardById,
    deleteCardById
}