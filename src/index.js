const { router, text, payload } = require('bottender/router');
var mongc = require('mongodb').MongoClient

// mongodb user, password & url
var user = 'lintang'
var pass = '1234'
var url = `mongodb://${user}:${pass}@localhost:27017/bottender`

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

// #################### Main App ####################

module.exports = async function App() {
  return router([
    
    // return the `Hello` action when receiving "hello"/"hi" (case-insensitive) text messages
    text(/^(hello|hi)$/i, Hello),
    
    // unhandled route
    text('*', Unknown),

  ]);
}