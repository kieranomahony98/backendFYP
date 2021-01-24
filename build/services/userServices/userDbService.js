"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = void 0;
const logger_1 = require("../../helpers/logger");
const userModel_1 = __importDefault(require("../../MongoModels/userModel"));
async function updateUser(email, password) {
    return userModel_1.default.updateOne({ email }, { $set: { password } })
        .then((user) => true)
        .catch((err) => {
        logger_1.logger.error(`failed to update user: ${err.message}`);
        throw err;
    });
}
exports.updateUser = updateUser;
async function deleteUser(email) {
    return userModel_1.default.deleteOne({ email })
        .then((r) => true)
        .catch((err) => {
        logger_1.logger.error(`failed to delete user: ${err.message}`);
        throw err;
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=userDbService.js.map