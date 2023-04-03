import 'package:flutter/material.dart';
import 'package:shop/footer.dart';
import 'package:shop/variables.dart';

class CaricoPage extends StatelessWidget {
  CaricoPage(this.guest, {super.key});

  String guest;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          backgroundColor: primaryColor,
          centerTitle: true,
          title: Text(
            "Carico di $guest",
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
          child: CustomScrollView(
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
              )
            ],
          ),
        ),
      ]),
    );
  }
}
