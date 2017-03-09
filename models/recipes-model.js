var db = pgp(process.env.DATABASE_URL || 'postgres://sabrina@localhost:5432/meal-planning');

const recipes = {};

recipes.findAll = () => {
    return db.manyOrNone(
        'SELECT * FROM recipes'
    );
};

recipes.findOne = (id) => {
    return db.one(
        'SELECT * FROM recipes WHERE id=$1', [id]
    );
}

recipes.findByDiet = (dietPref) => {
    let statement = [];

    Object.keys(dietPref).forEach(key => {
    if(dietPref[key]){
        statement.push('' + key + '=TRUE');
    }
    });

    const conditions = statement.join(' AND ');

    const query = 'SELECT * FROM recipes WHERE ' + conditions + 'ORDER BY name';

    return db.any(query);
}

recipes.create = (recipeObj) => {
    return db.one(
        'INSERT INTO recipes(name, image, vegetarian, vegan, gluten_free, dairy_free, ketogenic, healthy, url) VALUES($[name], $[image], $[vegetarian], $[vegan], $[glutenFree], $[dairyFree], $[ketogenic], $[healthy], $[url]) returning id', recipeObj
    );
}

recipes.delete = (id) => {
    return db.none(
        'DELETE FROM recipes WHERE id=$1', [id]
    );
}

module.exports = db;