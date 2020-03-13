<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="./assets/stylesheets/sell.css">
</head>
<body>

  <?php

  include_once './assets/connection.php';

  $cliente = $_POST["cliente"];
  if (isset($_POST["gain"])) {
    $gain = $_POST["gain"];
  }else{
    $gain = 0.0;
  }

  if (isset($_POST["adding"])) {
    $adding = $_POST["adding"];
  }else {
    $adding = "<th colspan = 3> Aggiungendo </th>";
  }

  if (isset($_POST["book"])) {

    if ($selling = $conn->query("SELECT *
                                   FROM trades
                                  WHERE seller = '" . $cliente . "'
                                    AND book   = '" . $_POST["book"] . "';")) {

      } else {
        printf("Error select trades: %s\n", $conn->error);
      }

      $id = mysqli_num_rows($selling) + 1;

      if (isset($_POST["usury"])) {
        $usury = "TRUE";
      } else {
        $usury = "FALSE";
      }

      if ($insert = $conn->query("INSERT INTO trades
                                  VALUES (". $id .",". $_POST['book'] . ",'" . $cliente . "', NULL," . $usury . ");")) {

        } else {
          printf("Error insert: %s\n", $conn->error);
        }

        if($books = $conn ->query("SELECT *
                                     FROM book
                                    WHERE ISBN = '". $_POST["book"] ."'")){

        } else {
          printf("Error select books: %s\n", $conn->error);
        }

        //Show the potential gain of the customer
        $row = $books -> fetch_assoc();
        $gain += ((float)$row["price"] * 50)/100;

        //Show the new books inserted
        $adding .= "<tr><td>" . $row['soubject'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". ((float)$row["price"] * 50)/100 . "</tr>";

          //Show concurrently new and old books


        }
        if ($old = $conn ->query("SELECT *
          FROM trades
          JOIN book
          ON (trades.book = book.ISBN)
          WHERE seller = '". $cliente . "'")) {

          } else {
            printf("Error select all: %s\n", $conn->error);
          }
          $older = "<table>";

          while ($row = mysqli_fetch_array($old)) {
            $older .= "<tr><td>" . $row['soubject'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". ((float)$row["price"] * 50)/100 . "</tr>";
            }

            echo $older;
            $older = "</table>";

            ?>

            <h1 id="title" align="center">VENDI</h1>

            <div class="flex">
              <form method="post">
                <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
                <input type="hidden" name="gain" value="<?php echo $gain; ?>">
                <input type="hidden" name="adding" value="<?php echo $adding; ?>">
                ISBN: <input name="book" value="" autofocus><br>
                Usurato?: <input type="radio" name="usury" value="true"><br>
                <input type="submit">
              </form>

            </div>

            <div class="show">
              <table>
                <?php echo $adding ?>
                <th>Possibile guadagno: <?php echo $gain ?></th>
              </table>
              <?php echo $older ?>

            </div>

          </body>
          </html>
