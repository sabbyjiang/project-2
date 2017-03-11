const recipes = require('../../../../models/recipes-model');

const controller = {};

controller.findAll = (req,res) => {
    recipes.findAll()
        .then(data => {
            res.render('user/recipes/all', {recipes: data});
        })
        .catch(err => console.log('Error: Find All: ', err));
};

controller.findOne = (req, res) => {
    const id = req.params.id;

    recipes.findOne(id)
        .then(data => {
            res.render('user/recipes/show', {recipe: data})
        })
        .catch(err => console.log('Error: FindOne:', err));
};

controller.findByDiet = (req,res) => {
    const choices = ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'ketogenic', 'healthy'];
    const dietPref = {};
    choices.forEach(choice => {
        dietPref[choice] = (req.body[choice] == 'TRUE');
    });

    recipes.findByDiet(dietPref)
        .then(data => {
            res.render('user/recipes/bydiet', {recipes: data})
        })
        .catch(err => console.log('Error: findByDiet:', err));
}

module.exports = controller;