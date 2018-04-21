var express = require('express');
var connect = require('../utils/sqlConnect');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));
/* ADDS MOVIE review */
router.post('/', (req, res, next) => {

  // do an SQL query to  POST review

  connect.query(`INSERT INTO tbl_comments (comments_id, comments_auth, comments_copy, comments_date, comments_movie,
  comments_rating) VALUES (NULL, NULL, "${req.body.comment}", CURRENT_TIMESTAMP(), "${req.body.id}", "${req.body.stars}");`, (error, rows)=> {
    if (error) {
      throw error;
    } else {
      res.json(rows);
    }
  })
});


module.exports = router;
