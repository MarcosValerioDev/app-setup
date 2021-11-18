const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
    name: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true, unique: true, lowercase: true },
    state: { type: String, required: true, select: true  },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('control-productions', ProdutoSchema);