const passport = require("passport");
const {Strategy} = require("passport-google-oauth2");

passport.use(new Strategy({
    clientID:"363824345011-49gjo9sjuekpt59t27o0208tlq97u6bq.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/api/v1/auth/google",
    passReqToCallback:true
},(request, accessToken, refreshToken, profile, done)=> {
    return done(null, profile)
},passport.serializeUser((user, done)=>{
    return done(null,user)
    
}),passport.deserializeUser ((user,done)=>{
    return done(null,user)
})))