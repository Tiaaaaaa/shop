import 'package:flutter/material.dart';
import 'package:shop/footer.dart';
import 'package:shop/variables.dart';

class ScaricoPage extends StatelessWidget {
  const ScaricoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Scarico",
          style: defaultTextStyle,
        ),
        centerTitle: true,
        backgroundColor: primaryColor,
      ),
      body: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 400,
              height: 300,
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
            Container(
                height: 500,
                width: 400,
                decoration: BoxDecoration(
                    border: Border(
                  right: BorderSide(color: secundaryColor, width: 7),
                )),
                child: Scaffold(
                  appBar: AppBar(
                    automaticallyImplyLeading: false,
                    title: const Text(
                      "Filtri ricerca",
                    ),
                    backgroundColor: secundaryColor,
                    shadowColor: const Color(0x00000000),
                  ),
                  body: const FilerZone(),
                ))
          ],
        ),
        Expanded(
          child: CustomScrollView(
            slivers: [
              SliverAppBar(
                  title: const Text("Acquistati / Nel carrello"),
                  pinned: true,
                  backgroundColor: secundaryColor,
                  automaticallyImplyLeading: false),
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
        Container(
          width: 400,
          decoration: BoxDecoration(
              border:
                  Border(left: BorderSide(color: secundaryColor, width: 8))),
          child: CustomScrollView(
            slivers: [
              SliverAppBar(
                  title: const Text("Disponibili"),
                  pinned: true,
                  backgroundColor: secundaryColor,
                  automaticallyImplyLeading: false),
              SliverList(
                delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  return Container(
                    height: 30,
                    margin: const EdgeInsets.only(bottom: 5),
                    decoration: BoxDecoration(
                      color: primaryColor,
                    ),
                    child: Center(child: Text(index.toString())),
                  );
                }, childCount: 20),
              )
            ],
          ),
        )
      ]),
      bottomNavigationBar: Footer(2),
    );
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

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: const [
        DropdownButtonMenu(),
        Text("Titolo"),
        TextField(),
        Text("ISBN"),
        TextField()
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
