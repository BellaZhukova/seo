import express from "express";
import projectRoute from "./src/routes/routes.js";
import sequelize from "./src/configs/db.js"
import cors from "cors";
import jwt from "jsonwebtoken"
const app = express();

const port = 3000;

const corsOptions = {
    origin: "http://localhost:5432",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600
}


app.use(express.json())
app.use(cors(corsOptions));
app.use('/api', projectRoute);

app.get('/', (req, res) => {
    res.send('Привет мир!')
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
    next()
});


(async () => {
    try {
        await sequelize.sync();
        console.log('Модели синхронизированы с базой данных.');

        app.listen(port, () => {
            console.log(`Сервер запущен по адресу http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Ошибка при синхронизации моделей:', error);
    }
})();
