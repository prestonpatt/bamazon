DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Becho Dot", "Electronics", 49.99, 100),
("Bamazon Basics Blightning cable", "Electronics", 9.99, 500),
("Bire TV Stick with Balexa", "Electronics", 39.99, 300),
("Bindle", "Electronics", 79.99, 400),
("Microwave", "Appliances", 119.99, 250),
("A Day in the Life of Marlon Bundo", "Books", 13.85, 1000),
("Medium Roast K-Cups, 100 Pack", "Groceries", 32.19, 350),
("Wooden L-Shaped Desk", "Home Goods", 89.99, 30),
("Mountain Bike", "Outdoor Goods", 289.99, 120),
("Legos, 1000-piece set", "Toys", 74.99, 400);

 



