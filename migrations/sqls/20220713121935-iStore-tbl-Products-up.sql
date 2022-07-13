/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE tbl_Products (
    Product_TokenID uuid DEFAULT uuid_generate_v4(),
    Category_Name VARCHAR(100) NOT NULL DEFAULT 'food',
    Product_Name TEXT NOT NULL,
    Product_Price DECIMAL NOT NULL,
    Product_Count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(Product_TokenID)
);