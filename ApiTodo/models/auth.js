/* Mongoose */
const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchemeList = {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
};

const articleScheme = new Schema(articleSchemeList, { timestamps: true });

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, articleScheme);
module.exports = model;