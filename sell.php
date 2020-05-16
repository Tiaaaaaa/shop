<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Vendita</title>
  <link rel="stylesheet" href="./assets/stylesheets/sell.css">
  <link rel="stylesheet" href="./assets/stylesheets/general.css">
</head>
<body>

  <?php

  include_once './assets/connection.php';

  //Obtaining all POST infomations---
  $client = $_POST["client"];
  if (isset($_POST["gain"])) {
    $gain = $_POST["gain"];
  }else{
    $gain = 0.0;
  }

  if (isset($_POST["book"])) {
    $book = $_POST["book"];
  }else{}

  if (isset($_POST["adding"])) {
    $adding = $_POST["adding"];
  } else {
    $adding = "<tr><th colspan='4'> In aggiunta </th></tr>
               <tr align='center'><b><td> Materia </td><td> Titolo </td><td> Prezzo </td><td> Volume </td></b></tr>";
  }

  if (isset($_POST["usury"])) {
    $usury = "TRUE";
    $value = 40;
  } else {
    $usury = "FALSE";
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
      echo "<p align='center'> Nuovo cliente </p>";
    } else {
      echo "<p align='center'> Cliente già presente </p>";
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

      //Setting the usury
      //(true means it is like shit)

      //Doing the insert
      if ($insert = $conn->query("INSERT INTO trades
                                  VALUES (" . $id . ", '" . $_POST["book"] . "', '" . $client . "', NULL, $usury, 0);")) {

        } else {
          printf("Error insert: %s\n", $conn->error);
        }

        if(!$books = $conn ->query("SELECT *
                                      FROM book
                                     WHERE ISBN = '$book'")){
          }

          //Show the potential gain of the customer
          $row = $books -> fetch_assoc();
          $gain += ((float)$row["price"] * $value)/100;

          //Show the new books inserted
          $adding .= "<tr><td>"  . $row['soubject'] .
                     "</td><td>" . $row['title']    .
                     "</td><td>" . ((float)$row["price"] * $value)/100 .
                     "</td><td>" . $row['volume']   . "</tr>";

          $current =  $row['soubject'] . "       " .
                      $row['title']    . "       " .
                      ((float)$row["price"] * $value)/100;
          }

          //Show together new and old books stored
          if ($old = $conn ->query("SELECT *
                                      FROM trades
                                      JOIN book
                                        ON (trades.book = book.ISBN)
                                     WHERE seller = '". $client . "'")) {
          }else {
            printf("Error select all: %s\n", $conn->error);
          }

          $older = "<table>
                    <tr><th colspan='4'> Tutti </th></tr>
                    <tr align='center'><b><td> Materia </td><td> Titolo </td><td> Prezzo </td><td> Volume </td></b></tr>";

          while ($row = mysqli_fetch_array($old)) {
              $older .= "<tr><td>"  . $row['soubject'] .
                        "</td><td>" . $row['title']    .
                        "</td><td>" . ((float)$row["price"] * $value)/100 .
                        "</td><td>" . $row['volume']   . "</tr>";
          }


        ?>

          <h1 class="title" align="center">VENDI</h1>

<!-- BACK -->
            <form id="back" method="post" action="resoconto.php">
              <input type="hidden" name="client" value="<?php echo $client; ?>">
              <div class="arrow" onclick="document.getElementById('back').submit();"></div>
            </form>

          <div class="flex">

            <b>Libro:</b>
            <form method="post">
              <input type="hidden" name="client" value="<?php echo $client; ?>">
              <input type="hidden" name="gain" value="<?php echo $gain; ?>">
              <input type="hidden" name="adding" value="<?php echo $adding; ?>">
              <input name="book" value="" autofocus><br>
              Usurato?: <input type="radio" name="usury" value="true"><br>
            </form>
          </div>

          <div class="current">
            <p align="center">
              <?php echo $current; ?>
            </p>
          </div>

          <div class="show">
            <table>
              <?php echo $adding ?>
              <th colspan="4">Possibile guadagno: <?php echo $gain ?></th>
            </table>

            <hr size="8px" color="red" style="width:98vw;'">
            <hr size="8px" color="red" style="width:98vw;'">

            <?php echo $older ?>
          </div>

        </body>
        </html>
