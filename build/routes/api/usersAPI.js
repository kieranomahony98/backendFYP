"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("../../helpers/logger");
const auth_1 = require("../../middleware/auth");
const userModel_1 = __importDefault(require("../../MongoModels/userModel"));
const router = express_1.default.Router();
router.post('/user', auth_1.auth, (req, res) => {
    const { id } = req.body.user;
    logger_1.logger.info(`user info decoded ${id}`);
    userModel_1.default.findById(id).select('-password')
        .then((user) => {
        logger_1.logger.info(`user found: ${user}`);
        res.json(user);
    }).catch((err) => {
        logger_1.logger.error(`Failed to validate user: ${err.message}`);
        return res.status(500).send("failed to validate users");
    });
});
/** @Route Post /api/users/update
 *  @Desc provides api for user to update their profile
*/
// router.post('/update', (req, res) => {
//     // eslint-disable-next-line max-len
//     updateUser(req.body.email, req.body.password)
//         .then((bool) => {
//             if (bool) {
//                 res.send("User successfully updated");
//             }
//         })
// });
/** @Route Post /api/users/delete
 *  @Desc provides api for user to delete their profile
*/
// router.post('/delete', (req, res) => {
//     deleteUser(req.body.email)
//         .then((bool) => {
//             if (bool) {
//                 res.send("User successfully deleted")
//             }
//         })
// });
exports.default = router;
//# sourceMappingURL=usersAPI.js.map