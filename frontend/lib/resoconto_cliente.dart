// ignore_for_file: must_be_immutable, prefer_final_fields

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shop/home_page.dart';
import 'package:shop/scarico_page.dart';
import 'package:shop/variables.dart';
import 'package:http/http.dart' as http;

import 'carico_page.dart';
import 'data_classes.dart';

class GuestReportPage extends StatelessWidget {
  GuestReportPage(this.guest, {super.key});

  String guest;

  late Future<List<Book>> _deposited = fetchDepositedBooks();
  late Future<List<Book>> _bougth = fetchBougthBooks();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          leading: TextButton(
              onPressed: () => {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => const HomePage()),
                    )
                  },
              child: const Icon(
                Icons.arrow_back_rounded,
                color: Colors.white,
              )),
          title: Text(
            "Resoconto di $guest",
            style: defaultTextStyle,
          ),
          backgroundColor: primaryColor,
          centerTitle: true,
        ),
        body: Row(children: [
          Expanded(
            child: Container(
                decoration: BoxDecoration(
                    border: Border(
                        right: BorderSide(color: secondaryColor, width: 10))),
                child: Column(
                  children: [
                    AppBar(
                      backgroundColor: secondaryColor,
                      automaticallyImplyLeading: false,
                      title: Row(
                        children: const [
                          Text("Acquistati  "),
                          Icon(
                            Icons.euro_rounded,
                            color: Colors.white,
                            size: 25,
                          )
                        ],
                      ),
                    ),
                    Container(
                      height: 40,
                      decoration: BoxDecoration(
                          border: Border(
                              bottom:
                                  BorderSide(color: secondaryColor, width: 3))),
                      child: TextButton(
                        onPressed: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                                builder: (context) => ScaricoPage(guest)),
                          );
                        },
                        child: Text(
                          "Acquista",
                          style: defaultTextStyle,
                        ),
                      ),
                    ),
                    Expanded(
                        child: FutureBuilder<List<Book>>(
                            future: _bougth,
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
                            }))
                  ],
                )),
          ),
          Expanded(
              child: Column(
            children: [
              AppBar(
                backgroundColor: secondaryColor,
                automaticallyImplyLeading: false,
                title: Row(
                  children: const [
                    Text("Depositati  "),
                    Icon(
                      Icons.arrow_downward_rounded,
                      color: Colors.white,
                      size: 25,
                    )
                  ],
                ),
              ),
              Container(
                height: 40,
                decoration: BoxDecoration(
                    border: Border(
                        bottom: BorderSide(color: secondaryColor, width: 3))),
                child: TextButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                          builder: (context) => CaricoPage(guest)),
                    );
                  },
                  child: Text(
                    "Deposita",
                    style: defaultTextStyle,
                  ),
                ),
              ),
              Expanded(
                  child: FutureBuilder<List<Book>>(
                      future: _deposited,
                      builder: (context, snapshot) {
                        switch (snapshot.connectionState) {
                          case ConnectionState.none:
                            return const Text('Connessione non disponibile');
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
                      }))
            ],
          )),
        ]));
  }

  Future<List<Book>> fetchBougthBooks() async {
    try {
      var url = Uri.http(host, "/storage/bougth-from-id", {"id": guest});

      var res = await http.get(url);

      return parseBooks(res.body);
    } catch (e) {
      return [];
    }
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

  List<Book> parseBooks(String responseBody) {
    if (responseBody.length == 2) {
      return <Book>[];
    }

    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Book>((json) => Book.fromJson(json)).toList();
  }
}
