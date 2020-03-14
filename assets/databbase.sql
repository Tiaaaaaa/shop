CREATE DATABASE shop;

USE shop;

CREATE TABLE book(
	soubject 		VARCHAR(100) 	NOT NULL,
	ISBN 				CHAR(13) 			NOT NULL,
	author 			VARCHAR(100) 	NOT NULL,
	title 			VARCHAR(1000) NOT NULL,
	volume 			CHAR 					NOT NULL,
	publisher 	VARCHAR(60) 	NOT NULL,
	price 			VARCHAR(6) 		NOT NULL,
	newAdoption CHAR(2),
	toBuy 			CHAR(2),
	advised 		CHAR(2),
	reserve 		INT 					DEFAULT 0,
	PRIMARY KEY (ISBN),
	CHECK(reserve >= 0)
);

CREATE TABLE trades(
	id 	   INT(2)   NOT NULL,
	book 	 CHAR(13) NOT NULL,
	seller CHAR(16) NOT NULL,
	buyer  CHAR(16),
	state  BOOLEAN  NOT NULL,
	gain   FLOAT   ,
	PRIMARY KEY (id,book,seller),
	FOREIGN KEY (book)   REFERENCES book(ISBN),
	FOREIGN KEY (seller) REFERENCES clients(CF),
	FOREIGN KEY (buyer)  REFERENCES clients(CF)

);

CREATE TABLE clients (
	CF CHAR(16) NOT NULL,
	position INT(3) NOT NULL

);

CREATE TABLE classes (
	class VARCHAR(30) NOT NULL,
	book  CHAR(13)    NOT NULL,
	PRIMARY KEY (class, book),
	FOREIGN KEY (book) REFERENCES book(ISBN)

);
