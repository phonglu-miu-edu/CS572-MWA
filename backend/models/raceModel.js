const mongoose = require('mongoose');
const { generateModel } = require('./baseModel');
const { Schema, ObjectId } = mongoose;

const RaceSchema = new Schema({
    start: { type: Date, required: true },
    closed: Boolean,
    horses: [ {
        _id: { type: ObjectId, required: true },
        name: { type: String, required: true },
        picture: { type: String, required: true },
        jockey: {
            name: String
        }
    } ]
});

module.exports = generateModel('Race', RaceSchema);