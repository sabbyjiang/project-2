const recipes = require('../../../../models/recipes-model');
const unirest = require('unirest');
const SPOONACULAR_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/";

const controller = {};

controller.findAll = (req,res) => {
    recipes.findAll(req.user.id)
        .then(data => {
            res.render('user/recipes/all', {recipes: data});
        })
        .catch(err => {
            console.log('Error: Find All: ', err)
            res.render('user/recipes/all', {none: 'Oops! It seems that you have no saved recipes yet!'});
        });
};

controller.findOne = (req, res) => {
    const id = req.params.id;

    recipes.findOne(id, req.user.id)
        .then(data => {
            res.cookie('recipe', data.id);
            res.redirect('/planning/user/recipes/saved/' + data.spoonacular_id); 
        })
        .catch(err => {
            console.log('Error: FindOne:', err);
        });
};

controller.findBySpoonacular = (req, res) => {
    const id = req.params.id;

    let url = process.env.SPOONACULAR_URL + "recipes/" + id + "/information";

    unirest.get(url)
        .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
        .header("Accept", "application/json")
        .end(result => {
            res.render('user/recipes/show', result.body);
        });
}

controller.edit = (req, res) => {
    recipes.findOne(req.cookies.recipe, req.user.id)
        .then(data => {
            res.cookie('recipe', data.id);
            console.log(data);
            res.render('user/recipes/edit', data);
        })
        .catch(err => {
            console.log('Error: FindOne:', err);
        });
}

controller.findByDiet = (req,res) => {
    const choices = ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'ketogenic', 'healthy'];
    const dietPref = {};
    choices.forEach(choice => {
        dietPref[choice] = (req.query[choice] == 'on');
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