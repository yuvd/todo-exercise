require("dotenv").config();
import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index";
import sequelize from "./utils/db/sequelize/database";

const app: Express = express();
const PORT: string | number = process.env.PORT || 8000;
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const sqlUrl = "postgres://@localhost:5432/todo-db";
const mongoUrl: string = "mongodb://localhost:27017/TODO-DB";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

const connect = async () => {
	try {
		// Init & authenticate SQL DB connection
		sequelize.sync();
		await sequelize.authenticate();

		//Connect to MongoDB
		await mongoose.connect(mongoUrl, mongoOptions);

		// Init app
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		);
	} catch (err) {
		throw new Error(`Unable to connect to the database: ${err}`);
	}
};

connect();
