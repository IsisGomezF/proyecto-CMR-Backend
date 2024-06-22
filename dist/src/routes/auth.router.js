"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("email", "El correo electronico es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], auth_controller_1.login);
router.post("/olvidocontrasena", [
    (0, express_validator_1.check)("email", "El correo electronico es obligatorio").isEmail(),
    (0, express_validator_1.check)("numeroDocumento", "El numero de documento es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], auth_controller_1.forgotPassword);
router.put("/cambiocontrasena", validate_jwt_1.validateJWTPass, [
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], auth_controller_1.cambioContrasena);
exports.default = router;
//# sourceMappingURL=auth.router.js.map