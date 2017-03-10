const meals = require('../../../models/meals-model');

const controller = {};

controller.findAll = (req, res) => {
    meals.findAll()
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findAll', err));
};

controller.findByMeal = (req, res) => {
    const meals = ['breakfast', 'lunch', 'dinner', 'healthy'];
    const mealPref = {};

    meals.forEach(meal => {
        mealPref[meal] = (req.body[meal] == 'TRUE');
    });

    meals.findByMeal(mealPref)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findByMeal', err));
};

controller.findByDish = (req, res) => {
    meals.findByDish(req.body.choices)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findByDish', err));
};

controller.create = (req, res) => {
    const newMealKeys = ['breakfast', 'lunch', 'dinner', 'healthy', 'recipe_id'];
    const newMeal = {};

    newMealKeys.forEach(key => {
        if(req.body[key] == 'TRUE' || req.body[key] == 'FALSE'){
            newMeal[key] = (req.body[key] == 'TRUE');
        } else {
            newMeal[key] = req.body[key];
        }
    });

    meals.create(newMeal)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: create:', err));
};

controller.delete = (req, res) => {
    meals.delete(req.params.id)
        .then(console.log('yay'))
        .catch(err => console.log('ERROR: delete', err));
}

module.exports = controller;