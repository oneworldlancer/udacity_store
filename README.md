# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!


*******************
*******************
*******************
 
# UDACITY_Storefront Backend Project
------------------------------------


## DATABASE
*******************

1 Setup & Connect to Database

- Enter [psql] from terminal window
- Enter [CREATE USER postgres with ecrypted password '123456';]
- Enter [CREATE DATABASE istoredb_dev;] from terminal window
- Enter [grant all privileges on database istoredb_dev to postgres;]
- Enter [CREATE DATABASE istoredb_tst;] from terminal window
- Enter [grant all privileges on database istoredb_dev to postgres;]
- Run [db-migrate up] from terminal


2 Database Configuration

- iNODE_ENV = dev
- iPOSTGRES_HOST = "localhost"
- iPOSTGRES_PORT = 5432
- iPOSTGRES_DB_DEV = "istoredb_dev"
- iPOSTGRES_DB_TST = "istoredb_tst"
- iPOSTGRES_USER = "postgres"
- iPOSTGRES_PASSWORD = "123456"





## SCRIPTS
*******************

1- Create database for dev
- npm run app-migrate-up-dev


2- Create database for test
- npm run app-migrate-up-tst


3- Reset database for dev
- npm run app-migrate-reset-dev


4- Reset database for test
- npm run app-migrate-reset-tst


5- Test database for dev
- npm run app-test-dev


6- Test database for test
- npm run app-test-tst






## API
*******************

App-PORT === 3000


##### api - Default

1- api - Default
http://localhost:3000/
http://localhost:3000/api/


##### api - User

2- api - User

* Get All
(GET/)
http://localhost:3000/api/user


* Get One
(GET/:id)
http://localhost:3000/api/user/:id


* Get Update One
(PATCH/:id)
http://localhost:3000/api/user/:id


* Get Delete One
(DELETE/:id)
http://localhost:3000/api/user/:id


* Authenticate One
(POST/)
http://localhost:3000/api/user/authenticate

input:
{
    "user_tokenid":"value",
    "user_password":"value"
}
        
##### api - Product

3- api - Product

* Get All
(GET/)
  http://localhost:3000/api/product


* Get One
(GET/:id)
  http://localhost:3000/api/product/:id


* Get Update One
(PATCH/:id)
  http://localhost:3000/api/product/:id


* Get Delete One
(DELETE/:id)
  http://localhost:3000/api/product/:id


* Get By Category
(GET/api/product/category/:id)
  http://localhost:3000/api/product/category/:id

 
* Get Top
  http://localhost:3000/api/product/top/sold/now



##### api - Order

4- api - Order

- Get All
(GET/)
  http://localhost:3000/api/order

- Get One
(GET/:ID)
  http://localhost:3000/api/order/:id

- Get Update One
(PATCH/:id)
  http://localhost:3000/api/order/:id

- Get Delete One
(DELETE/:id)
  http://localhost:3000/api/order/:id

- Get CLOSED ORDER By UserToenID
  http://localhost:3000/api/order/user/:id/close

 

## INV
*******************

- iPORT = 3000
- iNODE_ENV = tst
- iPOSTGRES_HOST = "localhost"
- iPOSTGRES_PORT = 5432
- iPOSTGRES_DB_DEV = "istoredb_dev"
- iPOSTGRES_DB_TST = "istoredb_tst"
- iPOSTGRES_USER = "postgres"
- iPOSTGRES_PASSWORD = "123456"

* tbl_Name

- iTBL_USERS="tbl_Users"
- iTBL_PRODUCTS="tbl_Products"
- iTBL_CATEGORIES="tbl_Categories"
- iTBL_ORDERS="tbl_Orders"
- iTBL_ORDER_PRODUCT_JOIN="tbl_Order_Product_Join"

* tbl_Column

- iCLM_USER_TOKENID="user_tokenid"
- iCLM_USER_FIRST_NAME="first_name"
- iCLM_USER_LAST_NAME="last_name"
- iCLM_USER_PASSWORD="user_password"

- iCLM_PRODUCT_TOKENID="product_tokenid"
- iCLM_PRODUCT_NAME="product_name"
- iCLM_PRODUCT_PRICE="product_price"
- iCLM_PRODUCT_QUANTITY="product_quantity"

- iCLM_CATEGORY_TOKENID="category_tokenid"
- iCLM_CATEGORY_NAME="category_name"

- iCLM_ORDER_TOKENID="order_tokenid"
- iCLM_ORDER_STATUS="order_status"

* authentication

- BCRYPT_PASSWORD=shaymaa_hafez_ebrahiem
- SALT_ROUNDS=10
- TOKEN_SECRET=oneworldlancer



###
### Regards,
### Shaymaa Hafez Ebrahiem
### oneworldlancer@gmail.com
### +201221977230



