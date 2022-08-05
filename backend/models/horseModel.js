const mongoose = require('mongoose');

const { Schema } = mongoose;

const HorseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    picture: { type: String, required: true},
    dob: { type: Date },
    breed: { type: String },
    weight: { type: Number },
});

module.exports = mongoose.model('Horse', HorseSchema);