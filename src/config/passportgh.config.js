import passport from "passport";
import GitHubStrategy from "passport-github2";
import userModel from "../DAO/models/users.js";

const initializePassport = () =>{
    passport.serializeUser((user, done) =>{
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) =>{
        let user = await userModel.findById(id);
        done(null,user);
    })

    passport.use('github', new GitHubStrategy({
        clientID:"Iv1.ccc2fc26d186526c",
        clientSecret:'94526caaadb6d9471b51423de3e99e58fc7a849c',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    },async (accessToken, refreshToken, profile, done)=>{
        try{
            console.log(profile);
            let user = await userModel.findOne({email:profile._json.email})
            if(!user){
                let newUser = {
                    name:profile._json.name,
                    email:profile._json.email,
                    password:''
                }
                let result = await userModel.create(newUser);
                done(null,result);
            }
            else{
                done(null,user);
            }
        }catch(error){
            return done(error);
        }
    }
    ))
}


export default initializePassport;