require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const My_Uri = "mongodb+srv://CaoHuuKhuongDuy:21nhatranG@cluster0.hrxneeb.mongodb.net/fcc-mongodb-and-mongoose?retryWrites=true&w=majority"
mongoose.connect(My_Uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/youtube',function(req, res){
  res.redirect("https://www.youtube.com/");
})
// app.get("/hello",function (req,res){
//   res.send("hello")
// })
app.post('/api/shorturl',function (req, res){
  // console.log(req.body.url)
  res.send("hello");
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
