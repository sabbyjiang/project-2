$(document).ready(()=>{
    const newRecipe = () => {
        // name, image, url
        const recipe = {};
        recipe['name'] = $('h1').text();
        // recipe['image'] = $('img').attr('src');
        recipe['url'] = $('.sourceURL').attr('href');
        // recipe['dish'] = $('.dish').val();
        // recipe['breakfast'] = document.getElementById('breakfast').checked;
        // recipe['lunch'] = document.getElementById('lunch').checked;
        // recipe['dinner'] = document.getElementById('dinner').checked;
        const recipeOptions = ['vegetarian', 'vegan', 'dairyFree', 'glutenFree', 'ketogenic', 'healthy', 'image'];
        recipeOptions.forEach(option => {
            recipe[option] = ($('#'+option).val() === "true");
        });
        recipe['spoonacular_id'] = $('#spoonacular_id').val();

        return recipe;
    }

    $('#save').submit(e => {
        e.preventDefault();

        const recipeData = newRecipe();

        $.ajax({
            method: 'POST',
            url: '/api/recipes/new/',
            data: recipeData,
            success: recipe => {
                location.replace('/planning/user/recipes/' + recipe.id);
            },
            error: error => {
                console.log('Error:', error);
            }
        })
    })


})