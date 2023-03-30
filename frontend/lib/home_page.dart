import 'package:flutter/material.dart';
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
                    decoration: BoxDecoration(color: secundaryColor),
                    child: const Center(child: Text("Resoconto finanziario")),
                  ),
                ],
              ),
            ),
            SizedBox(
              width: 500,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    width: 200,
                    height: 200,
                    decoration: BoxDecoration(color: secundaryColor),
                    child: const Center(child: Text("Magazzino")),
                  )
                ],
              ),
            ),
          ],
        ));
  }
}

class IdForm extends StatefulWidget {
  const IdForm({super.key});

  @override
  State<IdForm> createState() => _IdFormState();
}

class _IdFormState extends State<IdForm> {
  final controller = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Inserisci qua il codice fiscale",
          style: titleTextStyle,
        ),
        TextField(
          controller: controller,
          autofocus: true,
          cursorColor: secundaryColor,
          decoration: InputDecoration(
              icon: Icon(
            Icons.person,
            color: primaryColor,
            size: 100,
          )),
          style: const TextStyle(
              fontSize: 30, color: Color.fromRGBO(133, 148, 74, 1)),
        ),
        TextButton(
          style: ButtonStyle(
              foregroundColor: MaterialStateProperty.all<Color>(secundaryColor),
              backgroundColor: MaterialStateProperty.all(primaryColor),
              textStyle: MaterialStateProperty.all(titleTextStyle)),
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                  builder: (context) => CaricoPage(controller.text)),
            );
          },
          child: const Text('Cerca'),
        )
      ],
    ));
  }
}
