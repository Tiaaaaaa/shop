<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Vendita</title>
  <link rel="stylesheet" href="./sell.css">
  <link rel="stylesheet" href="../stylesheets/general.css">
</head>
<body>

  <?php

  include_once '../assets/connection.php';

  foreach ($_POST as $key => $value) {
    echo $key . "  " . $value . "<br>";
  }

  //Obtaining all POST infomations---
  $client = $_POST["client"];
  if (isset($_POST["gain"])) {
    $gain = $_POST["gain"];
  }else{
    $gain = 0.0;
  }

  if (isset($_POST["book"])) {
    $book = $_POST["book"];
  }

  if (isset($_POST["price"])) {
      $price = (float)$_POST["price"];
  }
  
//Setting the state
//(true means is shit)

if (isset($_POST["state"])) {
    $state = "TRUE";
    $value = 40;
  } else {
    $state = "FALSE";
    $value = 50;
  }

//-----------------------------------------

  $current = "Inserisci un libro!";

  if (isset($book)) {

    //give a position to the seller
    $sql_to_count_clients = "SELECT *
                               FROM clients";

    $position = mysqli_num_rows($result_to_count = $conn->query($sql_to_count_clients)) + 1 ;

    $insert_new_client = "INSERT INTO clients
                               VALUES ('" . $client . "', " . $position .")";

    if ($result_insert = $conn -> query($insert_new_client)) {
      echo "<p align='rigth'> Nuovo cliente! Pos: $position </p>";
    } else {

      if($sql_to_position = $conn -> query("SELECT position FROM clients WHERE CF = '$client'")){
        $position = mysqli_fetch_array($sql_to_position)["position"];
        echo "<p class='subtitle' align='center'>Pos: ". $position ." </p>";
      }
    }
    if ($selling = $conn->query("SELECT *
                                   FROM trades
                                  WHERE seller = '$client'
                                    AND book   = '$book';")) {

      }else {
        printf("Error select trades: %s\n", $conn->error);
      }

      //Defining trade index
      //(if a delear wants to sell more than one egual books the index will be incremented)
      $id = mysqli_num_rows($selling) + 1;

      //Setting the state
      //(true means is shit)

      //Doing the insert
      if ($insert = $conn->query("INSERT INTO trades
                                  VALUES (" . $id . ", '" . $_POST["book"] . "', '" . $client . "', NULL, $state, $price);")) {

        } else {
          printf("<p class='error'>Libro non presente </p>");
        }

        if(!$books = $conn ->query("SELECT *
                                      FROM book
                                     WHERE ISBN = '$book'")){
          }

          //Show the potential gain of the customer
          $row = $books -> fetch_assoc();
          $gain += ((float)$row["price"] * $value)/100;
          //Show the new books inserted

          $title = $row['title'];
          $subject = $row['subject'];
          $price = ((float)$row["price"] * $value)/100 . "€";

          //Show together new and old books stored
          if ($old = $conn ->query("SELECT *
                                      FROM trades
                                      JOIN book
                                        ON (trades.book = book.ISBN)
                                     WHERE seller = '$client'
                                  ORDER BY subject ")) {
          }else {
            printf("Error select all: %s\n", $conn->error);
          }

          $stored = "<table>
                    <tr align='center'><b><td> Materia </td><td> Titolo </td><td> Prezzo di vendita</td><td> Volume </td></b></tr>";

          while ($row = mysqli_fetch_array($old)) {
            if ($row["state"] == 1) {
              $price = ((float)$row["price"] * 40)/100;
            } else {
              $price = ((float)$row["price"] * 50)/100;
            }
              $stored .= "<tr><td>"  . $row['subject'] .
                         "</td><td>" . $row['title']   .
                         "</td><td>" . $price          .
                         "</td><td>" . $row['volume']  . "</tr>";
          }

        ?>

          <h1 class="title" align="center">VENDI</h1>

<!-- BACK -->
            <form id="back" method="post" action="../resoconto/resoconto.php">
              <input type="hidden" name="client" value="<?php echo $client; ?>">
              <div class="arrow" onclick="document.getElementById('back').submit();"></div>
            </form>

          <div class="flex">

            <b>Libro:</b>
            <form method="post">
              <input type="hidden" name="client" value="<?php echo $client; ?>">
              <input type="hidden" name="gain" value="<?php echo $gain; ?>">
              <input type="hidden" name="price" value="<?php echo $price; ?>">
              <input name="book" value="" autofocus><br>
              Usurato?: <input type="radio" name="state" value="true"><br>
            </form>
          </div>

          <div class="current">
            <p>titolo: <?php echo $title; ?> </p>
            <hr>
            <p> materia: <?php echo $subject; ?> </p>
            <hr>
            <p> prezzo di vendita: <?php echo $price; ?> </p>
          </div>

          <div class="show">
            <hr size="8px" color="red" style="width:98vw;'">
            <?php echo $stored ?>
          </div>

        </body>
        </html>
