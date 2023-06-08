const socket = io()

socket.on('messages-all', (data)=>{
  console.log(data)
  render(data)
  let chat = document.getElementById('caja')
  chat.scrollTop = chat.scrollHeight
})

function render(data){
  const html = data.map(elem =>{
      return (
          `
          <div>
            <strong> ${elem.author} </strong> dice <em> ${elem.text} </em>
          </div>
        `
      )
  }).join(' ')

  document.getElementById('caja').innerHTML = html
}



function addmessage(){
  const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value
  }
  socket.emit('new-message', mensaje)

  document.getElementById('text').value = ""

  console.log(mensaje)
  
  
  return false
}