require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
// const mongoose = require('mongoose')
// const My_Uri = "mongodb+srv://CaoHuuKhuongDuy:21nhatranG@cluster0.hrxneeb.mongodb.net/fcc-mongodb-and-mongoose?retryWrites=true&w=majority"
// mongoose.connect(My_Uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Basic Configuration
const port = process.env.PORT || 3000;

// const LinkSchema = new mongoose.Schema({
//   url : String
// })
// let Url_model = mongoose.model('Url',LinkSchema);

// let url = new Url_model({url : "https://www.facebook.com"})
// url.save()



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

let Url_data = new Map()

app.post('/api/shorturl',function(req, res){
  let url = req.body.url;
  // console.log(url);
  if (!Url_data.has(url)) Url_data.set(url,Url_data.size + 1);
  let result = {
    original_url : url,
    short_url : Url_data.get(url)
  }
  res.send(result);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
