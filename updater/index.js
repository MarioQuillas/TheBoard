﻿// updater/index.js
(function (updater) {
    var socketio = require("socket.io");

    updater.init = function(server) {
        var io = socketio.listen(server);

        io.sockets.on("connection", function(socket) {
            console.log("socket was connected");

            // this emit will be only send to that particular socket!!!!
            // socket.emit("showThis", "this is from the server");

            // more intereting : we can broadcast the message to all clients

            socket.on("join category",
                function(category) {
                    socket.join(category);
                });

            socket.on("newNote", function(data) {
                socket.broadcast.to(data.category).emit("broadcast note", data.note);
            });
        });
    };

})(module.exports)