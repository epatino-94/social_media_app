var express = require('express');
var cookieParser = require('cookie-parser');
var posts = require('./routes/posts');
var auth = require('./routes/auth');
var app = express();
var cors = require('cors')

app.use(express.json());
app.use(cookieParser());



app.use('/', express.static('public'));
app.use("/api/auth",auth);
app.use('/api/posts', posts);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



app.listen(8080,()=>{
  console.log('Connected');
})

