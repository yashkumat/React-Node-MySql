const express =  require('express')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

const mysql = require('mysql')

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "react-mysql"
})

app.post('/create_user', (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("value inserted!");
        }
    })
})

app.get('/get_all_users',(req,res)=>{
    db.query("SELECT * FROM users", (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.delete("/delete_user/:id",(req,res)=>{
    const id = req.params.id

    db.query("DELETE FROM users WHERE id = ?", id, (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("deleted")
        }
    })
})

app.listen(9000, ()=>{
    console.log("Server Started. Jai Shree Ram!")
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
})

