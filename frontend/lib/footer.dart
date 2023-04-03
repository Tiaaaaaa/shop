import 'package:flutter/material.dart';
import 'package:shop/carico_page.dart';
import 'package:shop/home_page.dart';
import 'package:shop/scarico_page.dart';
import 'package:shop/variables.dart';

/*
  Classe che definisce il footer della pagina.
  L'attributo page indica la pagina attuale:
    - 0: Carico
    - 1: Home
    - 2: Scarico
*/
class Footer extends StatelessWidget {
  Footer(this.page, {super.key});

  /*
    Indicate the index of the current page, is necessary for removing the
    link and outline the icon
  */
  int page;

  @override
  Widget build(BuildContext context) {
    IconData caricoIcon = Icons.arrow_downward_sharp;
    IconData homeIcon = Icons.home;
    IconData scaricoIcon = Icons.arrow_upward_sharp;

    switch (page) {
      case 0:
        caricoIcon = Icons.arrow_circle_down;
        break;
      case 1:
        homeIcon = Icons.stop_circle_outlined;
        break;
      case 2:
        scaricoIcon = Icons.arrow_circle_up;
        break;
      default:
    }

    return Container(
        height: 100,
        color: primaryColor,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            InkWell(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => CaricoPage("ciao")),
                  );
                },
                child: Icon(
                  caricoIcon,
                  size: 40,
                )),
            InkWell(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => const HomePage()),
                  );
                },
                child: Icon(
                  homeIcon,
                  size: 40,
                )),
            InkWell(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                        builder: (context) => ScaricoPage("ciao")),
                  );
                },
                child: Icon(
                  scaricoIcon,
                  size: 40,
                )),
          ],
        ));
  }
}
