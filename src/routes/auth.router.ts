import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { cambioContrasena, login, forgotPassword } from "../controllers/auth.controller";
import { validateJWT, validateJWTPass } from "../middlewares/validate-jwt";

const router = Router();

router.post("/", 
[
    check("email","El correo electronico es obligatorio").isEmail(),
    check("password","El password es obligatorio").not().isEmpty(),
    validateFields], 
login);

router.post("/olvidocontrasena",
[
    check("email","El correo electronico es obligatorio").isEmail(),
    check("numeroDocumento","El numero de documento es obligatorio").not().isEmpty(),
    validateFields],
forgotPassword
);

router.put("/cambiocontrasena",
validateJWTPass,
[
    check("password","El password es obligatorio").not().isEmpty(),
    validateFields
],
cambioContrasena
)

export default router