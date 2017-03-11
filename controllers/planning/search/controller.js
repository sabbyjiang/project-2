const unirest = require('unirest');
const SPOONACULAR_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/";

const controller = {};

controller.landing = (req, res) => {
    const numberOfRecipes = 15;
    const url = SPOONACULAR_URL + 'recipes/random?number=' + numberOfRecipes;

    unirest.get(url)
        .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
        .header("Accept", "application/json")
        .end(result => {
            res.render('search/recipes/index', result.body);
        });
}

controller.byName = (req,res) => {
    const numberOfRecipes = 20;

    // Handles the optional factors;
    // REMEMBER TO INCLUDE INSTRUCTIIONS REQUIRED AND NUMBER
    const possibleParameters = ['cuisine', 'diet', 'excludeIngredients', 'intolerances', 'query'];
    let queryArray = [];

    let query = req.query;

    possibleParameters.forEach(parameterTest => {
        // Checks if the data passed along has the key
        if(query[parameterTest]){
            let parameter = query[parameterTest];
            if(parameter.constructor === Array){
                let parsed = parameter.join('%2C');
                queryArray.push(parameterTest + "=" + parsed);
            } else {
                queryArray.push(parameterTest + "=" + parameter);
            }
        }
    });

    const queryString = queryArray.join('&');

    const url = SPOONACULAR_URL + 'recipes/search?' + queryString;

    unirest.get(url)
        .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
        .header("Accept", "application/json")
        .end(result => {
            res.render('search/recipes/by-name', {recipes: result.body.results});
        });
}

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
    const url = SPOONACULAR_URL + "recipes/findByIngredients?ingredients=" + ingredientString + '&number=5&ranking=1';

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