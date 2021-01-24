"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersAPI_1 = __importDefault(require("./routes/api/usersAPI"));
const moviesAPI_1 = __importDefault(require("./routes/api/moviesAPI"));
const auth_1 = __importDefault(require("./routes/api/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./helpers/logger");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("config"));
const app = express_1.default();
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(process.env.PORT, () => {
    logger_1.logger.info(`app is listening to port ${config_1.default.get('PORT')}`);
});
// config mongodb
const db = config_1.default.get('MONGO_URI');
// connect to db
mongoose_1.default.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    logger_1.logger.info('Mongoose successfully connected');
}).catch((err) => {
    logger_1.logger.error(err);
});
app.use('/api/users', usersAPI_1.default);
app.use('/api/movies', moviesAPI_1.default);
app.use('/api/auth', auth_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to babel node');
});
//# sourceMappingURL=server.js.map