DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    vegetarian BOOLEAN NOT NULL,
    vegan BOOLEAN NOT NULL,
    gluten-free BOOLEAN NOT NULL,
    dairy-free BOOLEAN NOT NULL,
    ketogenic BOOLEAN NOT NULL,
    healthy BOOLEAN NOT NULL,
    url BOOLEAN NOT NULL
);

CREATE TABLE meals(
    id SERIAl PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    dish VARCHAR(255) NOT NULL,
    recipe_id INT REFERENCES recipes(id)
);