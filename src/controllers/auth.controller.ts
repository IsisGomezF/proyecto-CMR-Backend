import { NextFunction } from 'express';
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import generateJWT from '../helpers/jwt';
import { CustomRequest } from '../middlewares/validate-jwt';
import { sendEmail } from '../helpers/email';
import path from "path";
import fs from "fs";
// import { obtenerUbicacionPorIP } from '../helpers/obtenerDireccionIP';
import { config } from '../config/config';

// import UbicacionModel from '../models/ubicaciosIp.model';

const environment = config[process.env.NODE_ENV || "development"]

export const login = async (req:Request, res:Response) =>{
    const {email,password}= req.body;
    // const ipAddress= environment.ip ||  req.ip

    try {
        //verificar email
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.status(401).json ({
                ok:false,
                msg:"Las credenciales no son validas"
            });
        }
        //Verificar password
        const validatePassword = bcrypt.compareSync( password, user.password);
        if(!validatePassword){
            return res.status(401).json ({
                ok:false,
                msg:"Las credenciales no son validas"
            });
        };
        //Generar Token
        const token = await generateJWT(user._id, user.email);
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
            ok:true,
            msg: "Token creado",
            usuario: user,
            token,
            // ubicacionGuardada,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            error,
            msg:"Contacte al administrador"
        });
    }
};

export const forgotPassword = async(req:Request, res:Response)=>{
    const {email, numeroDocumento} = req.body;
    try {
        const existsUser = await UserModel.findOne({
            email,
            numeroDocumento,
        });
        if(!existsUser){
            res.status(400).json({
                ok:false,
                msg: "Los datos no coinciden"
            });
        }
        const id= existsUser?._id;
        if(id){
            //Genera token
            const token=await generateJWT(id,email,"1h", process.env.JWT_SECRET_PASS);
            //Guarda el token
            existsUser.token = token;
            await existsUser.save();

            //Template correo
            const name = existsUser.nombre;
            const templatePath = path.join(
                __dirname,
                "../templates/olvidoContrasena.html"
            );
            const emailTemplate = fs.readFileSync(templatePath,"utf8");
            const personalizeEmail = emailTemplate.replace("{{name}}", name).replace("{{token}}", existsUser.token);

            //Envio correo
            sendEmail(
                "isiskgf@gmail.com",
                "Cambio Contraseña",
                personalizeEmail
            );
            res.status(200).json({
                ok:true,
                msg:"Proceso exitoso",
                usuario:existsUser,
                token
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:"No se logró validar los datos"
        });
        
    }
};

export const cambioContrasena = async (req:CustomRequest, res:Response)=>{
    const id= req._id;
    const {password} = req.body;
    const tokenPass=req.header("x-token-pass") as string
    ;
    try {
        if(!password || !tokenPass){
            return res.status(400).json({
                ok:false,
                msg:"Valores Invalidos"
            });
        }
        const usuario=await UserModel.findOne({token:tokenPass});
        if(!usuario ){
            return res.status(400).json({
                ok:false,
                msg:"El token ya fue utilizado"
            });
        }
        const newPassword =bcrypt.hashSync(password,10);
        const actualizarPassword =await UserModel.findByIdAndUpdate(id,{
            password:newPassword,
            token:""
        },
        {new:true}
        );
        console.log("actualizar contraseña", actualizarPassword);
        if(!actualizarPassword){
            return res.status(400).json({
                ok:false,
                msg:"Error al actualizar la constraseña"
            })
        };
        res.status(200).json({
            ok:true,
            msg:"Contraseña actualizada"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok:false,
            msg:"Error al actualizar la contraseña"
        }); 
    }
}


