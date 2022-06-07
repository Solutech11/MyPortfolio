//import express
const express =require("express");
//initializing express
const app =express();

//express session
const session= require("express-session");
app.use(session({secret:"UDeyCraze", saveUninitialized:true, resave:true}))


//port number
const port = process.env.PORT || 3000

//mongoose
const mongoose= require("mongoose");
//connecting to db
mongoose.connect("mongodb+srv://Solutech:Xerewgida@storage.whfg7.mongodb.net/storage?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{
    if (result) {
        app.listen(port,()=>{
            console.log("http://127.0.0.1:3000/");
        })
    }
}).catch((err)=>{
    if (err) {
        console.log(err);
    }
});
// require detail model
const Details = require("./model/details");


//importing bodyparser
const bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

//setting view engine
app.set("view engine", "ejs");

//public files
// app.use(express.static('assets/css/'));
app.use(express.static('static'));

app.get("/",(req,res)=>{
    res.render("index",{msg:"", success:""});
})

app.post("/",(req,res)=>{
    const collect = req.body;
    const nDetail = new Details;
    if (collect.name==""||collect.email==""||collect.message==""){
        res.render("index",{msg:"Please fill all item", success:""});
    }else{
        nDetail.name= collect.name
        nDetail.email= collect.email
        nDetail.description= collect.message
        nDetail.save((err)=>{
            if (err){
                console.log(err);
            }else{
                res.render('index',{success:"respond sent", msg:""})
            }
        })
    }
});



////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin////admin

app.get('/solutech1234/login',(req,res)=>{
    const sess= req.session;
    if (sess.Solutech){
        if (sess.Solutech=="soluwizy@gmail.com") {
            res.redirect("/solutech1234/main");
        }else{
            res.render('loginp',{msg:""})
        }  
    }else{
        res.render('loginp',{msg:""})
    }  
    
});
app.post('/solutech1234/login',(req,res)=>{
    const collect= req.body;
    const sess =req.session;

    if (collect.email=="soluwizy@gmail.com" && collect.pass=="stech123"){
        sess.Solutech=collect.email;
        res.redirect("/solutech1234/main");
    }else{
        res.render("loginp", {msg:"*Invalid Details"})
    }
})

//main page
app.get('/solutech1234/main',(req,res)=>{
    const sess = req.session;
    if (sess.Solutech){
        // console.log(sess.Solutech);

        if (sess.Solutech=="soluwizy@gmail.com") {
            Details.find({},(err,data)=>{
                if (err) {
                    console.log(err);
                }else{
                    if (data) {
                        res.render('review',{reviews:data});
                    }
                }
            })
            // res.render('review')
        }else{
            sess.destroy((err)=>{
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/lost")
                }
            })
        }
    }else{
        res.redirect("/lost");
    }
})

app.get('/logout',(req,res)=>{
    const sess= req.session;
    if (sess.Solutech) {
        sess.destroy((err)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect("/");
            }
        })
    }else{
        res.redirect("/lost")
    }
})

// app.get('/')
app.get('/zohoverify/verifyforzoho.html', (req,res)=>{
    res.sendFile(__dirname+'/static/verifyforzoho.html')
})

// 404
app.use((req,res)=>{
    res.status(404).render('404')
})
