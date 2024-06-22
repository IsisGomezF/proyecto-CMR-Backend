import express, {Application, Request, Response} from "express";
import { dbConection } from "./dataBase/conection";
import customerRoutes from "./routes/customers.router";
import userRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router"
import cors from "cors";


class Server{
    private app: Application;
    private port: string;
    private apiPath={
        customer:"/api/v1/customer",
        user:"/api/v1/user",
        login:"/api/v1/login",

    };

    constructor(){
        this.app=express();
        this.port = process.env.PORT || "4000";
        dbConection();
        this.middlewares();
        this.routes()
    }
    miPrimerApi() {
        this.app.get("/", (req: Request, res: Response) =>
          res.status(200).json({ msg: "Api funcionando" })
        );
      }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.miPrimerApi()
    }
    routes():void{
        this.app.use(this.apiPath.customer, customerRoutes);
        this.app.use(this.apiPath.user, userRoutes);
        this.app.use(this.apiPath.login, authRoutes );
    }
    listen():void{
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        })
    }
}

export default Server

