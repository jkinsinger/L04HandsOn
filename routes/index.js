var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Password!",
  database: 'Sakila'
})

connection.connect(function(err){
  if(err){
    console.error(err.message)
    return
  }
  console.log('Yay! You are connected to the database.')
})

/* GET film  page. */

const filmList = `SELECT * from film`;

router.get('/film', function(req, res) {
  connection.query(filmList, function(err, result){
    res.render('film', {
      films: result
    });
  });
});


/* GET film details */

router.get('/film/:id', function(req, res, next){
  let filmId = parseInt(req.params.id);
  console.log(filmId);

  let idQuery = `SELECT * FROM WHERE film_id =${filmId}`

  console.log(idQuery);

  connection.query(idQuery, (err, result) => {
    console.log(result);
    if (result.length > 0 ) {
      res.render ('filmDetails', {
        film: result[0]
      });
    } else
      res.send('not a valid id.')
      console.log(result)
  })
})
module.exports = router;
