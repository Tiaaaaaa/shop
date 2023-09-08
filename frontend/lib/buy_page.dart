import 'package:flutter/material.dart';
import 'package:shop/scarico_page.dart';
import 'package:shop/variables.dart';

import 'data_classes.dart';

import 'package:flutter_pdfview/flutter_pdfview.dart';

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
    );
  }
}

class Resume extends StatelessWidget {}

class DisplayReceipts extends StatefulWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: PDFView(
        filePath: "http://$host/",
      ),
    );
  }
}
