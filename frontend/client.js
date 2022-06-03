const socket = io('http://localhost:8000', {
    withCredentials:true
});

const form = document.querySelector("#send-container");
const messageInp = document.querySelector("#messageInp");
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');

const appendMssg = (message, position)=>{
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    messageDiv.classList.add('message');
    messageDiv.classList.add(position);
    messageContainer.append(messageDiv);
    audio.play();
}
const name = prompt("Enter your name to join chat");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    const mssg =`${name} joined the chat`;
    appendMssg(mssg,'right');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    appendMssg(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInp.value='';
})
socket.on('receive', data=>{
    appendMssg(`${data.name} : ${data.message}`, 'left');
})
socket.on('left', user=>{
    appendMssg(`${user} left the chat`, 'left');
})