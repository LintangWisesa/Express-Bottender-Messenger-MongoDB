const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

const mongo = require('mongodb')
const { url } = require('./mongo.config')

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});
const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const verify = (req, _, buf) => {
    req.rawBody = buf.toString();
  };
  server.use(bodyParser.json({ verify }));
  server.use(bodyParser.urlencoded({ extended: false, verify }));

// #################### GET /messages: show all chats ####################

  server.get('/messages', (req, res) => {
    mongo.MongoClient.connect(url, (error, client)=>{
        var koleksi = client.db('bottender').collection('chats')
        koleksi.find().toArray((error, data)=>{
            res.send(data)
            client.close()
        })
    })
  });

// #################### GET /messages/{id}: show chat by id ####################

  server.get('/messages/:id', (req, res) => {
    mongo.MongoClient.connect(url, (error, client)=>{
        var koleksi = client.db('bottender').collection('chats')
        koleksi.find({'_id': new mongo.ObjectID(req.params.id)}).toArray((error, data)=>{
            res.send(data[0])
            client.close()
        })
    })
  });

// #################### DELETE /messages/{id}: delete chat by id ####################

  server.delete('/messages/:id', (req, res) => {
    mongo.MongoClient.connect(url, (error, client)=>{
        var koleksi = client.db('bottender').collection('chats')
        koleksi.deleteOne({'_id': new mongo.ObjectID(req.params.id)}, () => {
            res.send({
              data_id: req.params.id,
              status: 'Deleted'             
            })
            client.close()
        })
    })
  });

// #################### webhook request route ####################

  server.all('*', (req, res) => {
    return handle(req, res);
  });

// #################### express server activation ####################

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Server is listening on http://localhost:${port}`);
  });

});