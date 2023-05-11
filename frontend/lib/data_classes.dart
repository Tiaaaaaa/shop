import 'package:flutter/material.dart';
import 'package:flutter/material.dart';

class Book {
  final int isbn;
  final String subject;
  final String title;
  final String volume;
  final String publisher;
  final int price;
  final String section;

  const Book({
    required this.isbn,
    required this.subject,
    required this.title,
    required this.volume,
    required this.publisher,
    required this.price,
    required this.section,
  });

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      isbn: json['isbn'] as int,
      subject: json['subject'] as String,
      title: json['title'] as String,
      volume: json['volume'] as String,
      publisher: json['publisher'] as String,
      price: json['price'] as int,
      section: json['section'] as String,
    );
  }

  Widget display() {
    return Card(
      borderOnForeground: true,
      elevation: 2,
      child: Column(
        children: [
          Image(
            image: NetworkImage(
                'https://covers.openlibrary.org/b/isbn/$isbn-M.jpg'),
          ),
          Text("Titolo: $title"),
          Text("Prezzo: $price"),
          Text("Materia: $subject"),
        ],
      ),
    );
  }
}

class User {
  final String cf;
  final int id;

  const User({required this.cf, required this.id});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(cf: json["cf"] as String, id: json["id"] as int);
  }
}

class Storage {
  final Book book;
  final String buyDate;
  final User seller;
  final int id;

  const Storage(
      {required this.book,
      required this.buyDate,
      required this.seller,
      required this.id});

  factory Storage.fromJson(Map<String, dynamic> json) {
    return Storage(
        book: Book.fromJson(json['book']),
        buyDate: json['buyDate'] as String,
        seller: User.fromJson(json['seller']),
        id: json["id"] as int);
  }
}
