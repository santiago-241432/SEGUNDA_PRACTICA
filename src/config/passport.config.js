import passport from 'passport';
import local from 'passport-local';
import userModel from '../DAO/models/users.js';
import { CreateHash,isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () =>{
    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done)=>{
            const{name, email} = req.body;
            try{
                let user = await userModel.findOne({email:username});
                if(user){
                    console.log("user exists");
                    return done(null,false);
                }
                const newUser = {
                    name,
                    email,
                    password:CreateHash(password)
                }
                let result = await userModel.create(newUser);
                return done(null,result);
            }catch(error){
                return done("error al obtener el usuario");
            }
        }
    ))
}
export default initializePassport;

