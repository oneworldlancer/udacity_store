/* Replace with your SQL commands */
ALTER TABLE tbl_Orders
ADD CONSTRAINT fk_Order_User 
FOREIGN KEY (User_TokenID) 
REFERENCES tbl_Users (User_TokenID);