![simplinnovation](https://4.bp.blogspot.com/-f7YxPyqHAzY/WJ6VnkvE0SI/AAAAAAAADTQ/0tDQPTrVrtMAFT-q-1-3ktUQT5Il9FGdQCLcB/s350/simpLINnovation1a.png)

## __Express.js, Bottender.js, Facebook Messenger & MongoDB__

- Project started: __Saturday 30/05/2020__ at __8.30 AM (GMT+7)__.
- Project finished: __Sunday 31/05/2020__ at __8.02 AM (GMT+7)__.
- Created using _Express.js, ngrok, Bottender.js, Moment.js, MongoDB & Messenger Webhook_.


<hr>

### __A. Result__

1. __Facebook Messenger Bot__

    The chatbot can handle a simple task. When a user start a conversation & says _"Hi"_ or _"Hello"_, it will answer _"Hello World!"_. When a users says something randomly, it will ask for user's name, user's birthday & offer to calculate how many days till user's next birthday.

    <img src="./img/a.png">

2. __Data Stored on MongoDB__

    Everything is stored on MongoDB database named ```bottender```, which has 2 collections: ```sessions``` & ```chats```. Every latest user's sessions is stored on ```sessions``` collection, while every received messages is stored on ```chats``` collection.

    <img src="./img/e.png">

3. __REST API__

    It also has REST API that can be used to access all received messages, access single chat by ID (MongoDB ID) & delete single chat by ID (MongoDB ID).

    - __GET ```/messages```__: show all received messages

        <img src="./img/b.png">

    - __GET ```/messages/{id}```__: show single message by MongoDB id

        <img src="./img/c.png">

    - __DELETE ```/messages/{id}```__: delete single message by MongoDB id

        <img src="./img/d.png">

<hr>

### __B. Instructions__

1. __MongoDB Set Up__

    Activate your local MongoDB server then open MongoDB shell or its GUI (MongoDB Compass). I prefer use MongoDB shell. Create a database names ```bottender``` with 2 collections inside: ```sessions``` & ```chats```. To activate MongoDB server execute:

    ```bash
    $ cd C:\Program Files\MongoDB\Server\4.2\bin
    $ mongod
    ```

    MongoDB server has activated. Open new terminal & execute these command to activate MongoDB work shell, create database, database user & collections:

    ```bash
    $ cd C:\Program Files\MongoDB\Server\4.2\bin
    $ mongo

    > use bottender
    > db.createUser({user:"YOUR_USERNAME", pwd:"YOUR_PASSWORD", roles:["readWrite",  "dbAdmin"]})
    > db.createCollection('sessions')
    > db.createCollection('chats')
    ```
    
<hr>

2. __Clone & Set Up Project__

    Simply clone this project from github then install all dependencies needed:

    ```bash
    $ git clone https://github.com/LintangWisesa/Express-Bottender-Messenger-MongoDB.git
    $ cd Express-Bottender-Messenger-MongoDB
    $ npm i
    ```

<hr>

3. __Set Up ```mongo.config.js```__

    On project root, open ```mongo.config.js``` then edit the MongoDB url line with your MongoDB user, password & database.

    ```javascript
    module.exports = {
        url: `mongodb://YOUR_USERNAME:YOUR_PASSWORD@localhost:27017/bottender`,
    }
    ```
    Save it.

<hr>

4. __Connect to Facebook Messenger__

    To complete our Messenger connection, we have to find these values:
    
    - __Messenger Page ID__
    - __Messenger Access Token__
    - __Messenger App ID__
    - __Messenger App Secret__
    - __Messenger Verify Token__

    To do that, make sure you have an active Facebook Page then signup/login to [Facebook for Deveopers](https://developers.facebook.com/). Create an application by click __My Apps__ => __Create App__. Click __Set Up__ button on Messenger & search for those 5 values (__*Note:*__ you can set __Messenger Verify Token__ to any text or simply insert your application name).
    
    After that, back to your project directory & create an ```.env``` file with these following values:
    
    ```bash
    MESSENGER_PAGE_ID=your_page_id
    MESSENGER_ACCESS_TOKEN=your_access_token_id
    MESSENGER_APP_ID=your_app_id
    MESSENGER_APP_SECRET=your_app_secret
    MESSENGER_VERIFY_TOKEN=your_app_name
    ```
    
    Save it.

<hr>

5. __Run the project__

    You can run your bot on terminal using Bottender Console or activate it on your Express server.

    - __Running on Terminal (Bottender Console)__

        If you want to run this project on console, first open ```package.json``` and set these value:

        ```json
        "dev": "bottender dev",
        "start": "bottender start",
        ```

        Save, then execute this command:

        ```bash
        $ npm run dev -- --console
        ```

        Now you can chat with your bot on terminal.

    - __Running on Express Server__

        If you want to run this project on Express server, first open ```package.json``` and set these value:

        ```json
        "dev": "nodemon server.js",
        "start": "node server.js",
        ```

        Save, then execute this command:

        ```bash
        $ npm run dev
        ```

        Now your bot application is run on ```http://localhost:5000```, including its REST API. Try to __GET ```/messages```__ to show all received messages.

<hr>

6. __Make Public Server__

    Run your project on Express server, then make it public. You can deploy the project on cloud (for instance: __Heroku__, __AWS__ or __Google Cloud__) or in this case I simply use __ngrok__ to create public URL for my project. Download [__ngrok__ here](https://ngrok.com/) then execute from terminal:

    ```bash
    $ ngrok.exe http 5000
    ```

    Then you'll get these information, including your server's public URL. _Note your HTTPS public URL!_

    <img src="./img/f.png"> 

<hr>

7. __Set Webhook & Going Live!__

    Note your HTTPS public URL, then back to your project. In your project, open new terminal then execute this:

    ```bash
    $ npx bottender messenger webhook set -w https://YOUR_HTTPS_PUBLIC_URL/webhooks/messenger
    ```

    It will set Messenger webhook, connect your project to Facebook application & your bot will live on your Facebook Page. Try to send a message!

    Enjoy ~ 😎

<hr>

#### Lintang Wisesa :love_letter: _lintangwisesa@ymail.com_

[Facebook](https://www.facebook.com/lintangbagus) | 
[Twitter](https://twitter.com/Lintang_Wisesa) |
[LinkedIn](https://www.linkedin.com/in/lintangwisesa/) |
[Youtube](https://www.youtube.com/user/lintangbagus) | 
:octocat: [GitHub](https://github.com/LintangWisesa) |
[Hackster](https://www.hackster.io/lintangwisesa)