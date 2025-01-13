import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Привет, проект')
    console.log(req.body)
})

export default router;