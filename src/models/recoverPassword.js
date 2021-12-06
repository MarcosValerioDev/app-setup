const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecoverPasswordSchena = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    hash: { type: String, required: true, unique: true, lowercase: true },
    state: { type: Boolean, default: false }
});

module.exports = mongoose.model('recoverpasswords', RecoverPasswordSchena);