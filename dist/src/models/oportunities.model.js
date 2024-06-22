"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const oportunitiesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    observation: {
        type: String,
        require: true
    },
    customer: {
        type: String || Number,
        require: true
    },
    attachments: {},
    status: {},
    commitment: {}
});
const OportunitiesModel = (0, mongoose_1.model)("oportunity", oportunitiesSchema);
exports.default = OportunitiesModel;
//# sourceMappingURL=oportunities.model.js.map