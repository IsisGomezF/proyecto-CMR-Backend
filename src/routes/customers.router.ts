import { Router } from "express";
import { createCustomer, deleteCustomer, getCustomer, updateCustomer } from "../controllers/customers.controller";

const router = Router()

router.post("/", createCustomer);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);


export default router