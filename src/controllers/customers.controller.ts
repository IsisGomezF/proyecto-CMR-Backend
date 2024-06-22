import { Request, Response } from "express";
import CustomerModel from "../models/customers.model";
// import { CustomRequest } from "../middlewares/validate-jwt";

export interface additionalParams extends Request {
    customerID?:number;
}

export const createCustomer = async (req: Request, res: Response) =>{
    const {body} = req;
    // console.log(body);
    // console.log(req.body);
    
    try {
        const newCustomer = new CustomerModel({
            ...body,
        });
        // console.log("new",newCustomer);
        
        const customerCreated = await newCustomer.save()
        res.status(200).json({
            ok:true,
            msg:"Cliente creado",
            customer: customerCreated
        });
        // console.log("create", customerCreated);
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al crear el cliente",
            error
        });
        // console.log(error);
        
    }
}

export const getCustomer = async (req:additionalParams, res:Response) => {
    try {
        const customerID = req.params.id;
        const getCustomer = await CustomerModel.findById({_id:customerID});
        res.json({
            ok:true,
            verUsuario: getCustomer,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error para ver el usuario"
        });
    }
}



export const updateCustomer = async (req: Request, res: Response) =>{
    try {
        const id= req.params.id;
        const { body } = req;
        const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok:true,
            msg:"Usuario actualizado",
            usuario: updatedCustomer
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al actualizar el usuario"
        });
        
    }
}

export const deleteCustomer = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const deletedCustomer = await CustomerModel.findByIdAndDelete({_id:id});
        res.json({
            ok:true,
            msg:"Usuario Eliminado",
            usuario: deletedCustomer
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al eliminar el usuario"
        });
        
    }
}

