const { chain } = require('bottender');
const { router, text, route, payload } = require('bottender/router');
const { Hello } = require('./actionHello')
const { Main } = require('./actionMain')

// #################### Main App ####################
module.exports = async function App() {

  return router([
    // call Hello action when receiving "hello"/"hi" (case-insensitive) text messages
    text(/^(hello|hi)$/i, Hello),
    // call Main action for any text except "hello/hi"
    text('*', Main)
  ]);

}