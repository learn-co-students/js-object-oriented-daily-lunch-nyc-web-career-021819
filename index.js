// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

//Neighborhood Class
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = this.constructor.generateId++
    store.neighborhoods.push(this)
    // console.log('this', this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.neighborhoodId === this.id )
  }

  customers() {
    return store.customers.filter((customer) => customer.neighborhoodId === this.id)
  }

  meals() {
    let allMeals = this.deliveries().map(delivery => delivery = Meal.findById(delivery.mealId))
    const unique = [...new Set(allMeals.map(item => item.id))]
    return unique
  }
}

//Assign id
Neighborhood.generateId = 1

//Meal class
class Meal {
  constructor(title,price) {
    this.title = title
    this.price = price
    this.id = this.constructor.generateId++
    store.meals.push(this)
  }

  static findById(n) {
    return store.meals.find(meal => meal.id === n)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map((delivery) => {
      return Customer.findById(delivery.customerId)
    })
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  }

}

//Assign id
Meal.generateId = 1

//Customer class
class Customer {
  constructor(name, neighborhood) {
    this.name = name
    this.neighborhoodId = neighborhood
    this.id = this.constructor.generateId++
    store.customers.push(this)
    // console.log('this', this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map((delivery) => {
      return delivery = Meal.findById(delivery.mealId)
    })
  }

  static findById(n) {
    return store.customers.find(customer => customer.id === n)
  }

  totalSpent() {
    let initialValue = 0
    const sum = this.meals().reduce(
        (accumulator, currentValue) => accumulator + currentValue.price
        ,initialValue
    );
    return sum
  }

}
//Assign id
Customer.generateId = 1

//Delivery class
class Delivery {
  constructor(meal,neighborhood,customer) {
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.customerId = customer
    this.id = this.constructor.generateId++
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find((meal) => meal.id === this.mealId)
  }

  customer() {
    // console.log('store.customers', store.customers);
    return store.customers.find((customer) => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find((neighborhood) => neighborhood.id === this.neighborhoodId)
  }
}

//Assign id
Delivery.generateId = 1


const dumbo = new Neighborhood('Dumbo')
