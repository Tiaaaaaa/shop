import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shop/variables.dart';
import 'package:http/http.dart' as http;

class Book {
  final int isbn;
  final String subject;
  final String title;
  final String volume;
  final String publisher;
  final double price;
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
      price: json['price'] / 100 as double,
      section: json['section'] as String,
    );
  }

  Widget display() {
    Widget image = _getImage();

    return Card(
        borderOnForeground: true,
        elevation: 2,
        margin: const EdgeInsets.all(20),
        child: Container(
            margin: const EdgeInsets.all(10),
            child: Column(
              children: [
                Expanded(
                  child: image,
                ),
                Text("Titolo: $title"),
                Text("Prezzo: $price"),
                Text("Materia: $subject"),
              ],
            )));
  }

  Widget _getImage() {
    try {
      Widget img = FadeInImage(
        image: NetworkImage("http://$host/books/get-cover?isbn=$isbn"),
        placeholder: const AssetImage("assets/flutter-logo.png"),
        imageErrorBuilder: (context, error, stackTrace) {
          print("object");
          return Image.asset('assets/flutter-logo.png', fit: BoxFit.fitWidth);
        },
        fit: BoxFit.fitWidth,
      );
      return img;
    } catch (e) {
      return Image.asset("assets/flutter-logo.png");
    }
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

  Future<void> stash() async {
    try {
      await http.put(Uri.http(host, "/storage/stash-book"),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, int>{
            "id": id,
          }));
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> unstash() async {
    try {
      await http.put(Uri.http(host, "/storage/unstash-book"),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, int>{
            "id": id,
          }));
    } catch (e) {
      print(e.toString());
    }
  }
}
