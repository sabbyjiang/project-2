DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    vegetarian BOOLEAN NOT NULL,
    vegan BOOLEAN NOT NULL,
    gluten_free BOOLEAN NOT NULL,
    dairy_free BOOLEAN NOT NULL,
    ketogenic BOOLEAN NOT NULL,
    healthy BOOLEAN NOT NULL,
    url BOOLEAN NOT NULL
);

CREATE TABLE meals(
    id SERIAL PRIMARY KEY,
    breakfast BOOLEAN NOT NULL,
    lunch BOOLEAN NOT NULL,
    dinner BOOLEAN NOT NULL,
    dish VARCHAR(255) NOT NULL,
    recipe_id INT REFERENCES recipes(id) NOT NULL
);

CREATE TABLE pairing(
    id SERIAL PRIMARY KEY,
    recipe1 INT REFERENCES recipes(id) NOT NULL,
    recipe2 INT REFERENCES recipes(id) NOT NULL,
    recipe3 INT REFERENCES recipes(id),
    recipe4 INT REFERENCES recipes(id),
    recipe5 INT REFERENCES recipes(id)
)