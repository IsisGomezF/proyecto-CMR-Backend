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
exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, password } = body;
    try {
        const existsEmail = yield user_model_1.default.findOne({ email, password });
        if (existsEmail) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el email ${email}`
            });
        }
        const newUser = new user_model_1.default(Object.assign({}, body));
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        const userCreated = yield newUser.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado sastisfactoriamente",
            usuario: userCreated,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error, //Puede devolver informacion sensible
            msg: "Error al crear el usuario"
        });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield user_model_1.default.find();
        res.json({
            ok: true,
            verUsuarios: getUser,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver el usuario"
        });
    }
});
exports.getUsers = getUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const getOneUser = yield user_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            verUsuario: getOneUser,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver el usuario"
        });
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const userUpdated = yield user_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Usuario actualizado",
            usuario: userUpdated
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
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userDeleted = yield user_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Usuario Eliminado",
            usuario: userDeleted
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
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map