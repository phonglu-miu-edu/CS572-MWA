const mongoose = require('mongoose');
const { generateModel } = require('./baseModel');
const { Schema } = mongoose;

const HorseSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    picture: { type: String, required: true},
    breed: String,
    weight: Number
});

module.exports = generateModel('Horse', HorseSchema);