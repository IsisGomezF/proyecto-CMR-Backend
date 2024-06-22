"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    tipoDocumento: {
        type: String,
        require: true,
    },
    numeroDocumento: {
        type: Number,
        require: true,
        unique: true
    },
    razonSocial: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    telefono: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
});
const CustomerModel = (0, mongoose_1.model)("customer", customerSchema);
exports.default = CustomerModel;
//# sourceMappingURL=customers.model.js.map