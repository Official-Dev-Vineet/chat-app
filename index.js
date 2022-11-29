// let messages = document.querySelector('.messages')
let inputMsg = document.querySelector('#msg')
let status = document.querySelector('.status')

inputMsg.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        e.target.value = ''
        let msg = document.createElement('div');
        msg.classList.add('msg-send')
        msg.innerText = 'message sent.'
        document.body.appendChild(msg);
        setTimeout(()=>{
            document.body.removeChild(msg);
        },1500)
    }
    else {
        status.innerText = 'typing...'
        setTimeout(() => {
            status.innerText = ''
        }, 2000)
    }
})