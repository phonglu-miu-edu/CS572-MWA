const mongoose = require('mongoose');
const { generateModel } = require('./baseModel');
const { Schema, ObjectId } = mongoose;

const RaceSchema = new Schema({
    start_time: { type: Date, required: true },
    description: String,
    racers: [ {
        number: { type: Number, required: true },
        horse_id: { type: ObjectId, required: true },
        id: { type: ObjectId, required: true }
    } ]
});

module.exports = generateModel('Race', RaceSchema);