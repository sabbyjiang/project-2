const recipes = require('../../../models/recipes-model');

const controller = {};

// all of render as JSON unless otherwise stated

// Finds all the recipes for a given user
controller.findAll = (req,res) => {
    recipes.findAll(req.user.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('Error: Find All: ', err));
};

// finds a single recipe
controller.findOne = (req, res) => {
    const id = req.params.id;

    recipes.findOne(id, req.user.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('Error: FindOne:', err));
};

//  finds given diet constraints
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

// Creates a new recipe
controller.create = (req, res) => {
    const inputFields = ['name', 'image', 'vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'ketogenic', 'healthy', 'url', 'spoonacular_id'];
    const newRecipe = {};
    inputFields.forEach(field => {
        newRecipe[field] = req.body[field];
    });

    recipes.create(newRecipe, req.user.id)
        .then(recipeData => {
            res.json(recipeData);
        })
        .catch(err => console.log('Error: new recipe:', err));
}

// Edits the recipe entry given the recipe id
controller.edit = (req, res) => {
    const inputFields = ['name', 'image', 'vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'ketogenic', 'healthy', 'url', 'spoonacular_id'];
    const updateRecipe = {};
    inputFields.forEach(field => {
        updateRecipe[field] = req.body[field];
    });
    // This needs to passed in through the cookie because of how the recipe data is pulled through
    updateRecipe['recipe_id'] = req.cookies.recipe;
    
    recipes.edit(updateRecipe, req.user.id)
        .then(recipeData => {
            res.json(recipeData);
        })
        .catch(err => console.log('Error: edit recipe', err));
}

// Deletes the recipe from the database
controller.delete = (req, res) => {
    recipes.delete(req.params.id)
        .then(() => {
            res.json({success: 'success'});
        })
        .catch(err => console.log('err', err));
}

module.exports = controller;