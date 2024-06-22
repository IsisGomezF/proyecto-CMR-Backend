import { Model, Schema, model } from "mongoose";

const oportunitiesSchema = new Schema ({
    name:{
        type: String,
        require:true
    },
    observation:{
        type: String,
        require:true
    },
    customer:{
        type: String || Number,
        require:true
    },
    attachments:{
        
    },
    status:{

    },
    commitment:{
        
    }
    
})

const OportunitiesModel: Model<any> = model ("oportunity", oportunitiesSchema);
export default OportunitiesModel;