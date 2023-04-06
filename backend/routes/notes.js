var express = require('express');
var router = express.Router();
const mysql = require('mysql2');


//
// SPARA NOTE 
//

router.post('/', function(req, res) {
    let newNote = req.body;
    console.log(newNote);
  
    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
        }
  
        //Kodas ngt för att blobba?
  
        let sql = `INSERT INTO notes (noteName, noteBlob, userId) VALUES (${mysql.escape(newNote.noteName)}, ${mysql.escape(newNote.noteBlob)}, ${mysql.escape(newNote.userId)})`;
  
        req.app.locals.con.query(sql, function(err, result) {
        if (err) {
            console.log(err)
          }
          console.log("result", result);
          res.send();
      })
    })
  });
  


module.exports = router;