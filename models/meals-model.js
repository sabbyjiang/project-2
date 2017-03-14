const db = require('../config/database');
// SQL queries for meals table

const meals = {};

// Finds all meals for a given user
meals.findAll = (user_id) => {
    return db.manyOrNone(
        'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE meals.users_id=$1', [user_id]
    );
};

// Finds recipes for only the meals selected
meals.findByMeal = (mealPref, user_id) => {
    let statement = [];

    Object.keys(mealPref).forEach(key => {
        if(mealPref[key]){
            statement.push('meals.' + key + '=true');
        }
    });

    const conditions = statement.join(' AND ');

    const query = 'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE ' + conditions + ' AND meals.users_id = $1 ORDER BY dish';

    return db.any(query, user_id);
};

// Finds recipes by a particular dish
meals.findByDish = (dish, user_id) => {
    return db.any(
        'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE dish=$1 AND meals.users_id=$2', [dish, user_id]
    );
};

// Creates a new meal option given the recipe, dish options, and user id
meals.create = (mealObj, user_id) => {
    mealObj['user_id'] = user_id;
    return db.one(
        'INSERT INTO meals(breakfast, lunch, dinner, dish, recipe_id, users_id) VALUES($[breakfast], $[lunch], $[dinner], $[dish], $[recipe_id], $[user_id]) returning id', mealObj
    );
};

// Deletes a meal option
meals.delete = (id) => {
    return db.none(
        'DELETE FROM meals WHERE id=$1', [id]
    );
};

// Deletes meals when the recipe is deleted 
meals.deleteByRecipe = (recipeID) => {
    return db.none(
        'DELETE FROM meals WHERE recipe_id = $1', [recipeID]
    );
};

module.exports = meals;