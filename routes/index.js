var express = require('express');
var connect = require('../utils/sqlConnect');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  // SQL get all query, to populate the page
  connect.query(`SELECT * FROM
    tbl_movies m, tbl_genre g, tbl_mov_genre mg
    WHERE m.movies_id = mg.movies_id
    AND g.genre_id = mg.genre_id`, (error, rows)=>  {
    if (error) {
      throw error;
    }else {
      res.render('home', {
          
          //This randomizes the promo default movie HOWEVER, due to sample size, it's not truly random
        defaultMovie : rows[Math.floor(Math.random() * rows.length)],
          
        data : JSON.stringify(rows),
        mainpage : true,
        videopage : false

      });
    }
  })
});

router.get('/movies/:id/:vidsrc', (req, res) => {
          // Grab movie details
  console.log(req.params.id, req.params.vidsrc);
        // Load comments RE: that movie with an SQL query
  connect.query(`SELECT * FROM tbl_comments WHERE comments_movie = "${req.params.id}"`, (err, rows)=> {
    if (err) {
      console.log(err);
    } else {
      res.render('movie', {
        movie : req.params.id,
        trailer : req.params.vidsrc,
        data : JSON.stringify(rows),
        mainpage : false,
        videopage : true
      });
    }
  })
});


module.exports = router;
