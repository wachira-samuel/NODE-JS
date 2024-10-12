"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var client_1 = require("@xata.io/client");
exports.schema = new client_1.Schema({
    products: {
        id: 'string',
        userName: 'string',
        displayName: 'string',
        // Add other fields as necessary
    },
});
