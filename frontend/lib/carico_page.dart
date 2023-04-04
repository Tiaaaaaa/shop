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
    BooksList booksDisplayer = BooksList();

    return Scaffold(
      appBar: AppBar(
          backgroundColor: primaryColor,
          centerTitle: true,
          title: Text(
            "Deposito di $guest",
            style: defaultTextStyle,
          )),
      body: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          width: 400,
          decoration: BoxDecoration(
              border: Border(
            right: BorderSide(color: secundaryColor, width: 7),
          )),
          child: Scaffold(
              appBar: AppBar(
                title: const Text("Descrizione del libro"),
                automaticallyImplyLeading: false,
                shadowColor: const Color(0x00000000),
                backgroundColor: secundaryColor,
              ),
              body: Padding(
                  padding: const EdgeInsets.only(left: 50, top: 50),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "titolo: tua madre",
                        style: defaultTextStyle,
                      ),
                      Text(
                        "autore: tua madre",
                        style: defaultTextStyle,
                      ),
                      Text(
                        "materia: tua madre",
                        style: defaultTextStyle,
                      ),
                      Text(
                        "anno: tua madre",
                        style: defaultTextStyle,
                      ),
                      Text(
                        "isbn: tua madre",
                        style: defaultTextStyle,
                      ),
                      Text(
                        "prezzo: tua madre",
                        style: defaultTextStyle,
                      ),
                    ],
                  ))),
        ),
        Expanded(
          child: Scaffold(
              appBar: AppBar(
                  backgroundColor: secundaryColor,
                  automaticallyImplyLeading: false,
                  title: const Text(
                    "Ricerca libri disponibili",
                  )),
              body: booksDisplayer),
        ),

        /*CustomScrollView(
            slivers: [
              SliverAppBar(
                  title: const Text(
                    "Ricerca nei libri disponibili: ",
                  ),
                  pinned: true,
                  backgroundColor: secundaryColor,
                  automaticallyImplyLeading: false),
              SliverAppBar(
                  backgroundColor: Colors.white,
                  title: TextField(
                    textAlign: TextAlign.center,
                    autofocus: true,
                    cursorColor: primaryColor,
                    decoration: InputDecoration(
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
                    onChanged: (value) => {},
                  )),
              SliverList(
                delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  return Container(
                      height: 30,
                      margin: const EdgeInsets.only(bottom: 5),
                      decoration: BoxDecoration(
                        color: primaryColor,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: const [
                          Text("titolo"),
                          Text("materia"),
                          Text("prezzo")
                        ],
                      ));
                }, childCount: 20),
              ),
              
            ],
          ),
        ),
              */
      ]),
    );
  }
}
// 'http://127.0.0.1:3000/books/get-books'

class BooksList extends StatefulWidget {
  late String isbn = "";

  BooksList({super.key});

  @override
  State<BooksList> createState() {
    return _BooksListState();
  }
}

class _BooksListState extends State<BooksList> {
  late Future<List<Book>> _books = fetchBooks("");

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
            color: Colors.white,
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
            child: FutureBuilder<List<Book>>(
                future: _books,
                builder: (context, snapshot) {
                  switch (snapshot.connectionState) {
                    case ConnectionState.none:
                    case ConnectionState.waiting:
                      return const Text('loading...');
                    default:
                      return ListView.builder(
                        itemCount: snapshot.data!.length,
                        itemBuilder: (context, index) {
                          return Container(
                              height: 30,
                              margin: const EdgeInsets.only(bottom: 5),
                              decoration: BoxDecoration(
                                color: primaryColor,
                              ),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  Text(snapshot.data![index].title.toString()),
                                  Text(
                                      snapshot.data![index].subject.toString()),
                                  Text(snapshot.data![index].price.toString()),
                                  Text(snapshot.data![index].section.toString())
                                ],
                              ));
                        },
                      );
                  }
                }))
      ],
    );
  }

  void updateList(String isbn) {
    setState(() {
      _books = fetchBooks(isbn);
    });
  }

  Future<List<Book>> fetchBooks(String isbn) async {
    var url = Uri.http("127.0.0.1:3000", "/books/get-books", {"book": isbn});

    var res = await http.get(url);

    // Use the compute function to run parseBooks in a separate isolate.
    return parseBooks(res.body);
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
