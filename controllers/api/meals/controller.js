const meals = require('../../../models/meals-model');

const controller = {};

controller.findAll = (req, res) => {
    console.log('issue in meals.findall');
    meals.findAll(req.user.id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findAll', err));
};

controller.findByMeal = (req, res) => {
    const meals = ['breakfast', 'lunch', 'dinner', 'healthy'];
    const mealPref = {};

    meals.forEach(meal => {
        mealPref[meal] = (req.body[meal] == 'TRUE');
    });

    meals.findByMeal(mealPref, req.user.id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findByMeal', err));
};

controller.findByDish = (req, res) => {
    meals.findByDish(req.body.choices, req.user.id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: findByDish', err));
};

controller.create = (req, res) => {
    const newMealKeys = ['breakfast', 'lunch', 'dinner', 'healthy'];
    const newMeal = {};

    newMealKeys.forEach(key => {
            newMeal[key] = (req.body[key] == 'TRUE');
    });

    newMeal['dish'] = req.body.dish;

    newMeal['recipe_id'] = req.cookies.recipe;

    meals.create(newMeal, req.user.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: create:', err));
};

controller.delete = (req, res) => {
    meals.delete(req.params.id)
        .then(console.log('yay'))
        .catch(err => console.log('ERROR: delete', err));
}

module.exports = controller;