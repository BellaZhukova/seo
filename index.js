import express from "express";
import projectRoute from "./src/routes/project.js";
import sequelize from "./src/configs/db.js"
const app = express();

const port = 3000;

app.use(express.json())
app.use('/project', projectRoute);

app.get('/', (req, res) => {
    res.send('Привет мир!')
})

app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`)
})