const { SHA3 } = require('crypto-js');
var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const CryptoJS = require("crypto-js");



//
// SPARA NOTE 
//

router.post('/', function(req, res) {
  let newNote = req.body;

  if (req.body.token != CryptoJS.SHA3(req.body.userId+process.env.TOKEN).toString()) {
    res.send(401);
    return;
  }

  req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }

      let sql = `SELECT noteName FROM notes WHERE noteName = ${mysql.escape(newNote.noteName)}`;

      req.app.locals.con.query(sql, function(err, result) {
      if (err) {
        console.log(err)
      }
      console.log("result", result);
      if (result.length == 0){
        createNewNote(req, res);  
        return;     
      }
      res.send(401);
    })
  })
});

function createNewNote (req, res) {
  let newNote = req.body;
  console.log(newNote);
  
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
          
    let sql = `INSERT INTO notes (noteName, noteBlob, userId) VALUES (${mysql.escape(newNote.noteName)}, ${mysql.escape(newNote.noteBlob)}, ${mysql.escape(newNote.userId)})`;
          
    req.app.locals.con.query(sql, function(err, result) {
    if (err) {
      console.log(err)
    }
    console.log("result", result);
      res.send(result);
    })
  })
}
  


  //
  // HÄMTA EN SPECIFIK ANVÄNDARES NOTES. 
  //

  router.get('/user/:id', function(req, res) {
    let unserId = req.params.id

    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }
  
      let sql = `SELECT noteId, noteName, userId FROM notes WHERE userID = ${mysql.escape(unserId)}`;
      console.log(sql);
  
      req.app.locals.con.query(sql, function(err, result) {
        if (err) {
          console.log(err)
        }
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
  
      let sql = `SELECT noteId, noteName, noteBlob, userId FROM notes WHERE noteId = ${mysql.escape(noteId)}`;
  
      req.app.locals.con.query(sql, function(err, data) {
        if (err) {
          console.log(err)
        }
        data.map(text => {
          text.noteBlob = Buffer.from(text.noteBlob).toString();
        })
        res.json(data);
      })
    })
  });



  //
  //Redigera rådata till befintligt noteId
  //

  router.post('/changeNote', function(req, res) {
    let noteData = req.body;

    if (req.body.token != CryptoJS.SHA3(req.body.userId+process.env.TOKEN).toString()) {
      res.send(401);
      return;
    }

    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }
      let sql = `UPDATE notes SET noteBlob = ${mysql.escape(noteData.noteBlob)} WHERE userId = ${mysql.escape(noteData.userId)} AND noteId = ${mysql.escape(noteData.noteId)}`;
      req.app.locals.con.query(sql, function(err, data) {
        if (err) {
          console.log(err)
        }  
        res.json(data);
      })
    })
  });



  //
  // Radera bestämd note genom en inloggad användare. 
  //

  router.post('/deleteNote', function(req, res) {
    let noteData = req.body;

    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }
      let sql = `DELETE FROM notes WHERE userId = ${mysql.escape(noteData.userId)} AND noteId = ${mysql.escape(noteData.noteId)}`;
      req.app.locals.con.query(sql, function(err, data) {
        if (err) {
          console.log(err)
        } 
        res.json(data);
      })
    })
  });

module.exports = router;

