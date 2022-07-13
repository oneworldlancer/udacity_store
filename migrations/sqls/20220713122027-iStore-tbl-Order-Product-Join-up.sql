/* Replace with your SQL commands */
CREATE TABLE tbl_Order_Product_Join (
    Order_Product_JoinID uuid DEFAULT uuid_generate_v4(),
    Order_TokenID uuid NOT NULL,
    Product_TokenID uuid NOT NULL,
    Product_Quantity INTEGER NOT NULL DEFAULT 0,
    Order_Total DECIMAL NOT NULL DEFAULT 0
);