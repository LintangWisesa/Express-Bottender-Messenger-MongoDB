const { router, text, payload } = require('bottender/router');

async function Hello(context) {
  const chat = context.event.text;
  context.setState({
    chat
  });
  await context.sendText('Hello World!');
}

async function Unknown(context) {
  const chat = context.event.text;
  context.setState({
    chat
  });
  await context.sendText('Sorry, I don\'t understand');
}

async function TestState(context) {
  const chat = context.event.text;
  context.setState({
    chat
  });
  await context.sendText(`Text: ${chat} on: ${context.platform} id: ${context.session.id}`);
}

module.exports = async function App() {
  return router([
    
    // return the `Hello` action when receiving "hello"/"hi" (case-insensitive) text messages
    text(/^(hello|hi)$/i, Hello),
    
    // return the `TestState` action when receiving "test" (case-insensitive) text messages
    text(/^(test)$/i, TestState),
    
    // unhandled route
    text('*', Unknown),

  ]);
}