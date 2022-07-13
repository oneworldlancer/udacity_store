/* Replace with your SQL commands */
ALTER TABLE tbl_Order_Product_Join
ADD CONSTRAINT fk_Order_Product_Join_Product_TokenID 
FOREIGN KEY (Product_TokenID) 
REFERENCES tbl_Products (Product_TokenID);

ALTER TABLE tbl_Order_Product_Join
ADD CONSTRAINT fk_Order_Product_Join_Order_TokenID 
FOREIGN KEY (Order_TokenID) 
REFERENCES tbl_Orders (Order_TokenID);