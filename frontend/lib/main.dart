import 'package:flutter/material.dart';
import 'package:shop/home_page.dart';
import 'package:shop/variables.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: primaryColor),
      home: HomePage(),
    );
  }
}
