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
let lock='fa-lock'
let unlock='fa-lock-open'
let toolboxColors=document.querySelectorAll('.color')
let ticketArr=[]
let filterflag=false;
let updateColor;

// to identify when add button is clicked
addbtn.addEventListener('click', function(e){
    flag=!flag;
    if(flag){
        modal.style.display ='flex';
    }
    else{
        modal.style.display ='none';
    }

})
// to remove existing tickets on clicking it

removebtn.addEventListener('click', function(e){
    removeflag=!removeflag;
    if(removeflag){
    removebtn.style.color = 'blue';
        }
    else{
     removebtn.style.color='black';
    }
})

//after filling out the ticket details remove insert details ticket popup
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
// to create ticket in main div after filling out ticket form

function createTicket(ticket_priorityColor, value, taskId){
    let id=taskId || shortid();
    let ticketcontainer=document.createElement('div');
    ticketcontainer.setAttribute('class','task');
    ticketcontainer.innerHTML= `<div class="task-priority ${ticket_priorityColor}"></div>
    <div class="task-id">#${id}</div>
    <div class="task-area">#${value}</div>
    <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
</div>`
    maincont.appendChild(ticketcontainer);
    removetask(ticketcontainer);
    handleLock(ticketcontainer);
    if(!taskId){
    ticketArr.push({ticket_priorityColor,value,taskId:id})
    localStorage.setItem('tickets', JSON.stringify(ticketArr))
    }
}
// to make a ticket editable or uneditable with lock button 
function handleLock(tickett){
    let ticketlock=tickett.querySelector('.ticket-lock');
    let lockelement=ticketlock.children[0]
    let taskarea=tickett.querySelector('.task-area')
    let toedit=taskarea.children[0]

    lockelement.addEventListener('click', function(e){
        if(lockelement.classList.contains(lock)){
            lockelement.classList.remove(lock)
            lockelement.classList.add(unlock)
            taskarea.setAttribute('contenteditable', 'true')
            priorityChange(tickett)
        }
        else{
            lockelement.classList.remove(unlock)
            lockelement.classList.add(lock)
            taskarea.setAttribute('contenteditable', 'false')
        }
    })
}
//to change priority colors on clicking priority bar
function priorityChange(ticketpriority){
    let tochangecolor=ticketpriority.querySelector('.task-priority');
    
    tochangecolor.addEventListener('click', function(e){
        let classcolor=tochangecolor.classList[1];
        tochangecolor.classList.remove(classcolor);
        let colorIndex=colors.findIndex(function(color){
            return classcolor==color
        })
        colorIndex++;
        colorIndex=colorIndex%colors.length;
        tochangecolor.classList.add(colors[colorIndex])

    })
}
// to filter out and display the respective priority colors ticket when toolbox is clicked
for (let i = 0; i < toolboxColors.length; i++) {
    toolboxColors[i].addEventListener('click', function (e) {
      //  filterflag=!filterflag
      //  if(filterflag){
        let clickedColor = toolboxColors[i].classList[0]
      
        if(updateColor != clickedColor){
            updateColor=clickedColor;
        console.log(ticketArr)
        let allTicket = document.querySelectorAll('.task');
        let filteredTicket = ticketArr.filter(function (ticketObj) {
            return clickedColor === ticketObj.ticket_priorityColor
        })
        for (let i = 0; i < allTicket.length; i++) {
            allTicket[i].remove();
        }
       filteredTicket.forEach(function(filteredObj){
            createTicket(filteredObj.ticket_priorityColor,filteredObj.value,filteredObj.taskId)
    })
    
}
    else{
        updateColor=null;
        let allTickets = document.querySelectorAll('.task');
        console.log(ticketArr)
        for (let i = 0; i < allTickets.length; i++) {
            allTickets[i].remove();
        }
        ticketArr.forEach(function(ticketArrs){
            createTicket(ticketArrs.ticket_priorityColor,ticketArrs.value,ticketArrs.taskId)
        })
    }
    })
    }
    if(localStorage.getItem('tickets')){
        ticketArr=JSON.parse(localStorage.getItem('tickets'))
        ticketArr.forEach(function(ticketArrss){
        createTicket( ticketArrss.ticket_priorityColor, ticketArrss.value, ticketArrss.taskId)
        })
    }
