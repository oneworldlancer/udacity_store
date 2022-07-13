/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE tbl_Orders (
    Order_TokenID uuid DEFAULT uuid_generate_v4(),
    User_TokenID uuid NOT NULL,
    Order_Status VARCHAR(50) NOT NULL DEFAULT 'active',
    PRIMARY KEY(Order_TokenID)
);