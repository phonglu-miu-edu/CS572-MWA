const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationsSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    category: {
        type: String,
        required: [true]
    },
    location: {
        type: [Number],
        required: [true],
        index: '2d'
    }
});

module.exports = mongoose.model('Locations', LocationsSchema);