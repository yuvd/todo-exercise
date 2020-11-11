import { DataTypes } from "sequelize";
import sequelize from "../../utils/db/sequelize/database";

const Task = sequelize.define("Task", {
	_id: {
		// Use same uuidv4 ID as Mongoose for uniformity
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.STRING,
	},
});

export default Task;
