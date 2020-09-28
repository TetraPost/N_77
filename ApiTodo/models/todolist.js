/* Mongoose */
const path = require('path');
const mongoose = require('mongoose');


const { Schema } = mongoose;

const todolistSchemeList = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    default: '',
    minlength: 0,
    maxlength: 255,
  },
  status: {
    type: String,
    default: '',
    minlength: 0,
    maxlength: 250,
  },
};

const todoScheme = new Schema(todolistSchemeList, { timestamps: true });

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, todoScheme);
module.exports = model;