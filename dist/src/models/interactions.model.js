"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interactionSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "customer",
        required: false
    },
    media: {
        type: String,
        required: false
    },
    description: {
        type: String,
        require: true
    },
    attachment: {
        required: false
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
const InteractionModel = (0, mongoose_1.model)("interaction", interactionSchema);
exports.default = InteractionModel;
//# sourceMappingURL=interactions.model.js.map