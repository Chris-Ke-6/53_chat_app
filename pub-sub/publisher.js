'use strict'
const express = require("express");
const redis = require("redis");

const publisher = redis.createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

const message = "Hi";

(async function() {
await publisher.connect();
await publisher.publish("channel-01", message); //hello-World ist der Message Inhalt
console.log('Message sent');
})();

