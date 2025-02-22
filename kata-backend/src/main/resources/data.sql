-- Insert into Product table
INSERT INTO Product (id, name) VALUES (1, 'Apple');
INSERT INTO Product (id, name) VALUES (2, 'Banana');
INSERT INTO Product (id, name) VALUES (3, 'Orange');

-- Insert into Price table (assuming the "product_id" column references the Product table)
INSERT INTO Price (id, amount, quantity, product_id) VALUES (1, 35, 1, 1);
INSERT INTO Price (id, amount, quantity, product_id) VALUES (2, 120, 4, 1);
INSERT INTO Price (id, amount, quantity, product_id) VALUES (3, 50, 1, 2);
INSERT INTO Price (id, amount, quantity, product_id) VALUES (4, 120, 3, 2);
INSERT INTO Price (id, amount, quantity, product_id) VALUES (5, 70, 1, 3);
