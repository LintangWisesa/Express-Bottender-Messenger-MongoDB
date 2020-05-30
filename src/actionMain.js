const mongc = require('mongodb').MongoClient
const { url } = require('../mongo.config')
var moment = require('moment')

module.exports = {
    
// #################### Action Main: ask for name & birthday ####################
    
    Main: async function(context) {
        // session
        const session = context.session

        // switch step
        switch(context.state.count){
          
          case 0:
            // state
            var count = context.state.count + 1
            context.setState({
              count
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
            await context.sendText(`Hi! What's your name?`);
            break
          
          case 1:
            // state
            var nama = context.event.text
            var count = context.state.count + 1
            context.setState({
              count,
              nama
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
            await context.sendText(`Hello ${nama}, when is your birthday? Please answer in YYYY-MM-DD format.`);
            break
        
          case 2:
            // state
            var now = moment()
            var bday = context.event.text
            var count = context.state.count + 1
            context.setState({
              count,
              bday
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
            // calculate day differences
            bday = moment(bday, 'YYYY-MM-DD', true);

            if (bday.isValid()){
              // response chat
              await context.sendText(`Your birthday is at ${bday.format('LL')}. Do you want to know how many days till your next birthday?`, {
                quickReplies: [
                  {
                    contentType: 'text',
                    title: '✅ Yes',
                    payload: 'BIRTHDAY_YES',
                  },
                  {
                    contentType: 'text',
                    title: '⛔ No',
                    payload: 'BIRTHDAY_NO',
                  },
                ],
              });
              break
            } else {
              // response chat
              var count = 0
              context.setState({
                count
              });
              await context.sendText(`Sorry, your birthday is not valid`);
              break
            }

          case 3:
            // state
            var know
            if (context.event.isPayload){
              know = context.event.payload.split('_')[1]
            } else {
              know = context.event.text
            }
            var bday = moment(context.state.bday).format('YYYY-MM-DD')
            var now = moment().format('YYYY-MM-DD')
            var count = 0
            context.setState({
              know,
              count
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
            // calculate how many days till next birthday
            bdayNow = bday.split('-')
            bdayNow = `${now.split('-')[0]}-${bdayNow[1]}-${bdayNow[2]}`
            bdayNow = moment(bdayNow).format('YYYY-MM-DD')
            var dayleft
            if(bdayNow > now){
              dayleft = moment(bdayNow).diff(moment(now), 'days')
            } else if(bdayNow < now) {
              bdayNow = moment(bdayNow).add(1, 'year').format('YYYY-MM-DD')
              bdayNow = moment(bdayNow).format('YYYY-MM-DD')
              dayleft = moment(bdayNow).diff(moment(now), 'days')
            } else {
              dayleft = 0
            }
            // response chat
            if (know.toUpperCase().startsWith('Y')){
              await context.sendText(`It's ${dayleft} day(s) left till your next birthday at ${moment(bdayNow).format('LL')}`);
              break
            } else {
              await context.sendText(`Ok then. Good bye ~`);
              break
            }
        }
    
    }
}
  