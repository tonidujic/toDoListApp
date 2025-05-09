const todoForm=document.getElementById('todoForm');
const taskInput=document.getElementById('taskInput');
const categorySelect=document.getElementById('categorySelect');
const categoryFilter=document.getElementById('categoryFilter');
const taskList=document.getElementById('taskList');
const button = document.getElementById('button');
const rndButton=document.querySelector('#randomTaskBtn');
const sumBox=document.getElementById('stats');
let tasks=[];



const deleteTask=function(id){
    tasks=tasks.filter(function(task){
        return task.id!==id;
    })
    renderTask();
    updateTaskCount();
}

const filteredTasks=function(){
    taskList.innerHTML='';

    const selectedCategory=categoryFilter.value;
    const filtered=tasks.filter(function(task){
        return task.category===selectedCategory;
     });
     filtered.forEach(function(task){
        const li=document.createElement('li');
        li.textContent=`${task.text}, ${task.category}`;
        taskList.appendChild(li);
});
}


const renderTask=function(){
    taskList.innerHTML='';
   

   tasks.forEach(function(task,i){
    const li=document.createElement('li');
    li.textContent=`${task.text}, ${task.category}`;
    taskList.appendChild(li);

    updateTaskCount();

    //wraper for buttons
    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.display = "flex";
    buttonWrapper.style.justifyContent = "flex-end";
    buttonWrapper.style.gap = "5px"; // razmak između dugmadi
    buttonWrapper.style.marginTop = "5px";

    //button CHECKED
    const button = document.createElement('button');
  button.textContent = "CHECKED✅";
  button.style.width = "80px";
  button.style.height = "40px";
  button.style.fontSize = "10px";
  button.style.backgroundColor = 'green';
  button.style.color = 'white';
  button.style.borderRadius = '10px';


    //button EDIT
    const changeButton = document.createElement('button');
    changeButton.textContent = "EDIT 📝";
    changeButton.style.width = "80px";
    changeButton.style.height = "40px";
    changeButton.style.fontSize = "10px";
    changeButton.style.backgroundColor = 'black';
    changeButton.style.color = 'white';
    changeButton.style.borderRadius = '10px';

    buttonWrapper.appendChild(button);
    buttonWrapper.appendChild(changeButton);
     
    li.appendChild(buttonWrapper);

        changeButton.addEventListener('click',function(){
            const newText=prompt("Izmijeni zadatak: ", task.text);
            if(newText){
task.text=newText;
renderTask();
            }
        })
        
        
       button.addEventListener('click', ()=>{
        deleteTask(task.id);
       })
    
   })


}
  
function updateTaskCount() {
    if(tasks.length===0){
        sumBox.style.display='none';
        sumBox.textContent = '';
    }else{
        sumBox.style.display = 'inline-block'
        sumBox.textContent = `Ukupno zadataka: ${tasks.length}`;
    }
     
  }



async function randomTask(){
    try{
       const res=await fetch('https://jsonplaceholder.typicode.com/todos');
       const parse= await res.json();

       //uzimanje random zadatka
       const rndTask=parse[Math.floor(Math.random() * parse.length)];

       const newTask={
        text: rndTask.title,
        id:Date.now(),
        category: 'API',
       };
tasks.push(newTask);
       renderTask();
    }catch(error){
console.error(error.message);
    };
    
    
}


const submitEvent=function(){
    todoForm.addEventListener("submit",function(e){
e.preventDefault();
const input= taskInput.value;
 const newObj={
    text: input,
    id:Date.now(),
    category:categorySelect.value,
 }
   tasks.push(newObj);
   renderTask();
console.log(tasks);

taskInput.value="";


    })
}
 rndButton.addEventListener('click',randomTask);
 

categoryFilter.addEventListener("change",function(){

    filteredTasks();
})
submitEvent();



