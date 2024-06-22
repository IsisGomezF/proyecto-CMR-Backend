"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomer = exports.createCustomer = void 0;
const customers_model_1 = __importDefault(require("../models/customers.model"));
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    // console.log(body);
    // console.log(req.body);
    try {
        const newCustomer = new customers_model_1.default(Object.assign({}, body));
        // console.log("new",newCustomer);
        const customerCreated = yield newCustomer.save();
        res.status(200).json({
            ok: true,
            msg: "Cliente creado",
            customer: customerCreated
        });
        // console.log("create", customerCreated);
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear el cliente",
            error
        });
        // console.log(error);
    }
});
exports.createCustomer = createCustomer;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerID = req.params.id;
        const getCustomer = yield customers_model_1.default.findById({ _id: customerID });
        res.json({
            ok: true,
            verUsuario: getCustomer,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error para ver el usuario"
        });
    }
});
exports.getCustomer = getCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const updatedCustomer = yield customers_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Usuario actualizado",
            usuario: updatedCustomer
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuario"
        });
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedCustomer = yield customers_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Usuario Eliminado",
            usuario: deletedCustomer
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el usuario"
        });
    }
});
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customers.controller.js.map