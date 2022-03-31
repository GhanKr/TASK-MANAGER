let addbtn=document.querySelector('.add-btn');
let modal=document.querySelector('.modal-cont');
let flag=false;
addbtn.addEventListener('click', function(e){
    flag=!flag;
    if(flag){
        modal.style.display ='flex';
    }
    else{
        modal.style.display ='none';
    }

})