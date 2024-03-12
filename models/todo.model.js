const dbMongo = require('../config/dbMongo')
const UserModel = require("./user.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const toDoSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},{timestamps: {type: Date, default: Date.now}});

const ToDoModel = dbMongo.model('todo',toDoSchema);
module.exports = ToDoModel;