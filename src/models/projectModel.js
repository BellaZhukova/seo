import { Sequelize } from "sequelize";
import sequelize from "../configs/db.js"
import bcrypt from "bcrypt"

const Project = sequelize.define('Project', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
    }
},
{
    tableName: 'projects',

},);


Project.beforeCreate(async (project) => {
    const hashedPassword = await bcrypt.hash(project.password, 10);
    project.password = hashedPassword;
})

export default Project;
