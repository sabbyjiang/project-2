const meals = require('../../../../models/meals-model');

const controller = {};

controller.findAll = (req,res) => {
    meals.findAll(req.user.id)
        .then(data => {
            res.render('user/meals/all', {meals: data});
        })
        .catch(err => {
            console.log('Error: Find All: ', err)});
            res.render('user/meals/all', {none: 'Oops! You don\'t seem to have any saved meals'});
};

controller.findByMeal = (req,res) => {
    const choices = ['breakfast', 'lunch', 'dinner'];
    const dietPref = {};
    choices.forEach(choice => {
        dietPref[choice] = (req.body[choice] == 'TRUE');
    });

    meals.findByMeal(dietPref, req.user.id)
        .then(data => {
            res.render('user/meals/bymeal', {meals: data});
        })
        .catch(err => {
            console.log('Error: findByMeal:', err);
            res.render('user/meals/bymeal', {none: 'Oops! You don\'t seem to have any recipes associated with these parameters'});
        });
}

controller.findByDish = (req, res) => {
    meals.findByDish(req.body.dish, req.user.id)
        .then(data => {
            res.render('user/meals/dish', {dish: data})
        })
        .catch(err => {
            console.log('Error: findByDish:', err);
            res.render('user/meals/dish', {none: 'Oops! You don\'t have any recipes saved under ' + req.body.dish + 's'});
        });
}

module.exports = controller;