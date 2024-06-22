import { Router } from "express";
import { updateUser, createUser, deleteUser, getOneUser, getUsers } from "../controllers/user.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

//path/api/v1/usuario


const router = Router();

router.post("/", 
validateJWT,
[
check("name","El nombre es obligatorio").not().isEmpty(), 
check("documentNumber","El numero de documento es obligatorio").not().isEmpty(),
check("email","El correo electronico es obligatorio").not().isEmpty().isEmail(),
validateFields], 


createUser);
router.get("/", getUsers)
router.get("/:id", validateJWT, getOneUser)
router.put("/:id", validateJWT, updateUser)
router.delete("/:id", validateJWT, deleteUser)


export default router