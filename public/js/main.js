const chatform = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userNames = document.getElementById('users')

const { username, room } = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})
console.log(username, room)
const socket = io()

socket.emit('joinRoom', {username, room})

socket.on('message', message=>{
    console.log(message)
    outputMessage(message) // THis messages are coming from server
})

socket.on('roomUsers', ({room, users})=>{
    outputRoomName(room)
    outputUsers(users)
})

chatform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const msg = e.target.elements.msg.value
    // console.log(msg)
    socket.emit('chatMessage', msg)

    chatMessages.scrollTop = chatMessages.scrollHeight

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`
    document.querySelector('.chat-messages').appendChild(div)
}

function outputRoomName(room){
    roomName.innerText = room
}

function outputUsers(users){
    userNames.innerHTML= `${users.map(user=> `<li>${user.username}</li>`).join('')}`
}