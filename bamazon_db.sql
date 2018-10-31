DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(10) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NUll,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doll Instant Noodle", "Grocery", 1.74, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doritos - Sweet & Spicy", "Snacks", 4.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mountain Dew", "Drinks", 0.99, 994);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Corsair K99 Mechanical Keyboard", "Electronics", 199.99, 68);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Corsair Dark Core SE Mouse", "Electronics", 89.99, 137);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NZXT Kraken CPU Cooler", "Computers", 167.99, 426);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Demolition Man - 4K Blu-Ray", "Movies", 29.99, 395);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Munchkin - Adventure Time Edition", "Games", 19.99, 552);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mass Effect 3 - OST", "Music", 9.99, 500);
