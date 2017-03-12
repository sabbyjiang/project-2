const recipes = require('../../../../models/recipes-model');

const controller = {};

controller.findAll = (req,res) => {
    recipes.findAll(req.user.id)
        .then(data => {
            console.log(data);
            res.render('user/recipes/all', {recipes: data});
        })
        .catch(err => {
            console.log('Error: Find All: ', err)
            res.render('user/recipes/all', {none: 'Oops! seems that you have no saved recipes yet!'});
        });
};

controller.findOne = (req, res) => {
    const id = req.params.id;

    recipes.findOne(id, req.user.id)
        .then(data => {
            res.render('user/recipes/show', {recipe: data}); 
        })
        .catch(err => {
            console.log('Error: FindOne:', err)
            res.render('user/recipes/show', {none: 'Oops! That recipe doesn\'t seem to exist'});
        });
};

controller.findByDiet = (req,res) => {
    const choices = ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'ketogenic', 'healthy'];
    const dietPref = {};
    choices.forEach(choice => {
        dietPref[choice] = (req.body[choice] == 'TRUE');
    });

    recipes.findByDiet(dietPref, req.user.id)
        .then(data => {
                res.render('user/recipes/bydiet', {recipes: data});
        })
        .catch(err => {
            console.log('Error: findByDiet:', err);
            res.render('user/recipes/bydiet', {none: 'Oops! You don\'t have anything saved with those options'});
        });
}

module.exports = controller;