const meals = require('../../../../models/meals-model');

const controller = {};

// Finds all recipes under the meals model
controller.findAll = (req,res) => {
    meals.findAll(req.user.id)
        .then(data => {
            res.render('user/meals/all', {meals: data});
        })
        .catch(err => {
            console.log('Error: Find All: ', err)});
            // res.render('user/meals/all', {none: 'Oops! You don\'t seem to have any saved meals'});
};

// Finds recipes by certain meal restraints
// Only returns the recipes that meet ALL criteria
controller.findByMeal = (req,res) => {
    const choices = ['breakfast', 'lunch', 'dinner'];
    const dietPref = {};
    choices.forEach(choice => {
        dietPref[choice] = (req.query[choice] == 'on');
    });

    meals.findByMeal(dietPref, req.user.id)
        .then(data => {
            res.render('user/meals/bymeal', {meals: data});
        })
        .catch(err => {
            console.log('Error: findByMeal:', err);
        });
}

// Finds recipes from the meals database by dish associated
controller.findByDish = (req, res) => {
    meals.findByDish(req.query.dish, req.user.id)
        .then(data => {
            res.render('user/meals/dish', {dish: data})
        })
        .catch(err => {
            console.log('Error: findByDish:', err);
            // res.render('user/meals/dish', {none: 'Oops! You don\'t have any recipes saved under ' + req.body.dish + 's'});
        });
}

module.exports = controller;