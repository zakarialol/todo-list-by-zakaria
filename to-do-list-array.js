// selectin items

//form
const form = document.getElementById('form')

//submit button
const SubBtn = document.querySelector('form .submit')

//clear all
const ClearItemsBtn = document.querySelector('.btn-holder .clear')
const ClearItemsBtnParent = document.querySelector('.btn-holder')
//input text 
const InputValue = document.querySelector('.inputvalue')

//items container
const itemsContainer = document.querySelector('.items-container')

//
const MessageContainer = document.querySelector('.message-container')

//const seltecting allert message div
const alertmessage = document.querySelector('article .alert-message')
//selectin edit button
const EditButttonElement = document.querySelector('.submit.edit')

//getting the paragrph where we store the id of edit button
const paragraphStoredId = document.querySelector('.message-container .storedvalue')
// getting the div of confimation message
const DivForConfimationMessage = document.querySelector('.DivForConfiramtionMessage')
//retirive array from local storage
let tasks =JSON.parse(localStorage.getItem('tasks')) || []


// genirate count
let count = tasks.length > 0 ?Number(tasks[tasks.length-1].id.split('-',2)[1]) + 1 : 1;

form.addEventListener('submit',function(e){
    const value = InputValue.value.trim()
    e.preventDefault()
    if(e.submitter.value === 'submit'){
            submitButton(value)
    }
    else if(e.submitter.value === 'edit'){
        editfunction()
    }
})

function AlertMessage(textA,ClaS){
    alertmessage.innerHTML = `<p class='msg-for-empty-text 
    color-${ClaS}'>${textA}</p>`
    //
    const MsgForEmptyText = document.querySelector('.alert-message .msg-for-empty-text')
    //
    let heig = MsgForEmptyText.scrollHeight
    //
    MsgForEmptyText.style.height= `${heig}px`
    setTimeout(function(){
        MsgForEmptyText.style.height= '0px'
    },1000)
    SubBtn.classList.remove('hidden')
    EditButttonElement.classList.add('hidden')
    return
}
function editfunction(){
    let idHidden = paragraphStoredId.textContent
        if(!InputValue.value.length > 0){
            AlertMessage('edit filed','red')
            
        }else{
            tasks = tasks.map(function(itm){
                if(itm.id === idHidden){
                    itm.name = InputValue.value
                    return itm
                }else{
                    return itm
                }
            })
            AddToStorage(tasks)
            itemsContainer.textContent = ''
            tasks.forEach(itm => {
                appendChilds(itm.id,itm.name,itm.Date)
            })
            AlertMessage('item edited succefully','green')
            SubBtn.classList.remove('hidden')
            EditButttonElement.classList.add('hidden')
            InputValue.value = ''
        }
}
//
function submitButton(value){
    if(value.length <= 0){
            //
           AlertMessage('please write a text to save','blue')
            //
            const MsgForEmptyText = document.querySelector('.alert-message .msg-for-empty-text')
            //
            let heig = MsgForEmptyText.scrollHeight
            //
            MsgForEmptyText.style.height= `${heig}px`
            setTimeout(function(){
                MsgForEmptyText.style.height= '0px'
            },1000)
            return
        }else{
            AlertMessage('text added sucsecfully','green')
            const newId = `task-${count++}`
            const DateString = new Date().toLocaleString()
            appendChilds(newId,value,DateString)
            ArrayForTask(newId,value,DateString)
            AddToStorage(tasks)
            hideContainer()
            InputValue.value=''
        } 
}
function appendChilds(newId,value,DateString){
    //input value
    const InputParagraphHolder = document.createElement('p')
    const textInput = document.createTextNode(value)
    InputParagraphHolder.appendChild(textInput)

    // tasks holder 
    const holder = document.createElement('div')
    holder.classList.add('main-holder-for-tasks')
    holder.id = 'yello'

    //icon edit
    const EditBtn = document.createElement('button')
    EditBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
    EditBtn.classList.add('editBtn')
    EditBtn.id= newId
    //icon delete
    const DeleteBtn = document.createElement('button')
    DeleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    DeleteBtn.classList.add('deleteBtn')
    DeleteBtn.id = newId
    
    // p for holding the current time
    let timeParagraph = document.createElement('p')
    let dateHolder = document.createTextNode(DateString)
        timeParagraph.appendChild(dateHolder)
        timeParagraph.classList.add('timeZone')

    //button container
    const BtnContainer = document.createElement('div')
    BtnContainer.classList.add('btn-div-holder')
    BtnContainer.id='justtesting'
    BtnContainer.append(EditBtn,DeleteBtn)
    //appending childs to the holder 
    holder.append(InputParagraphHolder,BtnContainer)
    //appending tasks to divholder
    const DivHolderForEachTask = document.createElement('div')
    DivHolderForEachTask.append(timeParagraph,holder)
    DivHolderForEachTask.classList.add('main-task-container')
    //
    itemsContainer.prepend(DivHolderForEachTask)
    if(itemsContainer.scrollHeight > 300){
        itemsContainer.style.paddingRight = '5px'
    }
}
function ArrayForTask(newId,value,DateString){
    let obj = {}
    Object.assign(obj,{id: newId , name : value , Date:DateString})
    tasks.push(obj)
}

//adding items to local storage
function AddToStorage(taskss){
    localStorage.setItem('tasks',JSON.stringify(taskss))
}

// retrive items from local storage

function RetriveItemsFromLocalS(){
   let item = localStorage.getItem("tasks")
    let ItemsArray = JSON.parse(item)
    if(!ItemsArray){
        return
    }else{
        ItemsArray.forEach(function(itm){
            appendChilds(itm.id,itm.name,itm.Date)
        })
    }
    hideContainer()
}
window.addEventListener('load',RetriveItemsFromLocalS)

//clear all items button
ClearItemsBtn.addEventListener('click',ClearTasks)

//function to clear all tasks

function ClearTasks(){
     if(itemsContainer.children.length > 0 ){
        // rmeoving the hidden class when i clicked clear button
         DivForConfimationMessage.classList.remove('hidden')
    }else{
        MessageContainer.style.opacity = 1
        MessageContainer.innerHTML = `<p class ='message'>no itmes exist</p>`
        setTimeout(function(){
            let Heigh= MessageContainer.scrollHeight
            MessageContainer.style.height= `${Heigh}px`
            const mesg = document.querySelector('.message-container .message')
            setTimeout(()=>{
            MessageContainer.style.opacity = 0
            MessageContainer.style.height = '0px'
            },1000)
           }
        ,50)
    }

}

//working on delete button
 itemsContainer.addEventListener('click',deleteOneItem)

// delete item function 
function deleteOneItem(elm){

    if(elm.target.closest('button')){
        let btnid = elm.target.closest('button').id

        let BtnClicked = elm.target.closest('button').classList
        if(BtnClicked.contains('deleteBtn')){
            DeleteElement(elm,btnid)
        }
        else if(BtnClicked.contains('editBtn')){
            EditeElment(btnid)
        }
    }else{
        return null
    }
}
// working on edite button 
function EditeElment(btnid){
    let editArray = tasks.filter(function(itm){
        return itm.id === btnid
    })

    let text = editArray[0].name
    InputValue.value = text
    SubBtn.classList.add('hidden')
    EditButttonElement.classList.remove('hidden')
    paragraphStoredId.textContent = editArray[0].id
 
}

function DeleteElement(elm,btnid){

    //removing the parent of the button delete clicked
    elm.target.closest('button').parentElement.parentElement.parentElement.remove()
    let NewArrStorage = JSON.parse(localStorage.getItem('tasks'))

    //filtering local storage array to get new array without the id of my choose 
    NewArrStorage = NewArrStorage.filter(function(itm){
        return itm.id !== btnid
    })
    tasks = NewArrStorage
    AddToStorage(NewArrStorage)
    AlertMessage('deleted sucssuflly','green')
    hideContainer()

}
//function for confimation message 
let StoredValueOfConfimation= null;
function Confimation(clientChoose){
    //
    if(clientChoose){
        itemsContainer.innerHTML= ''
        tasks.length = 0
        count = 1
        SubBtn.classList.remove('hidden')
        InputValue.value = ''
        AddToStorage(tasks)
        EditButttonElement.classList.add('hidden')
        DivForConfimationMessage.classList.add('hidden')
        AlertMessage('succesfully deleted all tasks','green')
        hideContainer()
    }else{
        DivForConfimationMessage.classList.add('hidden')
        return
    }
}
// meking event on the input text
InputValue.addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
        event.preventDefault()
        if(!EditButttonElement.classList.contains('hidden')){
            EditButttonElement.click()
        }else if(!SubBtn.classList.contains('hidden')){
            SubBtn.click()
        }
    }
})
function hideContainer(){
    if(itemsContainer.children.length <= 0){
        // console.log('true')
        ClearItemsBtnParent.classList.add('hidden')
    }else{
        ClearItemsBtnParent.classList.remove('hidden')
    }

}

// hideContainer()
// setInterval(() => {
//     hideContainer()
// }, 1000);

