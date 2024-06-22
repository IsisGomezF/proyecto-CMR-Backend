"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    documentType: {
        type: String,
        required: true,
    },
    documentNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    rol: {
        type: String,
        default: "User"
    },
    token: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});
const UserModel = (0, mongoose_1.model)("user", exports.UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map