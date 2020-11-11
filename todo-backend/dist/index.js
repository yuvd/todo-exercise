"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const database_1 = __importDefault(require("./utils/db/sequelize/database"));
const app = express_1.default();
const PORT = process.env.PORT || 8000;
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(index_1.default);
const sqlUrl = "postgres://@localhost:5432/todo-db";
const mongoUrl = "mongodb://localhost:27017/TODO-DB";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
const connect = async () => {
    try {
        // Init & authenticate SQL DB connection
        database_1.default.sync();
        await database_1.default.authenticate();
        //Connect to MongoDB
        await mongoose_1.default.connect(mongoUrl, mongoOptions);
        // Init app
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    }
    catch (err) {
        throw new Error(`Unable to connect to the database: ${err}`);
    }
};
connect();
