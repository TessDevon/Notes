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

  
  //
  // HÄMTA EN SPECIFIK ANVÄNDARES NOTES. 
  //

  router.get('/user/:id', function(req, res) {
    let unserId = req.params.id
  
    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
        }
  
        let sql = `SELECT noteId, noteName, userId FROM notes WHERE userID = ${unserId}`;
        console.log(sql);
  
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
  // HÄMTA EN NOTE GENOM ID. 
  //

  router.get('/:noteId', function(req, res) {
    let noteId = req.params.noteId
  
    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
        }
  
        let sql = `SELECT noteId, noteName, noteBlob, userId FROM notes WHERE noteId = '${noteId}'`;
  
        req.app.locals.con.query(sql, function(err, data) {
        if (err) {
            console.log(err)
          }
          data.map(text => {
            text.noteBlob = Buffer.from(text.noteBlob).toString();
          })
          console.log("data", data);  
         
          res.json(data);
          })
    })
  });



module.exports = router;