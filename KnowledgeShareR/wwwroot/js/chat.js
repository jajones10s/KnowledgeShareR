﻿"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

const sendBtn = document.getElementById("sendButton");
const countDownBtn = document.getElementById("countDownButton");

if(sendBtn != undefined && countDownBtn != undefined)
{
    sendBtn.addEventListener("click", function (event) {
        const user = document.getElementById("userInput").value;
        const message = document.getElementById("messageInput").value;
        console.log(user);
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
    
        event.preventDefault();
    });
    
    countDownBtn.addEventListener("click", function (event) {
        connection.invoke("CountDown").catch(function (err) {
            return console.error(err.toString());
        });
    
        event.preventDefault();
    });
}

connection.start().then(function () {
    console.log("Connection Started");
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", function (user, message) {
    let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let encodedMsg = user + " says " + msg;
    let li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("CountDownReceived", function (message) {
    let li = document.createElement("li");
    li.textContent = message;
    document.getElementById("messagesList").appendChild(li);
});