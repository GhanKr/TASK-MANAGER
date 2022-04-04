let addbtn=document.querySelector('.add-btn');
let removebtn=document.querySelector('.remove-btn');
let modal=document.querySelector('.modal-cont');
let maincont=document.querySelector('.main-cont');
let colors=['lightpink','lightgreen','lightblue','black'];
let priorityColor=colors[colors.length-1];
let colorarr=document.querySelectorAll('.priority-color');
let taskvalue=document.querySelector('.textarea-cont');
let flag=false;
let removeflag=false;
addbtn.addEventListener('click', function(e){
    flag=!flag;
    if(flag){
        modal.style.display ='flex';
    }
    else{
        modal.style.display ='none';
    }

})
removebtn.addEventListener('click', function(e){
    removeflag=!removeflag;
    if(removeflag){
    removebtn.style.color = 'blue';
        }
    else{
     removebtn.style.color='black';
    }
})
function removetask(toremoveTicket){
    toremoveTicket.addEventListener('click',function(e){
        if(removeflag){
            toremoveTicket.remove();
        }
    })
}
modal.addEventListener('keydown', function(e){
    let key=e.key;
    if(key=='Shift'){
        createTicket(priorityColor, taskvalue.value);
        modal.style.display='none';
        flag=false;
        taskvalue.value=null;
    }

})
colorarr.forEach(function(colorElem){
    colorElem.addEventListener('click', function(e){
        colorarr.forEach(function(colorTab){
            colorTab.classList.remove('active');
        })
        colorElem.classList.add('active')
        priorityColor=colorElem.classList[0];
    })
})
function createTicket(ticket_priorityColor, value){
    let ticketcontainer=document.createElement('div');
    ticketcontainer.setAttribute('class','task');
    ticketcontainer.innerHTML= `<div class="task-priority ${ticket_priorityColor}"></div>
    <div class="task-id"></div>
    <div class="task-area">${value}</div>`
    maincont.appendChild(ticketcontainer);
    removetask(ticketcontainer);
}