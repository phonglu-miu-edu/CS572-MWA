const mongoose = require('mongoose');
const { generateModel } = require('./baseModel');
const { Schema } = mongoose;

const JockeySchema = new Schema({
    name: { type: String, required: true },
    description: String,
    picture: { type: String, required: true },
    dob: Date
}, { timestamps: true });

module.exports = generateModel('Jockey', JockeySchema);