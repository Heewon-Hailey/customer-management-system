const fs = require('fs'); // to access file 
const express = require('express');
const bodyParser =  require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); // get the config 
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});

connection.connect();

const multer = require('multer'); // multer library to preceed files 
const upload = multer({dest: './upload'}); // set upload (destination) folder

/* when a client goes to api/hello, print a message
app.get('/api/hello', (req, res) => { res.send({message: 'Hello Express'}); });*/

// REST API uses json format
// res.send(); when a client goes to customers page, it returns their customer info
// fetch data by querying; return fetched data 'rows' and send
app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

// enable users to check their profile image by sharing 'upload' folder though 'image' folder
// users uses image as filename, yet it is mapping to upload folder
app.use('/image', express.static('./upload'));

// when users send customer details to api/customers, proceed it
// the first arg is id, no need to set the value
app.post('/api/customers', upload.single('image'), (req, res) =>{
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let img = '/image/' + req.file.filename;  // input path as String (brilliant multer allocates a unique filename)
  let name = req.body.name;
  let DOB = req.body.DOB;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [img, name, DOB, gender, job];
  console.log(img); // to debug one by one
  console.log(name);
  console.log(DOB);
  console.log(gender);
  console.log(job);
  connection.query(sql, params, 
    (err, rows, fields) => {
      res.send(rows);  
      //console.log(err); // to debug 
      //console.log(rows); // to debug 
  })
})

// :id is a specific id
app.delete('/api/customers/:id' , (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  conntection.query(sql, params, 
    (err, rows, fields) => {
      res.send(rows);
    })
})

// run app with port, if the server is running, print on log
// use ` ` to print variables within text
app.listen(port, () => console.log(`Listening on port ${port}`));


// Run : $ node server.js 
// Check on local 5000
// Quit : ctrl + c 