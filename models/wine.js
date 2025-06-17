const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    vineYard: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    region: { type: String, required: true },
    country: {type: String, required: true },
    year: { type: Number, min: 1900, max: new Date().getFullYear() + 1 },
    tastingNotes: { type: String, maxLength: 1000 },
    foodPairings: { type: String, maxLength: 1000 },
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
