const db = require('../config/database');

const recipes = {};

// Selects all recipes from the user
recipes.findAll = (user_id) => {
    return db.manyOrNone(
        'SELECT * FROM recipes WHERE users_id=$1', [user_id]
    );
};

// Finds 4 most recent recipes from the user
recipes.findSome = (user_id) => {
    return db.manyOrNone(
        'SELECT * FROM recipes WHERE users_id=$1 ORDER BY recipes.id DESC LIMIT 4', [user_id]
    );
};

// Finds a single recipe from the user based off the userid
recipes.findOne = (id, user_id) => {
    return db.one(
        'SELECT * FROM recipes WHERE id=$1 AND users_id=$2', [id, user_id]
    );
};

// Finds by dietary choices from the user
recipes.findByDiet = (dietPref, user_id) => {
    let statement = [];

    Object.keys(dietPref).forEach(key => {
        if(dietPref[key]){
            statement.push('' + key + '=TRUE');
        }
    });

    const conditions = statement.join(' AND ');

    const query = 'SELECT * FROM recipes WHERE ' + conditions + ' AND users_id=$1 ORDER BY name';

    return db.any(query, [user_id]);
};

// Creates a new recipe
recipes.create = (recipeObj, user_id) => {
    recipeObj['user_id'] = user_id;
    return db.one(
        'INSERT INTO recipes(name, image, vegetarian, vegan, gluten_free, dairy_free, ketogenic, healthy, url, spoonacular_id, users_id) VALUES($[name], $[image], $[vegetarian], $[vegan], $[glutenFree], $[dairyFree], $[ketogenic], $[healthy], $[url], $[spoonacular_id], $[user_id]) returning id', recipeObj
    );
};

// Edits a recipe
recipes.edit = (recipeObj, user_id) => {
    recipeObj['user_id'] = user_id;

    return db.one(
        'UPDATE recipes SET name = $[name], image = $[image], vegetarian = $[vegetarian], vegan = $[vegan], gluten_free = $[glutenFree], dairy_free = $[dairyFree], ketogenic = $[ketogenic], healthy = $[healthy], url = $[url], spoonacular_id = $[spoonacular_id], users_id = $[user_id] WHERE id = $[recipe_id] returning id', recipeObj
    );
}

// Deletes a recipe from the database
recipes.delete = (id) => {
    return db.none(
        'DELETE FROM recipes WHERE id=$1', [id]
    );
};

module.exports = recipes;