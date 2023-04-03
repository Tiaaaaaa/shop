// ignore_for_file: must_be_immutable

import 'package:flutter/material.dart';
import 'package:shop/scarico_page.dart';
import 'package:shop/variables.dart';

import 'carico_page.dart';

class GuestReportPage extends StatelessWidget {
  GuestReportPage(this.guest, {super.key});

  String guest;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Resoconto di $guest"),
        backgroundColor: secundaryColor,
      ),
      body: Row(
        children: [
          Expanded(
              child: Container(
                  decoration: BoxDecoration(
                      border: Border(
                          right: BorderSide(color: secundaryColor, width: 10))),
                  child: CustomScrollView(
                    slivers: [
                      SliverAppBar(
                          title: Row(
                            children: const [
                              Text("Aquistati  "),
                              Icon(
                                Icons.arrow_upward_rounded,
                                color: Colors.white,
                                size: 25,
                              )
                            ],
                          ),
                          pinned: true,
                          backgroundColor: secundaryColor,
                          automaticallyImplyLeading: false),
                      SliverAppBar(
                        centerTitle: true,
                        title: TextButton(
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
                        automaticallyImplyLeading: false,
                        backgroundColor: Colors.white,
                      ),
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
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: const [
                                  Text("titolo"),
                                  Text("materia"),
                                  Text("prezzo")
                                ],
                              ));
                        }, childCount: 20),
                      )
                    ],
                  ))),
          Expanded(
              child: CustomScrollView(
            slivers: [
              SliverAppBar(
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
                  pinned: true,
                  backgroundColor: secundaryColor,
                  automaticallyImplyLeading: false),
              SliverAppBar(
                centerTitle: true,
                title: TextButton(
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
                automaticallyImplyLeading: false,
                backgroundColor: Colors.white,
              ),
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
          ))
        ],
      ),
    );
  }
}
