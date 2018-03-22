# CheckYourCar
This example was created as a conversation starter for a connecting app to a car. When you open a new tab on this page you get assigned a random profile name. Once on the page you click the circular shape you see (this represents the amount of times you would have been connected to the car). Then you send off the information. Once sent, everyone that is "online" can see the amount of times you have pressed your circular shape. If someone else has done the same as you and have another username you will see their number too.

To try this out, make sure that you have two tabs open with the same webadress, and also make sure that the two tabs have different profile names.

This example is based on Clint Heyer's Websocket - Skeleton. 
Beneath lies his original ReadMe.md

# websockets-skeleton

This is a skeleton websocket example. It consists of a "server" script (app.js) that runs in the Node.js environment, and typical "client" code in the public/ folder.

The example shows how to send a message from a client and have this distributed to every other client connected to the same server.

A hosted version of this is on [Glitch for you to fork and modify](https://glitch.com/edit/#!/ch-websockets-skeleton)

# Setup 

In the directory you've got this sample:

`$ npm install`

This will install the necessary packages from npm.

# Running

Once set up, you can boot up your server with

`$ npm start`

It will continue running. To stop it again, press CTRL+C (PC) or CMD+C (Mac).

# Uses

* [reconnecting-websocket](https://github.com/pladaria/reconnecting-websocket) wrapper (v3.2.2)

# Read more

* [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
* [express-ws](https://www.npmjs.com/package/express-ws)
