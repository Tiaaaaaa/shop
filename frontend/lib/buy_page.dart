// ignore_for_file: must_be_immutable

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shop/scarico_page.dart';
import 'package:shop/variables.dart';
import 'package:http/http.dart' as http;

import 'data_classes.dart';

class BuyPage extends StatelessWidget {
  BuyPage(this.guest, this.cart, {super.key});
  String guest;
  List<Storage> cart;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        leading: TextButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => ScaricoPage(guest)),
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
      body: Center(
          child: Column(
        children: [
          Expanded(
            child: ListView.builder(
                itemBuilder: (content, index) {
                  return SizedBox(
                    child: Row(
                      children: [
                        Text(cart[index].book.title),
                        const Text("              "),
                        Text(cart[index].book.price.toString())
                      ],
                    ),
                  );
                },
                itemCount: cart.length),
          ),
          Container(
            height: 200,
            width: 100,
            decoration: BoxDecoration(
                border: Border.all(color: primaryColor, width: 3),
                borderRadius: const BorderRadius.all(Radius.circular(10))),
            child: Text(sumPricies().toString()),
          )
        ],
      )),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(color: primaryColor),
        height: 100,
        child: TextButton(
          child: Text("Acquista", style: titleTextStyle),
          onPressed: () {
            buy();
          },
        ),
      ),
    );
  }

  double sumPricies() {
    double total = 0;

    for (var element in cart) {
      total += element.book.price;
    }

    return total;
  }

  Future<http.Response> createAlbum(String title) {
    return http.post(
      Uri.parse('https://jsonplaceholder.typicode.com/albums'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'title': title,
      }),
    );
  }

  Future<http.Response> buy() async {
    List<int> idArray = [];

    for (var el in cart) {
      idArray.add(el.id);
    }

    String jsoinzedIds = jsonEncode(idArray);

    print(jsoinzedIds);

    return http.post(
      Uri.http(
        host,
        "/storage/buy",
      ),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{'buyer': guest, 'cart': jsoinzedIds}),
    );
  }
}
