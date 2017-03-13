$(document).ready(()=>{
    const newRecipe = () => {
        // name, image, url
        const recipe = {};
        recipe['name'] = $('h1').text();
        recipe['url'] = $('.sourceURL').attr('href');
        const recipeOptions = ['vegetarian', 'vegan', 'dairyFree', 'glutenFree', 'ketogenic', 'healthy'];
        recipeOptions.forEach(option => {
            recipe[option] = ($('#'+option).val() === "true");
        });
        recipe['image'] = $('#image').val();
        recipe['spoonacular_id'] = $('#spoonacular_id').val();

        return recipe;
    }

    const editRecipe = () => {
        const recipe = {};
        const recipeOptions = ['vegetarian', 'vegan', 'dairyFree', 'glutenFree', 'ketogenic', 'healthy', 'name', 'url', 'image', 'spoonacular_id'];
        recipeOptions.forEach(option => {
            if($('#'+option).val() === "true" || $('#'+option).val() === "false"){
                recipe[option] = ($('#'+option).val() === "true");
            } else {
                recipe[option] = $('#'+option).val();
            } 
        });

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
    });

    const newMeal = () => {
        const meal = {};
        meal['dish'] = $('.dish').val();
        meal['breakfast'] = document.getElementById('breakfast').checked;
        meal['lunch'] = document.getElementById('lunch').checked;
        meal['dinner'] = document.getElementById('dinner').checked;
        
        return meal;
    };

    $('#save-meal').submit(e => {
        e.preventDefault();

        const mealData = newMeal();
        console.log(mealData);

        $.ajax({
            method: 'POST',
            url: '/api/meals/new/',
            data: mealData,
            success: recipe => {
                window.location.replace('/planning/user/meals/all');
            },
            error: error => {
                console.log('Error:', error);
            }
        })
    });

    $('.delete').click(e => {
        $.ajax({
            method: 'DELETE',
            url: '/api/meals/by-recipe',
            success: (response) => {
                console.log(response);
                $.ajax({
                    method: 'DELETE',
                    url: '/api/recipes/delete/' + response.id,
                    success: () => {
                        window.location.replace('/planning/user/recipes/all');
                    }, error: error => {
                        console.log('Error 2:', error);
                    }
                });
            }, 
            error: error => {
                console.log('Error:', error);
            }
        });
    });

    $('.edit').click(e => {
        window.location.replace('/planning/user/recipes/edit');
    });

    $('#edit').submit(e => {
        e.preventDefault();

        const recipeData = editRecipe();

        $.ajax({
            method: 'PUT',
            url: '/api/recipes/edit/',
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