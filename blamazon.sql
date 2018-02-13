
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (10, 2) NULL,
    stock_quantity INTEGER (10) NULL,
    product_sales INTEGER (100) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gibson Les Paul,", "Musical Instruments", 900, 4),("Fender Telecaster", "Musical Instruments", 700, 6),("Martin Acoustic","Musical Instruments", 800, 4),
        ("Fender Bassman,", "Musical Instruments", 600, 3),("Catnip Mouse","Pet Toys", 2, 25),("Cat Laser","Pet Toys", 4, 16)
CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (100) NULL,
    over_head_costs INTEGER (10) NULL,
    PRIMARY KEY (department_id)
);
INSERT INTO departments (department_name,over_head_costs)
VALUES ("Musical Instruments", 150),("Pet Toys", 3),