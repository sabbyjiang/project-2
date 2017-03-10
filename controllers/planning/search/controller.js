const unirest = require('unirest');
const SPOONACULAR_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/";

const controller = {};

controller.byIngredients = (req, res) => {
    // Sets the maximum number of ingredients to search
    const maxIngredients = 5;
    let ingredientsArray = [];
    for(let i = 1 ; i <= maxIngredients ; i++){
        if(req.body["ingredient"+i]){
            // Pushes all the ingredients into an array;
            ingredientsArray.push(req.body["ingredient"+i]);
        }
    }

    let ingredientString = ingredientsArray.join('%2C');
    let url = SPOONACULAR_URL + "recipes/findByIngredients?ingredients=" + ingredientString + '&number=5&ranking=1';

    unirest.get(url)
        .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
        .header("Accept", "application/json")
        .end(result => {
            res.render('search/recipes/by-ingredients', {recipes: result.body});
        });
}

controller.recipe = (req, res) => {
    const id = req.params.id;

    let url = process.env.SPOONACULAR_URL + "recipes/" + id + "/information";

    unirest.get(url)
        .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
        .header("Accept", "application/json")
        .end(result => {
            res.render('search/recipes/show', result.body);
            // res.json(result.body);
        });
}

module.exports = controller;