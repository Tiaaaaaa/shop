import 'package:flutter/material.dart';
import 'package:shop/variables.dart';

class CaricoPage extends StatelessWidget {
  const CaricoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            backgroundColor: primaryColor,
            centerTitle: true,
            title: Text(
              "Carico",
              style: defaultTextStyle,
            )),
        body: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            padding: EdgeInsets.only(top: 100, bottom: 100, left: 50),
            width: 400,
            decoration: BoxDecoration(
                border: Border(
                    right: BorderSide(color: secundaryColor, width: 7),
                    bottom: BorderSide(color: secundaryColor, width: 7))),
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
            ),
          ),
          Expanded(
            child: CustomScrollView(
              slivers: [
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
          ),
          Container(
            width: 400,
            decoration: BoxDecoration(
                border:
                    Border(left: BorderSide(color: secundaryColor, width: 10))),
            child: CustomScrollView(
              slivers: [
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
        ]));
  }
}
