CREATE DATABASE shop;

USE shop;

CREATE TABLE book(
	subject 	VARCHAR(100)  NOT NULL,
	ISBN 			CHAR(13) 	  NOT NULL,
	author 		VARCHAR(100)  NOT NULL,
	title 		VARCHAR(1000) NOT NULL,
	volume 		CHAR 			  NOT NULL,
	publisher 	VARCHAR(60)   NOT NULL,
	price 		VARCHAR(6) 	  NOT NULL,
	newAdoption CHAR(2),
	toBuy 		CHAR(2),
	advised 		CHAR(2),
	PRIMARY KEY (ISBN)
);

CREATE TABLE clients (
	email VARCHAR(254) NOT NULL,
	position INT(3) NOT NULL,
	PRIMARY KEY (email)

);

CREATE TABLE trades(
	id 	   INT(2)      NOT NULL,
	book 	 CHAR(13) 	   NOT NULL,
	seller VARCHAR(254)  NOT NULL,
	buyer  VARCHAR(254),
	state  BOOLEAN  		NOT NULL,
	gain   FLOAT,
	PRIMARY KEY (id,book,seller),
	FOREIGN KEY (book)   REFERENCES book(ISBN),
	FOREIGN KEY (seller) REFERENCES clients(email),
	FOREIGN KEY (buyer)  REFERENCES clients(email)

);

CREATE TABLE classes (
	class VARCHAR(30) NOT NULL,
	book  CHAR(13)    NOT NULL,
	PRIMARY KEY (class, book),
	FOREIGN KEY (book) REFERENCES book(ISBN)

);
