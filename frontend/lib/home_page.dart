import 'package:flutter/material.dart';
import 'package:shop/resoconto_cliente.dart';
import 'package:shop/variables.dart';


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
        body: Row(
          children: [
            SizedBox(
              width: 500,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    width: 200,
                    height: 200,
                    decoration: BoxDecoration(color: secondaryColor),
                    child: const Center(child: Text("Resoconto finanziario")),
                  ),
                ],
              ),
            ),
            Expanded(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Inserisci qua il codice fiscale",
                  style: titleTextStyle,
                ),
                TextField(
                  textAlign: TextAlign.center,
                  autofocus: true,
                  cursorColor: secondaryColor,
                  decoration: InputDecoration(
                    suffixIcon: Icon(
                      Icons.person,
                      color: primaryColor,
                      size: 30,
                    ),
                  ),
                  style: const TextStyle(
                      fontSize: 30, color: Color.fromRGBO(133, 148, 74, 1)),
                  onSubmitted: (value) => {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                          builder: (context) =>
                              GuestReportPage(value.toUpperCase())),
                    )
                  },
                ),
              ],
            )),
            SizedBox(
              width: 500,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    width: 200,
                    height: 200,
                    decoration: BoxDecoration(color: secondaryColor),
                    child: const Center(child: Text("Magazzino")),
                  )
                ],
              ),
            ),
          ],
        ));
  }
}
