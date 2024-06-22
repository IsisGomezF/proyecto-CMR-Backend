"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_controller_1 = require("../controllers/customers.controller");
const router = (0, express_1.Router)();
router.post("/", customers_controller_1.createCustomer);
router.get("/:id", customers_controller_1.getCustomer);
router.put("/:id", customers_controller_1.updateCustomer);
router.delete("/:id", customers_controller_1.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customers.router.js.map