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
exports.cambioContrasena = exports.forgotPassword = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const email_1 = require("../helpers/email");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import { obtenerUbicacionPorIP } from '../helpers/obtenerDireccionIP';
const config_1 = require("../config/config");
// import UbicacionModel from '../models/ubicaciosIp.model';
const environment = config_1.config[process.env.NODE_ENV || "development"];
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // const ipAddress= environment.ip ||  req.ip
    try {
        //verificar email
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas"
            });
        }
        //Verificar password
        const validatePassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas"
            });
        }
        ;
        //Generar Token
        const token = yield (0, jwt_1.default)(user._id, user.email);
        // console.log(token);
        // console.log("req",req.ip);
        // const ubicacionIp = await obtenerUbicacionPorIP(ipAddress)
        // console.log("data", ubicacionIp);
        // const ubicacion = new UbicacionModel({
        //     usuario: usuario.id,
        //     ...ubicacionIp,
        // });
        // const ubicacionGuardada = await ubicacion.save();
        res.status(200).json({
            ok: true,
            msg: "Token creado",
            usuario: user,
            token,
            // ubicacionGuardada,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Contacte al administrador"
        });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, numeroDocumento } = req.body;
    try {
        const existsUser = yield user_model_1.default.findOne({
            email,
            numeroDocumento,
        });
        if (!existsUser) {
            res.status(400).json({
                ok: false,
                msg: "Los datos no coinciden"
            });
        }
        const id = existsUser === null || existsUser === void 0 ? void 0 : existsUser._id;
        if (id) {
            //Genera token
            const token = yield (0, jwt_1.default)(id, email, "1h", process.env.JWT_SECRET_PASS);
            //Guarda el token
            existsUser.token = token;
            yield existsUser.save();
            //Template correo
            const name = existsUser.nombre;
            const templatePath = path_1.default.join(__dirname, "../templates/olvidoContrasena.html");
            const emailTemplate = fs_1.default.readFileSync(templatePath, "utf8");
            const personalizeEmail = emailTemplate.replace("{{name}}", name).replace("{{token}}", existsUser.token);
            //Envio correo
            (0, email_1.sendEmail)("isiskgf@gmail.com", "Cambio Contraseña", personalizeEmail);
            res.status(200).json({
                ok: true,
                msg: "Proceso exitoso",
                usuario: existsUser,
                token
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "No se logró validar los datos"
        });
    }
});
exports.forgotPassword = forgotPassword;
const cambioContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const { password } = req.body;
    const tokenPass = req.header("x-token-pass");
    try {
        if (!password || !tokenPass) {
            return res.status(400).json({
                ok: false,
                msg: "Valores Invalidos"
            });
        }
        const usuario = yield user_model_1.default.findOne({ token: tokenPass });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El token ya fue utilizado"
            });
        }
        const newPassword = bcryptjs_1.default.hashSync(password, 10);
        const actualizarPassword = yield user_model_1.default.findByIdAndUpdate(id, {
            password: newPassword,
            token: ""
        }, { new: true });
        console.log("actualizar contraseña", actualizarPassword);
        if (!actualizarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar la constraseña"
            });
        }
        ;
        res.status(200).json({
            ok: true,
            msg: "Contraseña actualizada"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error al actualizar la contraseña"
        });
    }
});
exports.cambioContrasena = cambioContrasena;
//# sourceMappingURL=auth.controller.js.map