// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


class Neighborhood {
    
    constructor(name) {
        this.name = name
        store.neighborhoods.push(this)
        this.id = store.neighborhoods.length
    }

    deliveries() {
        return store.deliveries
    }

    customers() {
        return store.customers
    }

    meals() {
        const meals = this.deliveries().map(delivery => {
            return delivery.meal()
        })
        return Array.from(new Set(meals))
    }
}

class Customer {
    constructor(name, neighborhoodId){
        this.name = name
        this.neighborhoodId = neighborhoodId
        store.customers.push(this)
        this.id = store.customers.length
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id
        })
    }

    meals() {
        return this.deliveries().map(delivery => {
            return delivery.meal()
        })
    }

    totalSpent() {
        return this.meals().reduce((total, meal) => {
            return total + meal.price
        }, 0)
    }
}

class Meal {
    constructor(title, price) {
        this.title = title
        this.price = price
        store.meals.push(this)
        this.id = store.meals.length
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.mealId === this.id)
    }

    customers() {
        return this.deliveries().map(delivery => {
            return delivery.customer()
        })
    }

    static byPrice() {
        return store.meals.sort(function(a, b){
            return b.price - a.price
        })
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        store.deliveries.push(this)
        this.id = store.deliveries.length
    }

    meal() {
        return store.meals.find(meal => meal.id === this.mealId)
    }

    customer() {
        return store.customers.find(customer => customer.id === this.customerId)
    }

    neighborhood() {
        return store.neighborhoods.find(neighborhood => neighborhood.id = this.neighborhoodId)
    }
}
