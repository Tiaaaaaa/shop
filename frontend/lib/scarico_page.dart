// ignore_for_file: must_be_immutable, prefer_final_fields, no_logic_in_create_state

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shop/resoconto_cliente.dart';
import 'package:shop/variables.dart';
import 'package:http/http.dart' as http;

import 'data_classes.dart';

List<Storage> cart = [];

class ScaricoPage extends StatelessWidget {
  ScaricoPage(this.guest, {super.key});

  String guest;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          leading: TextButton(
              onPressed: () {
                while (cart.isNotEmpty) {
                  cart[0].unstash();
                  cart.removeAt(0);
                }

                Navigator.of(context).push(
                  MaterialPageRoute(
                      builder: (context) => GuestReportPage(guest)),
                );
              },
              child: const Icon(
                Icons.arrow_back_rounded,
                color: Colors.white,
              )),
          title: Text(
            "Pagina acquisti per $guest",
            style: defaultTextStyle,
          ),
          centerTitle: true,
          backgroundColor: primaryColor,
        ),
        body: Display(guest));
  }
}

class Display extends StatefulWidget {
  Display(this.guest, {super.key});

  String guest;

  @override
  State<Display> createState() {
    return _DisplayState(guest);
  }
}

class _DisplayState extends State<Display> {
  _DisplayState(this.guest);

  String guest;

  late Future<List<Storage>> _available = fetchFromStorage("", "", "", "");

  late FilerZone filters = FilerZone();

  @override
  Widget build(BuildContext context) {
    setState(() {});

    return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Container(
          width: 400,
          decoration: BoxDecoration(
              border: Border(
            right: BorderSide(color: secondaryColor, width: 7),
          )),
          child: Scaffold(
            appBar: AppBar(
              automaticallyImplyLeading: false,
              title: const Text(
                "Filtri ricerca",
              ),
              backgroundColor: secondaryColor,
              shadowColor: const Color(0x00000000),
            ),
            body: filters,
          )),
      Expanded(
          child: Column(children: [
        SizedBox(
            height: 55,
            child: AppBar(
              backgroundColor: secondaryColor,
              automaticallyImplyLeading: false,
              title: const Row(
                children: [
                  Text("Disponibili   "),
                  Icon(
                    Icons.warehouse_rounded,
                    color: Colors.white,
                    size: 25,
                  )
                ],
              ),
            )),
        Expanded(
            child: FutureBuilder<List<Storage>>(
                future: _available,
                builder: (_, snapshot) {
                  switch (snapshot.connectionState) {
                    case ConnectionState.none:
                      return const Text('Connessione non disponibile');
                    case ConnectionState.waiting:
                      return const Text('loading...');
                    default:
                      return GridView.builder(
                        itemCount: snapshot.data!.length,
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3,
                        ),
                        itemBuilder: (_, int index) {
                          return Column(children: [
                            Expanded(
                              child: snapshot.data![index].book.display(),
                            ),
                            InkWell(
                              onTap: () {
                                addToCart(snapshot.data![index]);
                              },
                              child: Container(
                                decoration: BoxDecoration(
                                    borderRadius: const BorderRadius.all(
                                        Radius.circular(3)),
                                    border: Border.all(
                                        color: primaryColor, width: 5),
                                    color: secondaryColor),
                                child: const Text("aggiungi al carrello"),
                              ),
                            )
                          ]);
                        },
                      );
                  }
                }))
      ])),
      Container(
        width: 600,
        decoration: BoxDecoration(
            border: Border(left: BorderSide(color: secondaryColor, width: 8))),
        child: Scaffold(
            appBar: AppBar(
                title: const Row(
                  children: [
                    Text("Carrello "),
                    Icon(
                      Icons.shopping_cart_outlined,
                      color: Colors.white,
                    )
                  ],
                ),
                backgroundColor: secondaryColor,
                automaticallyImplyLeading: false),
            body: SizedBox(
                height: 300,
                child: ListView.builder(
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
                            Text(cart[index].book.title.toString()),
                            Text(cart[index].book.subject.toString()),
                            Text(cart[index].book.price.toString()),
                            TextButton(
                                onPressed: () {
                                  removeFromCart(cart[index]);
                                },
                                child: const Text("Rimuovi"))
                          ],
                        ));
                  },
                  itemCount: cart.length,
                ))),
      )
    ]);
  }

  void addToCart(Storage item) {
    setState(() {
      item.stash();
      cart.add(item);
      _available = fetchFromStorage("", "", "", "");
    });
  }

  void removeFromCart(Storage item) {
    setState(() {
      item.unstash();
      cart.remove(item);
      _available = fetchFromStorage("", "", "", "");
    });
  }

  Future<List<Storage>> fetchFromStorage(
      String section, String title, String isbn, String subject) async {
    try {
      var url = Uri.http(host, "/storage/search-in-storage", {
        "section": section,
        "title": title,
        "isbn": isbn,
        "subject": subject,
        "inSale": "true",
        "seller": guest
      });

      var res = await http.get(url);

      return parseStorage(res.body);
    } catch (e) {
      print(e.toString());
      return [];
    }
  }

  List<Storage> parseStorage(String responseBody) {
    if (responseBody.length == 2) {
      return <Storage>[];
    }

    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Storage>((json) => Storage.fromJson(json)).toList();
  }
}

class FilerZone extends StatefulWidget {
  const FilerZone({super.key});

  @override
  State<StatefulWidget> createState() {
    return _FilterZoneState();
  }
}

class _FilterZoneState extends State<FilerZone> {
  String grade = "";
  String subject = "";
  String title = "";
  String isbn = "";

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        const DropdownButtonMenu(),
        Text(
          "Titolo",
          style: defaultTextStyle,
        ),
        TextField(
          decoration: InputDecoration(
              border: UnderlineInputBorder(
                  borderSide: BorderSide(color: secondaryColor, width: 2))),
          textAlign: TextAlign.center,
          cursorColor: secondaryColor,
        ),
        Text(
          "ISBN",
          style: defaultTextStyle,
        ),
        TextField(
          decoration: InputDecoration(
              border: UnderlineInputBorder(
                  borderSide: BorderSide(color: secondaryColor, width: 2))),
          textAlign: TextAlign.center,
          cursorColor: secondaryColor,
        ),
        Text(
          "Materia",
          style: defaultTextStyle,
        ),
        TextField(
          decoration: InputDecoration(
              border: UnderlineInputBorder(
                  borderSide: BorderSide(color: secondaryColor, width: 2))),
          textAlign: TextAlign.center,
          cursorColor: secondaryColor,
        ),
      ],
    );
  }
}

const List<String> list = <String>['Classe', 'Two', 'Three', 'Four'];

class DropdownButtonMenu extends StatefulWidget {
  const DropdownButtonMenu({super.key});

  @override
  State<DropdownButtonMenu> createState() => _DropdownButtonMenuState();
}

class _DropdownButtonMenuState extends State<DropdownButtonMenu> {
  String dropdownValue = list.first;

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      value: dropdownValue,
      icon: const Icon(Icons.arrow_downward),
      elevation: 16,
      style: defaultTextStyle,
      onChanged: (String? value) {
        // This is called when the user selects an item.
        setState(() {
          dropdownValue = value!;
        });
      },
      items: list.map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(value),
        );
      }).toList(),
    );
  }
}
