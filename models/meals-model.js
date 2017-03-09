const db = require('../config/database');

const meals = {};

meals.findAll = () => {
    return db.manyOrNone(
        'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id'
    );
};

meals.findByMeal = (mealPref) => {
    let statement = [];

    Object.keys(mealPref).forEach(key => {
    if(mealPref[key]){
        statement.push('' + key + '=TRUE');
    }
    });

    const conditions = statement.join(' AND ');

    const query = 'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE ' + conditions + ' ORDER BY dish';

    return db.any(query);
}

meals.findByDish = (dish) => {
    return db.any(
        'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE dish=$1', [dish]
    );
}

meals.create = (mealObj) => {
    return db.one(
        'INSERT INTO meals(breakfast, lunch, dinner, dish, recipe_id) VALUES($[breakfast], $[lunch], $[dinner], $[dish], $[recipe_id]) returning id', mealObj
    );
}

meals.delete = (id) => {
    return db.none(
        'DELETE FROM meals WHERE id=$1', [id]
    );
}

module.exports = meals;