/*import express from "express";
const router = express.Router();

import userManager from "../DAO/controllers/users.js";

import { uploader } from "../utils.js";


router.get("/users/register", (req, res) => { res.render('register') });


router.get('/',(req,res)=>{
    res.render('chat');
});



router.post('/users/register', uploader.single('ProfilePicture'), (req, res) => {

    const { Name, Lastname, Age } = req.body;

    const filename = req.file.filename;


    if (!Name || !Lastname || !Age ) return res.status(400).send({ error: "Incomplete values" });

    let user = {
        Name,
        Lastname,
        Age,
        ProfilePicture: filename
    }

    const UserManager = new userManager();
    UserManager.createUser(user);
    res.status(200).send({ success: "User created" });
});

router.get('/users/list', async (req, res) => {
    try {
        const UserManager = new userManager();
        const users = await UserManager.getUsers();
        res.status(200).render('index',  {users : users});
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
});

export default router;*/