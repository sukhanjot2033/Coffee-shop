var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Coffee',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var date= req.body.date;
    var time= req.body.time;
    var number= req.body.number;


    var data = {
        "name": name,
        "email" : email,
        "phone": phone,
        "date":date,
        "time":time,
        "number":number,
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})
// app.post('/delete',(req,res)=>{
// var id=req.body.name;
// mongoose.mongo.connect(url,function(err,db){
//     db.collection('users').deleteOne(id,function(err){
//         console.log('ITem deleted');
//         db.close();
//     });
// });
// });



app.get("/",(req,res)=>{
      res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(5000);


console.log("Listening on PORT 3000");