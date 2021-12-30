**In this lesson we will learn how add, read, delete data from MySql database (phpmyadmin, MySql Workbench, etc) using React in Frontend and Node Js Server.**

_We will also learn how to use Axios, Express, CORS, mysql package, prepared statements and many more things in this project._

- Client

We are using Axios to send request to our server running on port 9000.


1. Create
```javascript
Axios.post('http://localhost:9000/create_user', 
{
    username : username,
    password: encodedPassword
}).then(()=>{
    console.log("request Send!")
})
```
Axios.post(endpoint, data_object).then((err, success)=>{})


2. Read  
```javascript
Axios.get('http://localhost:9000/get_all_users')
.then((response)=>{
   setUsers(response.data)
})
```
Axios.get(endpoint).then(response=>{})


3. Delete
```javascript
Axios.delete(`http://localhost:9000/delete_user/${id}`)
.then(()=>{
   console.log("User Deleted")
})
```
Axios.delete(endpoint+param).then((err, success)=>{})


- Server

```javascript

// Import Express
const express =  require('express')

/* 
Cross-origin resource sharing - 
Cross-origin resource sharing is a mechanism that allows
restricted resources on a web page to be requested from
another domain outside the domain from which the first
resource was served.
*/
const cors = require('cors')

// Create express application
const app = express()

// Use CORS
app.use(cors())

// Recognise the incoming Request Object as a JSON Object
app.use(express.json())

// Import MySql
const mysql = require('mysql')

// Connect to MySql database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "react-mysql"
})

// Fire app at port 9000
app.listen(9000, ()=>{
    console.log("Server Started. Jai Shree Ram!")
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
})

// Insert into database
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

// Get from database
app.get('/get_all_users',(req,res)=>{
    db.query("SELECT * FROM users", (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

// Delete from database
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
```

1 . Insert 

`db.query("INSERT INTO table_name (col1, col2, col3, ...) VALUES (?, ?, ?, ...)", [val1, val2, val3, ...], (err, result)=>{})`

_Note - values are not directly passed but send separately in array for SQL injections prevention._

2 . Get

`db.query("SELECT * FROM table_name", (err,result)=>{})`

3 . Delete

`db.query("DELETE FROM table_name WHERE id = ?", id, (err,result)=>{})`

_Note - when we have to pass one value we can send it directly instead of array into prepared statement._


GitHub Link - 
