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
  
        let sql = `SELECT noteId, noteName, userId FROM notes WHERE userID = ${unserId}`;
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
  
        let sql = `SELECT noteId, noteName, noteBlob, userId FROM notes WHERE noteId = '${noteId}'`;
  
        req.app.locals.con.query(sql, function(err, data) {
        if (err) {
            console.log(err)
          }
          data.map(text => {
            text.noteBlob = Buffer.from(text.noteBlob).toString();
          })
         // console.log("data", data);  
         
          res.json(data);
        })
    })
  });


  //
  //Redigera rådata till befintligt noteId
  //

  router.post('/changeNote', function(req, res) {
    let noteData = req.body;

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

