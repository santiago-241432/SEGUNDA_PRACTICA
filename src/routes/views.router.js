import userModel from '../DAO/models/users.js';
import { Router } from 'express';
import { CreateHash, isValidPassword } from '../utils.js';

const route = Router();

route.get('/', (req,res)=>{
    res.render('home');
})

route.get('/register', (req,res)=>{
    res.render('register');
})

route.post('register', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req,res)=>{
    res.send({status:"success", message:"usuario registrado"})
})

route.get('/failregister', async(req,res)=>{
    console.log("error en el registro");
    res.send({error: "failed"});
})

route.get('/login', (req,res)=>{
    res.render('login');
})

route.post('/login', async(req,res)=>{
    
    const { email, password}= req.body;
    try{  
        if(!email || !password)return res.status(400).send({error: "Incomplete values" })

        const user = await user.findOne({email:email}, {email:1, name:1, password:1});

        if(!user)return res.status(400).send({error: "User not found" })
        if(!isValidPassword(user,password))return res.status(403).send({error: "Incorrect password" }) 
        delete user.password;
        req.session.user = user;
        res.render('product')

    }catch(error){
        res.redirect('/login');
    }
})

route.get('/product', (req,res)=>{
    res.render('product');
})

export default route;