var express = require('express');
var cookieParser = require('cookie-parser');
var posts = require('./routes/posts');
var auth = require('./routes/auth');
var app = express();
var multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })


app.use(express.json());
app.use(cookieParser());

app.post(`/api/upload`,upload.single(`file`), (req,res,next)=>{
  const file = req.file;
  res.status(200).json(`/images/${file.filename}`);
});


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

