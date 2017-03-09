var db = pgp(process.env.DATABASE_URL || 'postgres://sabrina@localhost:5432/meal-planning');

const meals = {};

meals.findAll = () => {
    return db.manyOrNone(
        'SELECT * FROM meals'
    );
};

meals.findOne = (id) => {
    return db.one(
        'SELECT * FROM meals WHERE id=$1', [id]
    );
}

meals.findByMeal = (mealPref) => {
    let statement = [];

    Object.keys(mealPref).forEach(key => {
    if(mealPref[key]){
        statement.push('' + key + '=TRUE');
    }
    });

    const conditions = statement.join(' AND ');

    const query = 'SELECT * FROM meals WHERE ' + conditions + 'ORDER BY dish';

    return db.any(query);
}

meals.create = (mealObj) => {
    return db.one(
        'INSERT INTO meals(breakfast, lunch, dinner, dish, recipe_id) VALUES($[breakfast], $[lunch], $[dinner], $[dish], $[recipe_idl]) returning id', mealObj
    );
}

meals.delete = (id) => {
    return db.none(
        'DELETE FROM meals WHERE id=$1', [id]
    );
}

module.exports = db;