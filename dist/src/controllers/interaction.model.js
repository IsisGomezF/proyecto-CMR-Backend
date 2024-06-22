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
exports.deleteInteraction = exports.updateInteraction = exports.getOneInteraction = exports.getInteractions = exports.createInteraction = void 0;
;
const interactions_model_1 = __importDefault(require("../models/interactions.model"));
const createInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    // const {descripcion}=req.body
    const id = req._id;
    try {
        const newInteraction = new interactions_model_1.default(Object.assign({ customer: id }, body));
        const interactionCreated = yield newInteraction.save();
        res.status(200).json({
            ok: true,
            msg: "Interaccion creada sastisfactoriamente",
            interaccion: interactionCreated,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error, //Puede devolver informacion sensible
            msg: "Error al crear la interaccion"
        });
    }
});
exports.createInteraction = createInteraction;
const getInteractions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // mongoose.model('usuario', UsuarioSchema)
        const viewInteractions = yield interactions_model_1.default.find().populate({
            path: "customer",
            select: "nombre email numeroCelular",
        });
        res.json({
            ok: true,
            verInteractiones: viewInteractions,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver las interacciones"
        });
    }
});
exports.getInteractions = getInteractions;
const getOneInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const viewInteraction = yield interactions_model_1.default.findById({ _id: id }).populate({
            path: "customer",
            select: "nombre email numeroCelular",
        });
        res.json({
            ok: true,
            verUnaInteraccion: viewInteraction,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al ver la interaccion"
        });
    }
});
exports.getOneInteraction = getOneInteraction;
const updateInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const interactionUpdated = yield interactions_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Interaccion actualizada",
            interaccion: interactionUpdated
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar la interaccion"
        });
    }
});
exports.updateInteraction = updateInteraction;
const deleteInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const interactionDeleted = yield interactions_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Interaccion Eliminada",
            interaccion: interactionDeleted
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar la interaccion"
        });
    }
});
exports.deleteInteraction = deleteInteraction;
//# sourceMappingURL=interaction.model.js.map