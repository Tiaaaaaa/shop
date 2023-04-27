// ignore_for_file: must_be_immutable, no_logic_in_create_state

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:shop/variables.dart';

import 'data_classes.dart';

class CaricoPage extends StatelessWidget {
  CaricoPage(this.guest, {super.key});

  String guest;

  @override
  Widget build(BuildContext context) {
    BooksList booksDisplayer = BooksList(guest);

    return Scaffold(
      appBar: AppBar(
          backgroundColor: primaryColor,
          centerTitle: true,
          title: Text(
            "Deposito di $guest",
            style: defaultTextStyle,
          )),
      body: booksDisplayer,
    );
  }
}

// 'http://127.0.0.1:3000/books/get-books'

class BooksList extends StatefulWidget {
  BooksList(this.guest, {super.key});

  String guest;

  @override
  State<BooksList> createState() {
    return _BooksListState(guest);
  }
}

class _BooksListState extends State<BooksList> {
  _BooksListState(this.guest);

  String guest;
  late Future<List<Book>> _books = fetchValidBooks("");
  late List<Book> _cart = [];
  Color submitColor = Colors.white;

  @override
  Widget build(BuildContext context) {
    fetchDepositedBooks(guest);
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        SizedBox(
            height: 50,
            child: TextField(
              maxLength: 13,
              textAlign: TextAlign.center,
              autofocus: true,
              cursorColor: primaryColor,
              decoration: InputDecoration(
                counterText: "",
                hintText: "Inserisci qua l'ISBN da ricercare",
                hintStyle: defaultTextStyle,
                border: InputBorder.none,
                suffixIcon: Icon(
                  Icons.menu_book_rounded,
                  color: secundaryColor,
                  size: 30,
                ),
              ),
              style: TextStyle(fontSize: 30, color: secundaryColor),
              onChanged: (value) {
                updateList(value);
              },
            )),
        Expanded(
            child: Row(
          children: [
            Expanded(
                child: Container(
                    decoration: BoxDecoration(
                        border: Border(
                            right:
                                BorderSide(color: secundaryColor, width: 5))),
                    child: Scaffold(
                        appBar: AppBar(
                            title: const Text("In lista"),
                            backgroundColor: secundaryColor,
                            automaticallyImplyLeading: false),
                        body: FutureBuilder<List<Book>>(
                            future: _books,
                            builder: (context, snapshot) {
                              switch (snapshot.connectionState) {
                                case ConnectionState.none:
                                  return const Text(
                                      'Connessione non disponibile');
                                case ConnectionState.waiting:
                                  return const Text('loading...');
                                default:
                                  return ListView.builder(
                                    itemCount: snapshot.data!.length,
                                    itemBuilder: (context, index) {
                                      return Container(
                                          height: 30,
                                          margin:
                                              const EdgeInsets.only(bottom: 5),
                                          decoration: BoxDecoration(
                                            color: primaryColor,
                                          ),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceEvenly,
                                            children: [
                                              TextButton(
                                                  onPressed: () {
                                                    addToCart(
                                                        snapshot.data![index]);
                                                  },
                                                  child:
                                                      const Text("aggiungi")),
                                              Text(snapshot.data![index].title
                                                  .toString()),
                                              Text(snapshot.data![index].subject
                                                  .toString()),
                                              Text(snapshot.data![index].price
                                                  .toString()),
                                              Text(snapshot.data![index].section
                                                  .toString())
                                            ],
                                          ));
                                    },
                                  );
                              }
                            })))),
            Expanded(
                child: Scaffold(
                    appBar: AppBar(
                        title: const Text("Depositati"),
                        backgroundColor: secundaryColor,
                        automaticallyImplyLeading: false),
                    body: ListView.builder(
                      itemBuilder: (context, index) {
                        return Container(
                            height: 30,
                            margin: const EdgeInsets.only(bottom: 5),
                            decoration: BoxDecoration(
                              color: primaryColor,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                TextButton(
                                    onPressed: () {
                                      removeToCart(_cart[index]);
                                    },
                                    child: const Text("rimuovimi")),
                                Text(_cart[index].title.toString()),
                                Text(_cart[index].subject.toString()),
                                Text(_cart[index].price.toString()),
                                Text(_cart[index].section.toString())
                              ],
                            ));
                      },
                      itemCount: _cart.length,
                    )))
          ],
        )),
        InkWell(
            onTap: () {
              for (var book in _cart) {
                var url = Uri.http(host, "/storage/add-to-storage",
                    {"book": book.isbn.toString()});

                var res = http.put(url);
                res.then((value) {
                  setState(() {
                    submitColor = primaryColor;
                  });
                });

                res.onError((error, stackTrace) {
                  setState(() {
                    submitColor = errorColor;
                  });
                  return res;
                });
              }
            },
            child: Container(
              width: 1000,
              height: 70,
              decoration: BoxDecoration(
                  color: submitColor,
                  border: Border(
                      top: BorderSide(color: secundaryColor, width: 5),
                      left: BorderSide(color: secundaryColor, width: 5),
                      right: BorderSide(color: secundaryColor, width: 5))),
              child: Center(
                child: Text(
                  "Conferma",
                  style: titleTextStyle,
                ),
              ),
            ))
      ],
    );
  }

  void updateList(String isbn) {
    setState(() {
      _books = fetchValidBooks(isbn);
    });
  }

  void addToCart(Book book) {
    setState(() {
      _cart.add(book);
    });
  }

  void removeToCart(Book book) {
    setState(() {
      _cart.remove(book);
    });
  }

  void fetchDepositedBooks(String isbn) async {
    try {
      var url = Uri.http(host, "/storage/given-from-cf", {"id": guest});

      var res = await http.get(url);

      setState(() {
        _cart.addAll(parseBooks(res.body));
      });
    } catch (e) {
      _cart = [];
    }
  }

  Future<List<Book>> fetchValidBooks(String isbn) async {
    try {
      var url = Uri.http(host, "/books/get-books", {"book": isbn});

      var res = await http.get(url);

      // Use the compute function to run parseBooks in a separate isolate.
      return parseBooks(res.body);
    } catch (e) {
      return [];
    }
  }

  // A function that converts a response body into a List<Book>.
  List<Book> parseBooks(String responseBody) {
    if (responseBody.length == 2) {
      return <Book>[];
    }

    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Book>((json) => Book.fromJson(json)).toList();
  }
}
