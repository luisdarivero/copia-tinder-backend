const { addUser, removeUser, getUser, getUsersInRoom } = require('./socketUsers');

const socketLogic = (io) => {
    
    io.on('connect', (socket) => {
        socket.on('join', ({ name, room }, callback) => {
          try{
            const { error, user } = addUser({ id: socket.id, name, room });
      
            if(error) return callback(error);
        
            socket.join(user.room);
        
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
            //socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        
            callback();
          }
          catch(err){

          }
        });
      
        socket.on('sendMessage', (message, callback) => {
          try{
            const user = getUser(socket.id);
            io.to(user.room).emit('message', { user: user.name, text: message });
            callback();
          }
          catch(err){
            
          }
          
        });
      
        socket.on('disconnect', () => {
          const user = removeUser(socket.id);
        })
    }
    
)}




  module.exports = socketLogic;