import { Model, Schema, model } from "mongoose";

const customerSchema = new Schema ({
    tipoDocumento:{
        type: String,
        require:true,
    },
    numeroDocumento:{
        type: Number,
        require:true,
        unique: true
    },
    razonSocial:{
        type: String,
        require:true
    },
    direccion:{
        type: String,
        require:true
    },
    telefono:{
        type: Number,
        require:true
    },
    email:{
        type: String,
        require:true
    },
}) 

const CustomerModel: Model<any> = model ("customer", customerSchema);
export default CustomerModel;