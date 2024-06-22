import { Model, Schema, model } from "mongoose";

const interactionSchema = new Schema({
    customer:{
        type: Schema.Types.ObjectId, ref:"customer", 
        required: false
    },
    media:{
        type: String,
        required: false
    },
    description:{
        type: String,
        require:true
    },
    attachment:{
        required: false
    },
    user:{
        type: Schema.Types.ObjectId, ref:"user", 
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

const InteractionModel: Model<any> = model("interaction", interactionSchema);
export default InteractionModel;