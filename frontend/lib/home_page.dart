import 'package:flutter/material.dart';
import 'package:shop/scarico_page.dart';
import 'package:shop/variables.dart';

import 'carico_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          "MercaLibro",
          style: defaultTextStyle,
        ),
        backgroundColor: primaryColor,
      ),
      body: Center(
          child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          InkWell(
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => const CaricoPage()),
                );
              },
              child: Container(
                decoration: BoxDecoration(
                    color: primaryColor,
                    border: Border.all(color: secundaryColor, width: 2)),
                alignment: Alignment.center,
                height: 200,
                width: 200,
                child: Text(
                  "Carico",
                  style: defaultTextStyle,
                ),
              )),
          InkWell(
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => const ScaricoPage()),
                );
              },
              child: Container(
                  decoration: BoxDecoration(
                      color: primaryColor,
                      border: Border.all(color: secundaryColor, width: 2)),
                  alignment: Alignment.center,
                  height: 200,
                  width: 200,
                  child: Text("Scarico", style: defaultTextStyle)))
        ],
      )),
    );
  }
}
