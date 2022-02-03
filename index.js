const mysql=require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
 app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    
    user:'root',
    password:'password',
    database:'EmployeeDB',
    port:3306,
    multipleStatements:true,
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded');
    else
    console.log('DB Connection failed:'+JSON.stringify(err,undefined,2));
})
app.listen(3001,()=>console.log('Express server is running at port no :3001'));

//get all element from database
app.get('/employees',(req,res)=>{
    mysqlConnection.query('select * FROM employee',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


//get by id
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('select * FROM employee where EmployeeId=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//get by id
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('delete from employee where EmployeeId=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send("deleted succefully");
        else
        console.log(err);
    })
});

//insert an employee
app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmployeeID =?;SET @FirstName =?;SET @LastName =?;SET @Email=?;SET @AddressLine =?;SET @City =?; \
    CALL Employeeaddoredit(@EmployeeID,@FirstName,@LastName,@Email,@AddressLine,@City);"
    mysqlConnection.query(sql,[emp.EmployeeID,emp.FirstName,emp.LastName,emp.Email,emp.AddressLine,emp.City],(err,rows,fields)=>{
        if(!err)
        rows.forEach(element =>{
            if(element.constructor == Array)
        res.send('Inserted employee id:' +element[0].EmployeeID);
        });
        else
        console.log(err);
    })
});

//update an employee
app.put('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmployeeID =?;SET @FirstName =?;SET @LastName =?;SET @Email=?;SET @AddressLine =?;SET @City =?; \
    CALL Employeeaddoredit(@EmployeeID,@FirstName,@LastName,@Email,@AddressLine,@City);"
    mysqlConnection.query(sql,[emp.EmployeeID,emp.FirstName,emp.LastName,emp.Email,emp.AddressLine,emp.City],(err,rows,fields)=>{
        if(!err)
        res.send('updated successfully')
        else
        console.log(err);
    })
});

