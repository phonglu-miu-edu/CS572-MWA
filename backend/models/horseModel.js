const mongoose = require('mongoose');
const { generateModel } = require('./baseModel');
const { Schema, ObjectId } = mongoose;

const HorseSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    picture: { type: String, required: true },
    breed: String,
    weight: Number,
    jockey: { _id: ObjectId, name: String, picture: String }
});

module.exports = generateModel('Horse', HorseSchema);