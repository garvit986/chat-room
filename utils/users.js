const Users = []

function userJoin(id, username, room){
    const user = { id, username, room}
    Users.push(user)
    return user
}
 
function findcurrUser(id){
    return Users.find(user=> user.id===id)
}

function userLeaves(id){
    const index = Users.find(user=> user.id===id)
    if(index!=-1) return Users.splice(index,1)[0]
}

function getRoomUsers(room){
    return Users.filter(user=>user.room === room)
}

module.exports = { userJoin, findcurrUser, userLeaves, getRoomUsers }