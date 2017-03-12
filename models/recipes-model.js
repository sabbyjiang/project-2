const db = require('../config/database');

const recipes = {};

recipes.findAll = (user_id) => {
    return db.manyOrNone(
        'SELECT * FROM recipes WHERE users_id=$1', [user_id]
    );
};

recipes.findSome = (user_id) => {
    return db.manyOrNone(
        'SELECT * FROM recipes WHERE users_id=$1 ORDER BY recipes.id DESC LIMIT 4', [user_id]
    );
};

recipes.findOne = (id, user_id) => {
    return db.one(
        'SELECT * FROM recipes WHERE id=$1 AND users_id=$2', [id, user_id]
    );
};

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

recipes.create = (recipeObj, user_id) => {
    recipeObj['user_id'] = user_id;
    return db.one(
        'INSERT INTO recipes(name, image, vegetarian, vegan, gluten_free, dairy_free, ketogenic, healthy, url, users_id) VALUES($[name], $[image], $[vegetarian], $[vegan], $[glutenFree], $[dairyFree], $[ketogenic], $[healthy], $[url], $[user_id]) returning id', recipeObj
    );
};

recipes.delete = (id) => {
    return db.none(
        'DELETE FROM recipes WHERE id=$1', [id]
    );
};

module.exports = recipes;