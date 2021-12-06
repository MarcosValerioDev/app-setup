const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAdminShema = new Schema({
    username: { type: String, required: false },
    password: { type: String, required: true, unique:true, select: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('useradmins', UserAdminShema);