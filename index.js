const exp = require("express");
const app = exp();
const passport = require("passport");
const expSession = require("express-session");
const db = require("./models");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./config/passport");


app.use(cors());
app.use(expSession({resave:false, saveUninitialized: true, secret:"aci"}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/v1/auth/google",passport.authenticate("google",{
    scope: ["email","profile"],
    successRedirect:"/api/v1/auth/protected",
    failureRedirect: "/api/v1/auth/fail"
}));


app.get("/api/v1/auth/protected",async(req,res)=>{
    console.log(req.user)
    await db.users.findOrCreate({
        where: {
            name: req.user.displayName,
            email: req.user.email,
            photo: req.user.picture,
            password: "kosong dulu",
        }
    })
    const token = jwt.sign({name:req.user.displayName, email:req.user.email, photo:req.user.picture},"aci")
    res.redirect(`http://localhost:3000/${token}`)
})

app.get("/api/v1/users",async(req,res)=>{
    //console.log(req.headers.authorization);

    if(!req.headers.authorization){
        return res.json({message: "auth failed"})
    }

    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    const credentials = jwt.verify(token,"aci");
    if (credentials){
        const datauserfromdb = await db.users.findOne({
            where:{
                email:credentials.email
            }
        })
        return res.json({message: "Get Data Profile", data:datauserfromdb})
    }

})

app.listen(process.env.PORT || 8000,()=>{
    console.log("server running on port 8000");
})