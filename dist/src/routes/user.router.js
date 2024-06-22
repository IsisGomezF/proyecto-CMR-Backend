"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
//path/api/v1/usuario
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [
    (0, express_validator_1.check)("name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("documentNumber", "El numero de documento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El correo electronico es obligatorio").not().isEmpty().isEmail(),
    validate_fields_1.validateFields
], user_controller_1.createUser);
router.get("/", user_controller_1.getUsers);
router.get("/:id", validate_jwt_1.validateJWT, user_controller_1.getOneUser);
router.put("/:id", validate_jwt_1.validateJWT, user_controller_1.updateUser);
router.delete("/:id", validate_jwt_1.validateJWT, user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map