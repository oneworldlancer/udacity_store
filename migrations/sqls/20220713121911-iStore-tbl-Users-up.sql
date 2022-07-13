/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE tbl_Users (
    User_TokenID uuid DEFAULT uuid_generate_v4(),
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    User_Password TEXT NOT NULL,
    PRIMARY KEY(User_TokenID)
);