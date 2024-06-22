import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"

export const createUser = async (req:Request, res:Response) => {
    const {body} = req;
    const {email, password} = body;
    try {
        const  existsEmail = await UserModel.findOne({email,password})

        if(existsEmail){
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el email ${email}`
            })
        }

        const newUser = new UserModel({
            ...body,
        });

        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(password, salt)

        const userCreated = await newUser.save()

        res.status(200).json({
            ok:true,
            msg:"Usuario creado sastisfactoriamente",
            usuario: userCreated,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error, //Puede devolver informacion sensible
            msg:"Error al crear el usuario"
        });
        
    }
}

export const getUsers = async (req:Request, res:Response) => {
    try {
        const getUser = await UserModel.find();
        res.json({
            ok:true,
            verUsuarios: getUser,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver el usuario"
        });
        
    }
}
export const getOneUser = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const getOneUser = await UserModel.findById({_id:id});
        res.json({
            ok:true,
            verUsuario: getOneUser,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver el usuario"
        });
        
    }
}

export const updateUser = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const { body } = req;
        const userUpdated = await UserModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok:true,
            msg:"Usuario actualizado",
            usuario: userUpdated
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al actualizar el usuario"
        });
        
    }
}

export const deleteUser = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const userDeleted = await UserModel.findByIdAndDelete({_id:id});
        res.json({
            ok:true,
            msg:"Usuario Eliminado",
            usuario: userDeleted
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al eliminar el usuario"
        });
        
    }
}