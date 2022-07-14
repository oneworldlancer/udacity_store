# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products
* Index - Get All

API- (GET/):
*******************

http://localhost:3000/api/product

PARAMS:
*************
N/A

RESPONSE:
*************

{
"code": 200,
"status": "success",
"data": [
{
"product_tokenid": "5f32c7fc-db90-4dcf-9ebf-0fdce54ab60f",
"product_name": "Pro3",
"product_price": "3303",
"category_name": "fruit"
},
{
"product_tokenid": "f2063fd4-2d1d-4791-af73-ac59d686cfc9",
"product_name": "Pro1",
"product_price": "100",
"category_name": "fruit"
}
],
"message": "Products retrieved successfully"
}



* Show - Get By id

API- (GET/:id):
*******************

http://localhost:3000/api/product/id


PARAMS:
*******************
param1 == id


RESPONSE:
*******************

{
"status": "success",
"data": {
"product_tokenid": "5f32c7fc-db90-4dcf-9ebf-0fdce54ab60f",
"product_name": "Pro3",
"product_price": "3303",
"category_name": "fruit"
},
"message": "Product retrieved successfully"
}


* Create [token required]

API- (POST/):
*******************

http://localhost:3000/api/product


PARAMS:
*******************

{
"product_name": "Pro4",
"product_price": "100",
"category_name": "fruit"
}


RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": {
"product_name": "Pro4",
"product_price": "100",
"category_name": "fruit"
},
"message": "Product created successfully"
}


* [OPTIONAL] Top 5 most popular products 

API- (GET/API/PRODUCT/TOP/NOW):
*******************

http://localhost:3000/api/product/top/sold/now


PARAMS:
*******************
param1 = TOKEN

RESPONSE:
*******************

* [OPTIONAL] Products by category (args: product category)

API- (GET/API/PRODUCT/CATEGORY/:id):
*******************

http://localhost:3000/api/product/category/fruit

PARAMS:
*******************

param1 = TOKEN


RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": {
"product_name": "Pro4",
"product_price": "100",
"category_name": "fruit"
},
"message": "Products created successfully"
}


#### Users
- Index [token required] - Get All

API- (GET/):
*******************
 
http://localhost:3000/api/user

PARAMS:
*******************

N/A

RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": [
{
"user_tokenid": "e91048cb-cd73-4b1b-9455-522059f835cb",
"first_name": "fName1101",
"last_name": "lName1101"
},
{
"user_tokenid": "c1aa50bd-897c-4ec7-864d-83e6ccc04645",
"first_name": "fName2202",
"last_name": "lName2202"
}
],
"message": "Users retrieved successfully"
}


- - 
- Show [token required] - Get One By id

API- (GET/:id):
*******************

http://localhost:3000/api/user/id

PARAMS:
*******************

param1 == id

RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": {
"user_tokenid": "c1aa50bd-897c-4ec7-864d-83e6ccc04645",
"first_name": "fName1101",
"last_name": "lName1101"
},
"message": "User retreived successfully"
}

- - 
- Create N[token required]

API-(POST/):
*******************

http://localhost:3000/api/user

PARAMS:
*******************

{
"first_name": "fName1101",
"last_name": "lName1101",
"user_password": "1234"
}


RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": {
"user_tokenid": "c1aa50bd-897c-4ec7-864d-83e6ccc04645",
"first_name": "fName1101",
"last_name": "lName1101"
},
"message": "User created successfully"
}


- -
- Authenticate [token required]

API-(POST/):
*******************

http://localhost:3000/api/user/authenticate

PARAMS:
*******************

.post("/api/user/authenticate")
.set("Content-type", "application/json")
.send({
user_tokenid: c1aa50bd-897c-4ec7-864d-83e6ccc04645,
user_passwprd: "1234",
});


RESPONSE:
*******************

{
"status": "success",
"data": {
"user_tokenid": "c1aa50bd-897c-4ec7-864d-83e6ccc04645",
"first_name": "fName345",
"last_name": "lName345",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfdG9rZW5pZCI6ImMxYWE1MGJkLTg5N2MtNGVjNy04NjRkLTgzZTZjY2MwNDY0NSIsImZpcnN0X25hbWUiOiJmTmFtZTM0NSIsImxhc3RfbmFtZSI6ImxOYW1lMzQ1In0sImlhdCI6MTY1NzcxNzQzNH0.dGZd5A9_nu-dLU_PEwGwWATgWKV0YOE_YU8IVvc7RNo"
},
"message": "User authenticated successfully"
}




#### Orders

- Current Order by user (args: user id)[token required]

API- (GET/API/ORDER/USER/:id/ALL):
*******************

http://localhost:3000/api/order/user/:id/all

PARAMS:
*******************

param1 == id

RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": [
{
"order_tokenid": "1f151317-8001-4384-8d01-f2dc41922cd1",
"user_tokenid": "15d4dbcc-f41c-4f52-979f-09e5fc1eb0a7",
"order_status": "open"
},
{
"order_tokenid": "2f8c0fa5-5205-4599-afe4-5175984a805e",
"user_tokenid": "15d4dbcc-f41c-4f52-979f-09e5fc1eb0a7",
"order_status": "close"
}
],
"message": "Orders retrieved successfully"
}


- Add Product to Order - By id

API- (POST/API/ORDER/:id1/PRODUCT/:id2):
*******************

http://localhost:3000/api/order/1/product/2


PARAMS:
*******************
N/A

RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": {
"order_tokenid": "1",
"product_tokenid": "2"
},
"message": "Product added to order successfully"
}




- [OPTIONAL] Completed Orders by user (args: user id)[token required]

API-(GET/API/ORDER/USER/:id/CLOSE):
*******************

http://localhost:3000/api/order/user/id/close

PARAMS:
*******************
param1 == id

RESPONSE:
*******************

{
"code": 200,
"status": "success",
"data": [
{
"order_tokenid": "1f151317-8001-4384-8d01-f2dc41922cd1",
"user_tokenid": "15d4dbcc-f41c-4f52-979f-09e5fc1eb0a7",
"order_status": "close"
},
{
"order_tokenid": "2f8c0fa5-5205-4599-afe4-5175984a805e",
"user_tokenid": "15d4dbcc-f41c-4f52-979f-09e5fc1eb0a7",
"order_status": "close"
}
],
"message": "Orders retrieved successfully"
}



## Data Shapes

#### Product

*******************

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE tbl_Products (
- Product_TokenID uuid DEFAULT uuid_generate_v4(),
- Category_Name VARCHAR(100) NOT NULL DEFAULT 'food',
- Product_Name TEXT NOT NULL,
- Product_Price DECIMAL NOT NULL,
- Product_Count INTEGER NOT NULL DEFAULT 0, >>>[EVERY TIME INCREASED BY 1 SOLD, TO GET MOST POPULAR]
- PRIMARY KEY(Product_TokenID)
);


#### User

*******************

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE tbl_Users (
- User_TokenID uuid DEFAULT uuid_generate_v4(),
- First_Name VARCHAR(50) NOT NULL,
- Last_Name VARCHAR(50) NOT NULL,
- User_Password TEXT NOT NULL,
- PRIMARY KEY(User_TokenID)
);


#### Orders

*******************

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
- CREATE TABLE tbl_Orders (
- Order_TokenID uuid DEFAULT uuid_generate_v4(),
- User_TokenID uuid NOT NULL, >>>[foreign key to tbl_Users table]
- Order_Status VARCHAR(50) NOT NULL DEFAULT 'active',
- PRIMARY KEY(Order_TokenID)
);

- - 
- - FOREIGN-KEY
-------------------
ALTER TABLE tbl_Orders
ADD CONSTRAINT fk_Order_User
FOREIGN KEY (User_TokenID)
REFERENCES tbl_Users (User_TokenID);



#### Order-Product_Join

*******************

CREATE TABLE tbl_Order_Product_Join (
- Order_Product_JoinID uuid DEFAULT uuid_generate_v4(),
- Order_TokenID uuid NOT NULL, >>>[foreign key to tbl_Orders table]
- Product_TokenID uuid NOT NULL, >>>[foreign key to tbl_Products table]
- Product_Quantity INTEGER NOT NULL DEFAULT 0,
- Order_Total DECIMAL NOT NULL DEFAULT 0

- - 
- - FOREIGN-KEY
-------------------
ALTER TABLE tbl_Order_Product_Join
ADD CONSTRAINT fk_Order_Product_Join_Product_TokenID
FOREIGN KEY (Product_TokenID)
REFERENCES tbl_Products (Product_TokenID);

ALTER TABLE tbl_Order_Product_Join
ADD CONSTRAINT fk_Order_Product_Join_Order_TokenID
FOREIGN KEY (Order_TokenID)
REFERENCES tbl_Orders (Order_TokenID);




