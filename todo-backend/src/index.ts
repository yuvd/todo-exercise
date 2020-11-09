require("dotenv").config();
import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

const app: Express = express();
const PORT: string | number = process.env.PORT || 8000;
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const url: string = "mongodb://localhost:27017/TODO-DB";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
	.connect(url, options)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		)
	)
	.catch((error) => {
		throw error;
	});
