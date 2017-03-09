const meals = require('../../../models/meals-model');

const controller = {};

controller.findAll = (req,res) => {
    meals.findAll()
        .then(data => {
            res.render('meals/all', {meals: data});
        })
        .catch(err => console.log('Error: Find All: ', err));
};

controller.findByMeal = (req,res) => {
    const choices = ['breakfast', 'lunch', 'dinner'];
    const dietPref = {};
    choices.forEach(choice => {
        dietPref[choice] = (req.body[choice] == 'TRUE');
    });

    meals.findByMeal(dietPref)
        .then(data => {
            res.render('meals/bymeal', {meals: data})
        })
        .catch(err => console.log('Error: findByMeal:', err));
}

controller.findByDish = (req, res) => {
    meals.findByDish(req.body.dish)
        .then(data => {
            res.render('meals/dish', {dish: data})
        })
        .catch(err => console.log('Error: findByDish:', err));
}

module.exports = controller;