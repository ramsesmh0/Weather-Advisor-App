var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());

//Database mock for now 

const users = [];

app.post('/Signup', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const user = { email: req.body.Email, password: hashedPassword };
      users.push(user);
      res.status(201).send('User registered successfully');
    } catch {
      res.status(500).send('Internal server error');
    }
  });

  app.post('/Login', async (req, res) => {
    try {
        const user = users.find(user => user.email === req.body.Email);
        if (!user) {
            return res.status(400).send('User not found');
        }

        if (await bcrypt.compare(req.body.Password, user.password)) {
            // Generate and send JWT token here if needed
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch {
        res.status(500).send('Internal server error');
    }
});


var server = app.listen(2000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("app listening at http://%s:%s", host, port)
})