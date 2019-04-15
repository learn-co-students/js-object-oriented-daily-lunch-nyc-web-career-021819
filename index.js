// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
    constructor(name){
        this.name = name; 
        this.id = store.neighborhoods.length;
        store.neighborhoods.push(this);
    }

    deliveries(){
        return store.deliveries.filter(delivery => {return delivery.neighborhoodId === this.id})
    }

    customers(){
        return store.customers.filter(customer => {
            return customer.neighborhoodId === this.id
        })
    }

    meals(){
         const allMeals = this.deliveries().map(delivery => { return delivery.meal()
         })

         const unique = [...new Set(allMeals.map(meal => meal.title))]

         return unique
    }

} // end of class

class Customer{
    constructor(name, neighborhoodId){
        this.name = name;
        this.id = store.customers.length;
        this.neighborhoodId = neighborhoodId ;
        store.customers.push(this)
    }
    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id
        })
    }

    meals(){
        return this.deliveries().map( delivery =>{
            return delivery.meal()
        })
    }

    totalSpent(){
        return this.meals().reduce((accumulator, currentValue) =>
            accumulator + currentValue.price, 0)
    }


} // end of class

class Meal{
    constructor(title, price){
        this.title = title;
        this.price= price; 
        this.id = store.meals.length;
        store.meals.push(this)
    }

    deliveries(){
        return store.deliveries.filter(delivery => { return delivery.mealId == this.id
        })
    }

    customers(){
        return this.deliveries().map(delivery => {
            return delivery.customer()
        })
    }

    static byPrice(){
        return store.meals.sort((price, price1) => { return price1.price - price.price})
    }
} // end of class

class Delivery{
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        this.id = store.deliveries.length;
        store.deliveries.push(this)
    }
    meal(){
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }

    customer(){
        return store.customers.find(customer => {
            return customer.id === this.customerId
        })
    }

    neighborhood(){
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId
        })
    }
} // end of class 