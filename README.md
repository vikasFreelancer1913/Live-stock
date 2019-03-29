# WebSocket Demo

The WebSocket API allows you to to maintain a continuous two-way connection between client and server.
Messages can be sent and received on both ends.
When data changes on the server, let the clients know without asking. This is a form of performance improvement that frees the user from manual refresh actions (F5, pull to refresh). New challenges: (re)connection management, state reconciliation.

## Requirements

* [Node.js](http://nodejs.org/)
* express
* ws

## Installation Steps

```bash
npm install
npm start
open http://localhost:8080/
```