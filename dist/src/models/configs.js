"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const configsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    active: {
        type: String,
        default: '1'
    },
    color: {
        type: String,
        require: true
    }
});
const configs = mongoose_1.default.model('configs', configsSchema);
exports.configs = configs;
new configs({
    name: 'Hello',
    active: '0',
    color: '#000'
});
