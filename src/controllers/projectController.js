import Project from "../models/projectModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

const accessGenerateToken = (name) => {
    return jwt.sign({name},  process.env.TOKEN_SECRET, {expiresIn: '1800s'});
}

const authorizeProject = async (req, res) => {
    const { name, password } = req.body;
    try {
        const project = await Project.findOne({ where: {name} });

        if(!project) {
            return res.status(404).json({error: "Проект не найден"});
        }

        const isPasswordValid = await bcrypt.compare(password, project.password);

        if (!isPasswordValid) {
            return res.status(401).json({error: 'Неверный пароль'});
        }
        const token = accessGenerateToken(name);
        
        return res.status(200).json({
            message: "Авторизация прошла успешно",
            token
        });

    } catch (error) {
        return res.status(500).json({"error" : "Прооизошла ошибка на сервере"});
    }
}

const registrationProject = async (req, res) => {
    const { name, password, token } = req.body;
    try {

        const newProject = Project.create({
            name,
            password, 
            token: accessGenerateToken(name),
        })

        return res.status(201).json({message: "Регистрация прошла успешно"});
    } catch (error) {
        return res.status(500).json({error: "На сервере произошла ошибка"});
    }
}

export { authorizeProject, registrationProject };