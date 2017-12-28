//importing modules
var express=require('express')
var mongoose=require('mongoose')
var bodyparser=require('body-parser')
var cors =require('cors')
const path = require('path')

var app=express();

const route = require('./routes/route')

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist')

//on connection
mongoose.connection.on('connected',()=>{
    console.log('connected to database mongodb @ 27017')
},
'errer',(err)=>{
    if(err)
    {
        console.log('Errer database connection :'+err)
    }
}
)
//port no
const port=3000

//adding middleware -cors
app.use(cors())


 
//body-parser
app.use(bodyparser.json())


//static files
app.use(express.static(path.join(__dirname,'public')))


app.use('/api',route)
//testing
app.get('/',(req,res)=>{
    res.send('foober')
})

//bind port
app.listen(port,()=>{
    console.log('server started at port :'+port)
})