import { Request, Response } from "express";;
import { CustomRequest } from "../middlewares/validate-jwt";
import InteractionModel from "../models/interactions.model";

export const createInteraction = async (req:CustomRequest, res:Response) => {
    const {body} = req;
    // const {descripcion}=req.body
    const id= req._id;

    try {
        const newInteraction = new InteractionModel({ user:id, 
            ...body,
        });
        const interactionCreated = await newInteraction.save()
        res.status(200).json({
            ok:true,
            msg:"Interaccion creada sastisfactoriamente",
            interaccion: interactionCreated,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            error, //Puede devolver informacion sensible
            msg:"Error al crear la interaccion"
        });
        
    }
}

export const getInteractions = async (req:Request, res:Response) => {
    try {
        // mongoose.model('usuario', UsuarioSchema)
        const viewInteractions = await InteractionModel.find().populate({
            path:"user",
            select:"nombre email numeroCelular",
        });
        res.json({
            ok:true,
            verInteractiones: viewInteractions,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver las interacciones"
        });
        
    }
}
export const getOneInteraction = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const viewInteraction = await InteractionModel.findById({_id:id}).populate({
            path:"user",
            select:"nombre email numeroCelular",
        });
        res.json({
            ok:true,
            verUnaInteraccion: viewInteraction,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Error al ver la interaccion"
        });
        
    }
}

export const updateInteraction = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const { body } = req;
        const interactionUpdated = await InteractionModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok:true,
            msg:"Interaccion actualizada",
            interaccion: interactionUpdated
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al actualizar la interaccion"
        });
        
    }
}

export const deleteInteraction = async (req:Request, res:Response) => {
    try {
        const id= req.params.id;
        const interactionDeleted = await InteractionModel.findByIdAndDelete({_id:id});
        res.json({
            ok:true,
            msg:"Interaccion Eliminada",
            interaccion: interactionDeleted
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok:false,
            msg:"Error al eliminar la interaccion"
        });
        
    }
}