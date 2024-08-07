const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const { formatMessage } = require('./utils/message')
const { userJoin, findcurrUser, userLeaves, getRoomUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))
io.on('connection', socket=>{

  socket.on('joinRoom', ({username, room})=>{

    const user = userJoin(socket.id, username, room)

    socket.join(user.room )

    socket.emit('message', formatMessage('Admin',"Welcome to CHATROOM"))
    socket.broadcast.to(user.room).emit('message', formatMessage('Admin',`A ${user.username} has joined the chat`))
    io.to(user.room).emit('roomUsers',{
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  // io.emit()
  socket.on('disconnect', ()=>{
    const user = userLeaves(socket.id)
    if(user){

      io.to(user.room).emit('message', formatMessage('Admin',`A ${user.username} has left CHATROOM`))
    }
  })
  socket.on('chatMessage', (msg)=>{
    const user =  findcurrUser(socket.id)
    io.to(user.room).emit('message', formatMessage(user.username ,msg))
  })

})
  

PORT = 5000
server.listen(PORT,()=> console.log(`Server running on Port ${PORT}`))