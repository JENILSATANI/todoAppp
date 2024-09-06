var express = require("express");
var {userData} = require("../controller/index");

module.exports = express
  .Router()

  .post("/addTodo", userData.creatTodo)
