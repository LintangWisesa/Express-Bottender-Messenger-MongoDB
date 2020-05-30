const mongc = require('mongodb').MongoClient
const { url } = require('../mongo.config')

module.exports = {
    
// #################### Action Hello ####################
    
    Hello: async function(context) {
        // session
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
    },

}
  