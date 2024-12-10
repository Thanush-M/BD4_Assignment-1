const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
let db;

// Open the database with async/await
(async () => {
  try {
    db = await open({
      filename: "./BD4_Assignment1/database.sqlite",
      driver: sqlite3.Database,
    });
    console.log("Connected to the SQLite database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();





async function fetchAllRestaurants() {
  let query = "SELECT * FROM restaurants"
  let response = await db.all(query, [])
  return {restaurants : response}
}

app.get('/restaurants', async (req, res) => {
  try {
    let result = await fetchAllRestaurants()
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message : "No restaurants found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})




async function fetchAllRestaurantsByID(id) {
  let query = "SELECT * FROM restaurants WHERE id = ?"
  let response = await db.all(query, [id])
  return {restaurants : response}
}

app.get('/restaurants/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let result = await fetchAllRestaurantsByID(id)
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message : "No restaurants found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})




async function fetchAllRestaurantsByCuisine(cuisine) {
  let query = "SELECT * FROM restaurants WHERE cuisine = ?"
  let response = await db.all(query, [cuisine])
  return {restaurants : response}
}

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    let cuisine = req.params.cuisine
    let result = await fetchAllRestaurantsByCuisine(cuisine)
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message : "No restaurants found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})




async function fetchAllRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query = "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?"
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury])
  return {restaurants : response}
}

app.get('/restaurants/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let hasOutdoorSeating = req.query.hasOutdoorSeating;
    let isLuxury = req.query.isLuxury;
    let result = await fetchAllRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury);
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message : "No restaurants found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})




async function fetchAllRestaurantsSortedByRating() {
  let query = "SELECT * FROM restaurants ORDER BY rating DESC"
  let response = await db.all(query, [])
  return {restaurants : response}
}

app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchAllRestaurantsSortedByRating()
    if (result.restaurants.length === 0) {
      return res.status(404).json({
        message : "No restaurants found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})



async function fetchAllDishes() {
  let query = "SELECT * FROM dishes"
  let response = await db.all(query, [])
  return {dishes : response}
}

app.get('/dishes', async (req, res) => {
  try {
    let result = await fetchAllDishes()
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message : "No dishes found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})



async function fetchAllDishesByID(id) {
  let query = "SELECT * FROM dishes WHERE id = ?"
  let response = await db.all(query, [id])
  return {dishes : response}
}

app.get('/dishes/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let result = await fetchAllDishesByID(id)
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message : "No dishes found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})





async function fetchAllDishesByFilter(isVeg) {
  let query = "SELECT * FROM dishes WHERE isVeg = ?";
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get('/dishes/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    
    let result = await fetchAllDishesByFilter(isVeg);
    
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message: "No dishes found."
      });
    }

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});








async function fetchAllDishesSortedByPrice() {
  let query = "SELECT * FROM dishes ORDER BY price"
  let response = await db.all(query, [])
  return {dishes : response}
}

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let result = await fetchAllDishesSortedByPrice()
    if (result.dishes.length === 0) {
      return res.status(404).json({
        message : "No dishes found."
      })
    }
    res.status(200).json(result)
  }

  catch(error) {
    return res.status(500).json({
      error : error.message
    })
  }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});