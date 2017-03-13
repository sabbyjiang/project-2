const db = require('../config/database');

const meals = {};

meals.findAll = (user_id) => {
    return db.manyOrNone(
        'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE meals.users_id=$1', [user_id]
    );
};

meals.findByMeal = (mealPref, user_id) => {
    let statement = [];

    Object.keys(mealPref).forEach(key => {
        console.log('key', key);
        if(mealPref[key]){
            statement.push('meals.' + key + '=true');
        }
    });
    console.log("statement", statement);

    const conditions = statement.join(' AND ');

    console.log("conditions", conditions);

    const query = 'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE ' + conditions + ' AND meals.users_id = $1 ORDER BY dish';

    console.log('query', query);

    return db.any(query, user_id);
}

meals.findByDish = (dish, user_id) => {
    return db.any(
        'SELECT * FROM meals JOIN recipes ON meals.recipe_id = recipes.id WHERE dish=$1 AND meals.users_id=$2', [dish, user_id]
    );
}

meals.create = (mealObj, user_id) => {
    mealObj['user_id'] = user_id;
    return db.one(
        'INSERT INTO meals(breakfast, lunch, dinner, dish, recipe_id, users_id) VALUES($[breakfast], $[lunch], $[dinner], $[dish], $[recipe_id], $[user_id]) returning id', mealObj
    );
}

meals.delete = (id) => {
    return db.none(
        'DELETE FROM meals WHERE id=$1', [id]
    );
}

module.exports = meals;