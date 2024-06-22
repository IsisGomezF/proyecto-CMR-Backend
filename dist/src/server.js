"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conection_1 = require("./dataBase/conection");
const customers_router_1 = __importDefault(require("./routes/customers.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPath = {
            customer: "/api/v1/customer",
            user: "/api/v1/user",
            login: "/api/v1/login",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "4000";
        (0, conection_1.dbConection)();
        this.middlewares();
        this.routes();
    }
    miPrimerApi() {
        this.app.get("/", (req, res) => res.status(200).json({ msg: "Api funcionando" }));
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.miPrimerApi();
    }
    routes() {
        this.app.use(this.apiPath.customer, customers_router_1.default);
        this.app.use(this.apiPath.user, user_router_1.default);
        this.app.use(this.apiPath.login, auth_router_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map