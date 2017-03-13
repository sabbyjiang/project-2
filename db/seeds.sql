DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS pairing CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL
);

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
    url VARCHAR(255) NOT NULL,
    spoonacular_id VARCHAR(255) NOT NULL,
    users_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE meals(
    id SERIAL PRIMARY KEY,
    breakfast BOOLEAN NOT NULL,
    lunch BOOLEAN NOT NULL,
    dinner BOOLEAN NOT NULL,
    dish VARCHAR(255) NOT NULL,
    recipe_id INT REFERENCES recipes(id) NOT NULL,
    users_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE pairing(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    recipe1 INT REFERENCES recipes(id) NOT NULL,
    recipe2 INT REFERENCES recipes(id) NOT NULL,
    recipe3 INT REFERENCES recipes(id),
    recipe4 INT REFERENCES recipes(id),
    recipe5 INT REFERENCES recipes(id),
    users_id INT REFERENCES users(id) NOT NULL
);