// ignore_for_file: must_be_immutable, no_logic_in_create_state, prefer_final_fields

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:shop/resoconto_cliente.dart';
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
          automaticallyImplyLeading: false,
          leading: TextButton(
              onPressed: () => {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                          builder: (context) => GuestReportPage(guest)),
                    )
                  },
              child: const Icon(
                Icons.arrow_back_rounded,
                color: Colors.white,
              )),
          title: Text(
            "Deposito di $guest",
            style: defaultTextStyle,
          )),
      body: booksDisplayer,
    );
  }
}

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
  late List<Book> _depositing = [];
  Color submitColor = Colors.white;

  @override
  Widget build(BuildContext context) {
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
                  color: secondaryColor,
                  size: 30,
                ),
              ),
              style: TextStyle(fontSize: 30, color: secondaryColor),
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
                                BorderSide(color: secondaryColor, width: 5))),
                    child: Scaffold(
                        appBar: AppBar(
                            title: const Text("In lista"),
                            backgroundColor: secondaryColor,
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
                                                    addToDepositing(
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
                        backgroundColor: secondaryColor,
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
                                      removeToCart(_depositing[index]);
                                    },
                                    child: const Text("rimuovimi")),
                                Text(_depositing[index].title.toString()),
                                Text(_depositing[index].subject.toString()),
                                Text(_depositing[index].price.toString()),
                                Text(_depositing[index].section.toString())
                              ],
                            ));
                      },
                      itemCount: _depositing.length,
                    )))
          ],
        )),
        InkWell(
            onTap: () {
              for (var book in _depositing) {
                var res = http.put(
                  Uri.http(host, "/storage/add-to-storage"),
                  headers: <String, String>{
                    'Content-Type': 'application/json; charset=UTF-8',
                  },
                  body: jsonEncode(<String, String>{
                    "book": book.isbn.toString(),
                    "seller": guest
                  }),
                );

                res.then((value) {
                  print(value.body);
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
              setState(() {
                _depositing = [];
              });
            },
            child: Container(
              width: 1000,
              height: 70,
              decoration: BoxDecoration(
                  color: submitColor,
                  border: Border(
                      top: BorderSide(color: secondaryColor, width: 5),
                      left: BorderSide(color: secondaryColor, width: 5),
                      right: BorderSide(color: secondaryColor, width: 5))),
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

  void addToDepositing(Book book) {
    setState(() {
      _depositing.add(book);
      submitColor = Colors.white;
    });
  }

  void removeToCart(Book book) {
    setState(() {
      _depositing.remove(book);
      submitColor = Colors.white;
    });
  }

  Future<List<Book>> fetchDepositedBooks() async {
    try {
      var url = Uri.http(host, "/storage/given-from-id", {"id": guest});

      var res = await http.get(url);

      return parseBooks(res.body);
    } catch (e) {
      return [];
    }
  }

  Future<List<Book>> fetchValidBooks(String isbn) async {
    try {
      Uri url = Uri.http(host, "/books/get-books", {"book": isbn});
      var res = await http.get(url);

      return parseBooks(res.body);
    } catch (e) {
      print("errad $e");
      return [];
    }
  }

  List<Book> parseBooks(String responseBody) {
    if (responseBody.length == 2) {
      return <Book>[];
    }

    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Book>((json) => Book.fromJson(json)).toList();
  }
}
