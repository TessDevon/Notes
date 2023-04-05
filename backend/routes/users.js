var express = require('express');
var router = express.Router();
const CryptoJS = require("crypto-js");
const mysql = require('mysql2');


//
// REGISTRERA NY ANVÄNDARE
//

router.post('/', function(req, res) {
  let newUser = req.body;
  console.log(newUser);

  req.app.locals.con.connect(function (err) {
      if (err) {
          console.log(err);
      }

      let passwordToSave = CryptoJS.SHA3(req.body.newPassword).toString()

      let sql = `INSERT INTO users (userEmail, userPassword, userFirstname, userLastname) VALUES (${mysql.escape(newUser.newEmail)}, ${mysql.escape(passwordToSave)}, ${mysql.escape(newUser.newFirstname)}, ${mysql.escape(newUser.newLastname)})`;

      req.app.locals.con.query(sql, function(err, result) {
      if (err) {
          console.log(err)
        }
        console.log("result", result);
        res.send(result);
    })
  })
});



//
// LOGGA IN ANVÄNDARE 
//

router.post('/login', function(req,res){
  
  let { userEmail, userPassword } = req.body;
  console.log("email");
  console.log("password");

  req.app.locals.con.connect(function (err) {

    if (err) {
      console.log(err);
    }

    let passwordToCheck = CryptoJS.SHA3(userPassword).toString()
    console.log(passwordToCheck);

    let sql = `SELECT userEmail, userPassword, userId FROM users WHERE userEmail = ${mysql.escape(userEmail)}`;
    console.log(sql);

    req.app.locals.con.query(sql, function(err, result) {
      if (err) {
          console.log(err)
        }
        console.log(result);
        if(passwordToCheck === result[0].userPassword) {
          res.json({userId:result[0].userId, token:result[0].userId})
          return;
        }
        res.status(401).json("Incurrect password or email")
    })
  })
})

module.exports = router;

