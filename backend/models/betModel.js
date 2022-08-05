const mongoose = require('mongoose');
const { generateModel } = require('./baseModel');
const { Schema, ObjectId } = mongoose;

const BetSchema = new Schema({
    race_id: { type: ObjectId, required: true },
    horse_id: { type: ObjectId, required: true },
    member_id: { type: ObjectId, required: true },
    amount: { type: Number, required: true },
    status: Boolean
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = generateModel('Bet', BetSchema);