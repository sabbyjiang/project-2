const recipes = require('../../../models/recipes-model');
const meals = require('../../../models/meals-model');

const controller = {};

controller.findAll = (req,res) => {
    recipes.findAll(req.user.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('Error: Find All: ', err));
};

controller.findOne = (req, res) => {
    const id = req.params.id;

    recipes.findOne(id, req.user.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('Error: FindOne:', err));
};

controller.findByDiet = (req,res) => {
    const choices = ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'ketogenic'];
    const dietPref = {};
    choices.forEach(choice => {
        dietPref[choice] = (req.body[choice] == 'TRUE');
    });

    recipes.findByDiet(dietPref, req.user.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('Error: findByDiet:', err));
}

controller.create = (req, res) => {
    const inputFields = ['name', 'image', 'vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'ketogenic', 'healthy', 'url'];
    const newRecipe = {};
    inputFields.forEach(field => {
        newRecipe[field] = req.body[field];
    });

    // const mealObj = {
    //     dish: req.body.dish,
    //     breakfast: req.body.breakfast,
    //     lunch: req.body.lunch,
    //     dinner: req.body.dinner,
    // };

    recipes.create(newRecipe, req.user.id)
        .then(recipeData => {
            res.json(recipeData);
            // mealObj['recipe_id'] = recipeData.id;
            // meals.create(mealObj)
            //     .then(mealData => {
            //         res.json(mealData);
            //     })
            //     .catch(err => {'Error posting new meal:', err});
        })
        .catch(err => console.log('Error: new recipe:', err));
}

controller.delete = (req, res) => {
    recipes.delete(req.params.id)
        .then(console.log('yay'))
        .catch(err => console.log('err', err));
}

module.exports = controller;