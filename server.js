var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
        host: 'db.imad.hasura-app.io',
        user: 'byash',
        password: process.env.DB_PASSWORD,
        database: 'BYash',
        port: '5432'
};

var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article one | Yash B',
        links: ` <a href="/">Home</a>
                <a href="/article-two">Article-two</a>
                <a href="/article-three">Article-three</a>`,
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
        links: ` <a href="/">Home</a>
                <a href="/article-one">Article-one</a>
                <a href="/article-three">Article-three</a>`,
        heading: 'Article two',
        content: `
            <p>
            This is the content for article two.
            </p>`
    },
    'article-three': {
        title: 'Article three | Yash B',
        links: `<a href="/">Home</a>
                <a href="/article-one">Article-one</a>
                <a href="/article-two">Article-two</a>`,
        heading: 'Article three',
        content:`
            <p>
            This is the content of article three.
            </p>`
    }
};

function createTemplate (data) {
    var title = data.title;
    var links = data.links;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `<html>
  <head>
        <title>
            ${title}
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
        <body>
            <hr/>
            <div>
                ${links}
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${content}
            </div>
        </body>
</html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/test-dtb',function(req,res){
    pool.query('select * from test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result));
       }
    });
});

var counter=0;
app.get('/counter', function (req, res) {
  counter=counter+1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res){
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
   pool.query("select * from article where title =' " + req.params.articleName + "'", function(err, result) {
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
