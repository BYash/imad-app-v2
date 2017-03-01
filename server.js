var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'byash',
    database:'byash',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article one | Yash B',
        heading: 'Article one',
        content: `<p>
                    This is the content of article one.This is the content of article one.This is the content of article one.
                    This is the content of article one.This is the content of article one.This is the content of article one.
                    This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.
                </p>
                <p>
                    This is the content of article one.This is the content of article one.This is the content of article one.
                    This is the content of article one.This is the content of article one.This is the content of article one.
                    This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.
                </p>
                <p>
                    This is the content of article one.This is the content of article one.This is the content of article one.
                    This is the content of article one.This is the content of article one.This is the content of article one.
                    This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.
                </p>`
    },
    'article-two': {
        title: 'Article two | Yash B',
        heading: 'Article two',
        content: `
            <p>
            This is the content for article two.
            </p>`
    },
    'article-three': {
        title: 'Article three | Yash B',
        heading: 'Article three',
        content:`
            <p>
            This is the content of article three.
            </p>`
    }
};

function createTemplate (data) {
    
}

var pool = new Pool(config);
app.get('/test_db',function(req,res){
    pool.query('select * from test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function (req, res) {
  counter=counter+1;
  res.send(counter.toString());
});

app.get('/article_one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article_one.html'));
});

app.get('/article_two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article_two.html'));
});

app.get('/article_three', function (req, res) {
  res.send('Article-three requested and will be served here');
});

app.get('articles/:articleName',function(req,res){
   pool.query("select * from article where title = " + req.params.articleName, function(req,res) {
      if(err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length === 0) {
              res.status(404).send('Article not found');
          } else {
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
   });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
