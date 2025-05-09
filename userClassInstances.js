
// 🔧 ŠTO TREBAŠ NAPRAVITI:

// 1. Dohvat korisnika (AJAX)
// Pomoću fetch funkcije, dohvatiti podatke s ovog API endpointa:
// https://jsonplaceholder.typicode.com/users
// Za svakog korisnika dohvaćenog s API-ja, kreirati instancu klase User (vidi dolje).
// 2. Kreiraj klase (OOP)
// 👤 Klasa User

// Svojstva:
// id (broj)
// name (string)
// tasks (array objekata klase Task)
// Metode:
// addTask(title) – dodaje novi zadatak korisniku
// getTasks(filter) – vraća sve zadatke, ili filtrirane ("all", "completed", "incomplete")
// ✅ Klasa Task

// Svojstva:
// title (string)
// completed (boolean, default false)
// Metode:
// markCompleted() – postavlja completed na true
// 3. Logika aplikacije
// Nakon što se učitaju korisnici:

// Primjeri korištenja (simulacija konzolne aplikacije):

// Pronaći korisnika po ID-u
// Dodati zadatak tom korisniku
// Označiti neki zadatak kao dovršen
// Ispisati sve zadatke korisnika
// Ispisati samo dovršene ili nedovršene zadatke





const response=await fetch("https://jsonplaceholder.typicode.com/users");
if(!response.ok){
    console.error("API Error", response.status);
}
const persons=await response.json();



class User{
    constructor(id,name){
        this.id=id;
        this.name=name;
        this.tasks=[];
    }

    addTask(title){
       const task=new Task(title,false);
       this.tasks.push(task);
    }

    getTask(filter="all"){
    //   if(filter==="all")return this.tasks;
    //   else if(filter==="completed")return this.tasks.filter(task=>task.completed);
    //   else return this.tasks.filter(task=>!task.completed);
    return filter==="all"?this.tasks:this.tasks.filter(task=>filter==="completed"?task.completed:!task.completed);
    }


}

class Task{
constructor(title,completed=false){
    this.title=title;
    this.completed=completed
}

 markCompleted(){
    this.completed=true;
}

}
const users=[];
     const user={};


for (const [i,person] of persons.entries()){
     user[`${i+1}`] =new User(person.id,person.name);
     users.push(user[`${i+1}`]);
}
 


const Leanne=users[0];



Leanne.addTask('work for 8h');
Leanne.addTask('work for 11h');

Leanne.tasks[0].markCompleted();


console.log(Leanne.getTask("completed"));
console.log(Leanne.tasks);
console.log(users);
console.log(users[2]);

