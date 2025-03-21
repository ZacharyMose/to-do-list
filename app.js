const btn=document.querySelector(".btn")
var task =document.querySelector(".task-input")
const container=document.querySelector(".tasks__container")
// const contents=document.querySelector(".contents")
const button1=document.querySelector(".button1")
const button2=document.querySelector(".button2")
btn.addEventListener("click",()=>{
    if(task.value===""){
        alert("Enter a Task!")
        return;
    }
     const div =document.createElement("div")
     const li =document.createElement("li")
     li.classList.add("text")
     div.classList.add("contents")

     const btn1=document.createElement("button")
     btn1.classList.add("button1")
     btn1.classList.add("button")

     const btn2=document.createElement("button")
     btn2.classList.add("button1")
     btn2.classList.add("button")

     const icon1=document.createElement("i")
     icon1.classList.add("fa-solid")
     icon1.classList.add("fa-trash")
     btn1.append(icon1)

     const icon2=document.createElement("i")
     icon2.classList.add("fa-solid")
     icon2.classList.add("fa-pen")
     btn2.append(icon2)

     li.append(task.value)
     div.append(li)
     div.append(btn1)
     div.append(btn2)
     container.appendChild(div)
})

// update
button1.addEventListener("click",(e)=>{
    console.log(e.target);
    
})