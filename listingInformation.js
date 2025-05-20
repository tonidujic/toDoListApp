const promise= await fetch("https://jsonplaceholder.typicode.com/users");
const response= await promise.json();
response.forEach(user => {
   user.password=`api${user.id}`;
   user.tasks=[];
})
import { renderTask, taskList,sumBox } from './todoApp.js';
const userList=document.getElementById("user-list");
const userDetailsBox = document.getElementById("user-details");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("userEmail");
const cityEl = document.getElementById("userCity");
const checkbox = document.getElementById('showUsers');
const userDetails = document.getElementById('user-details');
const textToggle=document.querySelector(".show-users-label");
const form=document.getElementById("userForm1");
const fnNewUser=document.getElementById("firstName");
const emailNewUser=document.getElementById("email");
const adressNewUser=document.getElementById("city");
const passwordNewUser=document.getElementById("password");
const loginButton=document.getElementById("login");
const signupButton=document.getElementById("signup");
const form2=document.getElementById("loginForm" );
let currentUser = null;
function initializeCurrentUser() {
   const saved = localStorage.getItem("currentUser");
   if (saved) {
     currentUser = JSON.parse(saved);
     console.log("User loaded from localStorage:", currentUser);
   }
 }
 
 initializeCurrentUser();

 let blockedApiUsers=JSON.parse(localStorage.getItem("blockedApiUsers"))|| [];

document.getElementById('section').classList.remove('hidden');

export function setCurrentUser(user) {
  currentUser = user;
  localStorage.setItem("currentUser",JSON.stringify(user));
}

export function getCurrentUser() {
if(!currentUser){
   const saved=localStorage.getItem("currentUser");
   if(saved)currentUser=JSON.parse(saved);
}
return currentUser;
}

let users=[];
const savedUsers=localStorage.getItem("users");
if(savedUsers){
   users=JSON.parse(savedUsers);
}




class UserClass{
   constructor(fullName, email, city,password){
      this.fullName=fullName;
      this.email=email;
      this.city=city;
      this.password=password;
      this.tasks=[];
   }
}

const signUpFoo=function(){
signupButton.addEventListener('click',function(){
   form.classList.remove('hidden');
   form2.classList.add('hidden');
   document.getElementById('section').classList.add('hidden');
   renderTask();
   taskList.innerHTML='';
   sumBox.style.display='none';
   
})

}

const logInFoo=function(){

   loginButton.addEventListener('click',function(){
      form.classList.add('hidden');

      form2.classList.remove('hidden');
document.getElementById('section').classList.add('hidden');
taskList.innerHTML='';
sumBox.style.display='none';



   })
   }

   form2.addEventListener('submit',function(e){
e.preventDefault();
document.getElementById('section').classList.remove('hidden');

const name=document.getElementById('loginName').value;
const password=document.getElementById('loginPassword').value;

document.getElementById('loginName').value = '';
document.getElementById('loginPassword').value='';
const combinedUsers = [...response, ...users];
const foundUser=combinedUsers.find(function(user){
   const fullName=user.name|| user.fullName;
   return fullName===name&&user.password===password;
});
if(foundUser){
   
   alert(`Login successful for: ${foundUser.fullName||foundUser.name } `);
   setCurrentUser(foundUser);
   renderTask();
  

   localStorage.setItem("users", JSON.stringify(users));
console.log(getCurrentUser());
console.log(getCurrentUser().tasks);

   form2.classList.add('hidden');
}else{
   alert('INVALID LOGIN! ❌');
}

   
   })
const addUser=function(){
   
   
    form.addEventListener('submit',function(e){
      e.preventDefault();

       const fullName=fnNewUser.value;
       const email=emailNewUser.value;
       const city=adressNewUser.value;
       const password=passwordNewUser.value;

       fnNewUser.value = '';
emailNewUser.value = '';
adressNewUser.value = '';
passwordNewUser.value = '';
       const newUser=new UserClass(fullName,email,city,password);
       users.push(newUser);
       setCurrentUser(newUser);
     


console.log(getCurrentUser());
       form.classList.add('hidden');

       renderUsers();
       localStorage.setItem("users",JSON.stringify(users));
       document.getElementById('section').classList.remove('hidden');


fnNewUser.value='';
       emailNewUser.value='';
       adressNewUser.value='';
       passwordNewUser.value='';
       
      })
      
}

addUser();

function renderUsers() {
   userList.innerHTML="";
   
   const filteredResponse = response.filter(user => !blockedApiUsers.includes(user.id));

  // kombiniraj lokalne korisnike i filtrirane API korisnike
  const combinedUsers = [...filteredResponse, ...users];
for(const user of combinedUsers){
  
    
    const newList=document.createElement("li");
    newList.textContent=user.name||user.fullName;
    userList.append(newList);
    newList.addEventListener("click",function(){
      const fullName = user.name || user.fullName;
      const email = user.email;
      const city = user.address?.city || user.city;
    

      nameEl.innerHTML = "<strong>Full name: </strong>" + fullName;
emailEl.innerHTML = "<strong>Email: </strong>" + email;
cityEl.innerHTML = "<strong>City: </strong>" + city;

       userDetailsBox.classList.remove('hidden');

     const existing=userDetailsBox.querySelector('button');

     if(existing){
        existing.remove();
     }

       const buttonPrikaz=document.createElement('button');
    buttonPrikaz.textContent='Close view';
     buttonPrikaz.style.borderRadius='8px';
     userDetailsBox.append(buttonPrikaz);
     buttonPrikaz.style.transition='background-color 0.3s ease';
     buttonPrikaz.style.backgroundColor='crimson';
       buttonPrikaz.addEventListener('click',function(){
        userDetailsBox.classList.add('hidden');
       })

    })
    const button=document.createElement('button');
    button.textContent='DELETE';
    button.style.color='WHITE';
    button.style.backgroundColor='red';
    button.style.borderRadius='10px';
    button.style.fontSize='10px'

    button.style.float = 'right';     
  
    newList.appendChild(button);
    button.addEventListener('click',function(e){
      
       e.stopPropagation();
         newList.remove();

         if(user.fullName){
            users=users.filter(function(u){
               return u.email!==user.email;
            })
            localStorage.setItem("users", JSON.stringify(users));
         } else {
       
            if (!blockedApiUsers.includes(user.id)) {
              blockedApiUsers.push(user.id);
              localStorage.setItem("blockedApiUsers", JSON.stringify(blockedApiUsers));
            }
          }
    
       
            

         
    })

  
}
}
checkbox.addEventListener("click", () => {
   

   if (checkbox.checked) {
     renderUsers();
     userList.style.display = "block";
     textToggle.textContent="Hide users";

   } else {
     userList.style.display = "none";
     userDetailsBox.classList.add("hidden");
     textToggle.textContent="👤Show users";

   }
 });

 signUpFoo();
logInFoo();

