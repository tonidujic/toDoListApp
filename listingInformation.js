// Napraviti aplikaciju koja dohvaća listu korisnika putem API-ja 
// i prikazuje ih na stranici. Kada korisnik klikne na korisnika iz liste,
//  prikazuju se dodatni podaci o tom korisniku.
//  ✅ Zahtjevi:

// Koristi fetch za dohvat podataka s API-ja:
// 👉 https://jsonplaceholder.typicode.com/users
// Prikaži imena korisnika u <ul id="user-list">.
// Kada se klikne na korisnika, prikaži:
// name u #name
// email u #email
// address.city u #city
// Ukloni klasu .hidden s #user-details kada se korisnik klikne.


   const promise= await fetch("https://jsonplaceholder.typicode.com/users");
const response= await promise.json();
response.forEach(user => {
   user.password=`api${user.id}`;
})

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
const loginIntoAccBttn=document.getElementById("loginIntoAcc");
const loginName=document.getElementById("loginName");
const loginPassword=document.getElementById("loginPassword");
export let currentUser=null;

const users=[];

class UserClass{
   constructor(fullName, email, city,password,tasks){
      this.fullName=fullName;
      this.email=email;
      this.city=city;
      this.password=password;
      this.tasks=[];
   }
}


const userTaskShowing=function(){
  

   form2.addEventListener('submit', function (e) {
      e.preventDefault(); 
      const loginUserFn = loginName.value;
      const loginUserPassword = loginPassword.value;
    
      const combinedUsers = [...response, ...users];
      console.log(loginUserFn, loginUserPassword);
      const foundUser = combinedUsers.find(function(user) {

         const name=user.fullName||user.name;
        return name === loginUserFn && user.password === loginUserPassword;
      
   });
    

      if (foundUser) {
        currentUser = foundUser;
        const name=currentUser.fullName||currentUser.name;
        alert(`Uspješno prijavljen korisnik: ${name}`);
      } else {
        alert("Pogrešan korisnik ili lozinka");
      }
    });

   
}
userTaskShowing();

const signUpFoo=function(){
signupButton.addEventListener('click',function(){
   form.classList.remove('hidden');
   form2.classList.add('hidden');

})
}


const logInFoo=function(){

   loginButton.addEventListener('click',function(){
      form.classList.add('hidden');

      form2.classList.remove('hidden');
   })
   }
const addUser=function(){
   
   
    form.addEventListener('submit',function(e){
      e.preventDefault();

       const fullName=fnNewUser.value;
       const email=emailNewUser.value;
       const city=adressNewUser.value;
       const password=passwordNewUser.value;

       const newUser=new UserClass(fullName,email,city,password);
       users.push(newUser);
       renderUsers();
       currentUser = newUser;

// nameEl.innerHTML = "<strong>Full name: </strong>" + newUser.fullName;
// emailEl.innerHTML = "<strong>Email: </strong>" + newUser.email;
// cityEl.innerHTML = "<strong>City: </strong>" + newUser.city;
// userDetailsBox.classList.remove('hidden');

fnNewUser.value='';
       emailNewUser.value='';
       adressNewUser.value='';
       passwordNewUser.value='';
       
      })
      
}


addUser();




function renderUsers() {
   userList.innerHTML="";
   
   const combinedUsers = [...response, ...users];
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
console.log(response);