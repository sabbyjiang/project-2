const unirest = require('unirest');
const search = {};

search.byIngredients = (ingredientsArray) => {
    let ingredientString = ingredientsArray.join('%2C');
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=' + ingredientString + '&number=5&ranking=1';

    return unirest.get(url)
        .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
        .header("Accept", "application/json")
        //.end(result => console.log(result.body));
        .end(result => result.body);

    //   unirest.get(url)
    //     .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
    //     .header("Accept", "application/json")
    //     //.end(result => console.log(result.body));
    //     .end(result => res.json(result.body));

    //console.log(x);
}

module.exports = search;