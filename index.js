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
let Url_index = []

function valid_url(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

app.post('/api/shorturl',function(req, res){
  let url = req.body.url;
  if (!valid_url(url))
    {
      res.send({"error": 'invalid url'})
      return;
    }
  if (!Url_data.has(url)) 
    {
      Url_data.set(url,Url_data.size + 1);
      Url_index.push(url);
    }
  let result = {
    original_url : url,
    short_url : Url_data.get(url)
  }
  res.send(result);
})

app.get('/api/shorturl/:number',function (req,res){
  let number = req.params.number;
  number = Number(number);
  if (number == 0) res.send({"error":"Wrong format"});
  else if (number > Url_data.size) res.send({error : "No short URL found for the given input"})
  else res.redirect(Url_index[number - 1])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
