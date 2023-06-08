const express = require('express')
const handlebars= require('express-handlebars')
const homeRouter = require('./routes/home.router')
const http = require('http')
const {Server} = require('socket.io')
const app = express()

//Configiracion de puerto
const PORT = process.env.PORT || 8080

//Server HTTP
const server = http.createServer(app)

//Socket BACK
const io = new Server(server)

//Public
app.use(express.static(__dirname+'/public'))

//Views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//Routes
app.use('/home', homeRouter)

let mensajes = []

//logica de websocket
io.on('connection', (socket)=>{
  console.log('nuevo usuario conectado')
  socket.on('new-message', (data)=>{
    console.log(data)
    mensajes.push(data)
    io.sockets.emit('messages-all', mensajes)
  })
})


server.listen(PORT, ()=>{
  console.log('Server ok! on port 8080')
})