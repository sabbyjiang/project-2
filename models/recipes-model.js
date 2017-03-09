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

    const query = 'SELECT * FROM recipes WHERE ' + conditions;

    return db.any(query);
}



module.exports = db;