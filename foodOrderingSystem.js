// ✅ Zadatak: Sistem za narudžbu hrane (Food Ordering System)
// Napravit ćeš jednostavan backend logiku za aplikaciju za naručivanje hrane.

// 🍔 Struktura:

// Klase:
// MenuItem – svaki artikl ima name, price, category, isAvailable.
// Order – svaki order ima id, items (array MenuItem), status (pending, completed, cancelled), createdAt.
// OOP Nasljeđivanje:
// User – ima name, email, orders (array).
// Admin nasljeđuje User – dodatno može dodavati nove artikle u jelovnik.
// Funkcionalnosti (funkcije/metode):
// addMenuItem(item) – admin dodaje artikl.
// placeOrder(user, arrayOfItemNames) – user naručuje više artikala (dohvati ih po imenu).
// cancelOrder(user, orderId) – promijeni status u cancelled.
// completeOrder(orderId) – status u completed.
// getOrderSummary(order) – vraća cijenu, broj artikala i vrijeme narudžbe.
// getPopularCategories(menu) – vrati kategorije s najviše dostupnih artikala (koristi reduce).
// 🔧 Tehnički zahtjevi:

// Koristi destructuring kod dohvata itema.
// Koristi spread/rest operator kad ima smisla (npr. dodavanje itema).
// Koristi Array metode: map, filter, reduce, some, find, sort.
// Koristi ternarni operator i optional chaining gdje god mozes


class MenuItem{
    constructor(name,price,category,isAvailable){
        this.name=name;
        this.price=price;
        this.category=category;
        this.isAvailable=isAvailable;
    }
}

class Order{
    constructor(id,status){
this.id=id;
this.status=status;
this.items=[];
    }

    

    cancelOrder(){
        if(this.status==="pending"){
        this.status==="cancelled";
        console.log("cancelled");
    }
    }

    completeOrder(){
        if(this.status==="pending"){
            this.status==="completed";
            console.log("order completed");

        }
    }
}

class User{
    constructor(name,email){
        this.name=name;
        this.email=email;
        this.orders=[];
    }

cancelOrder(orderId){
    const order=this.orders.find(function(order){
       if(order.id===orderId){
          order.cancelOrder();
       }else{
        console.log("not found");
       }
    })
}



completeOrder(orderId){
    const order=this.orders.find(function(order){
        if(order.id===orderId){
            order.completeOrder();
        }else{
            console.log("not found");
        }
    })
}

    placeOrder(arrayOfItemNames,menu){
          
        for (const itemName of arrayOfItemNames){
            
        const menuItem=menu.find(function(item){
            item.name===itemName;
        });
        if(menuItem){
            this.orders.push(menuItem);
        }else{
            console.log(`article ${itemName} doesnt exist`);
        }
        }
        // this.orders.push(...arrayOfItemNames);

    }
}


class Admin extends User{
    constructor(name,email,orders){
super(name,email,orders);
this.addedOrders=[];
    }

    addNewOrder(MenuItem){
this.addedOrders.push(MenuItem);
    }
}