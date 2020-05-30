const { chain } = require('bottender');
const { router, text, route, payload } = require('bottender/router');
const mongc = require('mongodb').MongoClient
const { url } = require('./../mongo.config')

// #################### Action Hello ####################

async function Hello(context) {
  const session = context.session
  
  // update state
  const chat = context.event.text;
  context.setState({
    chat
  });
  
  // save to mongo
  mongc.connect(url, (error, client)=>{
    var koleksi = client.db('bottender').collection('chats')
    koleksi.insertOne({
      'id': session.id, '_state': session._state, 'lastActivity': session.lastActivity,
      'platform': session.platform, 'user': session.user
    })
    client.close()
  })

  // response chat
  await context.sendText('Hello World!');
}

// #################### Action Unknown ####################

async function Unknown(context) {
  const session = context.session
  
  // update state
  const chat = context.event.text;
  context.setState({
    chat
  });
  
  // save to mongo
  mongc.connect(url, (error, client)=>{
    var koleksi = client.db('bottender').collection('chats')
    koleksi.insertOne({
      'id': session.id, '_state': session._state, 'lastActivity': session.lastActivity,
      'platform': session.platform, 'user': session.user
    })
    client.close()
  })

  // response chat
  await context.sendText('Sorry, I don\'t understand');
}

// #################### App: name & birthday ####################

async function hitung(context) {
  switch(context.state.count){
    case 0:
      var count = context.state.count + 1
      context.setState({
        count
      });
      await context.sendText(`Case: ${count}`);
      break
    case 1:
      var count = context.state.count + 1
      context.setState({
        count
      });
      await context.sendText(`Case: ${count}`);
      break
    case 2:
      var count = 0
      context.setState({
        count
      });
      await context.sendText(`Case: ${count}`);
      break
  }
  
  // var count = 0
  // context.setState({
  //   count
  // });
  // await context.sendText(`Hitung: ${count}`);
}

// #################### Main App ####################

module.exports = async function App() {

  return router([
    // return the `Hello` action when receiving "hello"/"hi" (case-insensitive) text messages
    text(/^(hello|hi)$/i, Hello),
    // hitung
    text('a', hitung),    
    // unhandled route
    text('*', Unknown),
  ]);

}