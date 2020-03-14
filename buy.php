<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="./assets/stylesheets/buy.css">
  <link rel="stylesheet" href="./assets/stylesheets/general.css">
</head>
  <body>

    <?php

    foreach ($_POST as $key => $value) {
      echo $key . "  " . $_POST[$key] . " </br> ";
    }

    include_once './assets/connection.php';

    $cliente = $_POST["cliente"];
    $book = "";

    if (isset($_POST['key'])) {
      $book = $_POST['book'];

      $seller = substr($_POST["key"], 0, -1);
      $id     = substr($_POST["key"], -1);

      echo "seller: " . $seller;
      echo "id: " . $id;

      if ($conn -> query("UPDATE trades
                             SET buyer  = '$cliente'
                           WHERE book   = '$book'
                             AND seller = '$seller'
                             AND id     = '(int)$id';")) {

        }

    }


    if (isset($_POST['search'])) {
      $book = $_POST['book'];

      $storage = "SELECT *
                    FROM clients
                    JOIN trades
                      ON (clients.CF = trades.seller)
                    JOIN book
                      ON (trades.book = book.ISBN)
                   WHERE trades.buyer IS NULL
                     AND trades.seller != '$cliente'
                     AND book.ISBN = '$book';";

    } else {

      $storage = "SELECT *
                    FROM clients
                    JOIN trades
                      ON (clients.CF = trades.seller)
                    JOIN book
                      ON (trades.book = book.ISBN)
                   WHERE buyer IS NULL
                   AND trades.seller != '$cliente';";

    }


    if($result = $conn->query($storage)) {
    } else {
      printf("Error select trades: %s\n", $conn->error);
    }

    $show = "<table> <th colspan='9'> In magazzino </th>
            <tr><td>  Posizione
            </td><td> Materia
            </td><td> Titolo
            </td><td> Prezzo
            </td><td> Volume
            </td><td> Nuova Adozione
            </td><td> Da comprare
            </td><td> Consigliato
            </td><th> ACQUISTA </th></tr>";

    while ($row = mysqli_fetch_array($result)) {
      $form_id = "'buy'";
      $show .= "<tr><td>" . $row['position']                .
              "</td><td>" . $row['soubject']                .
              "</td><td>" . $row['title']                   .
              "</td><td>" . ((float)$row["price"] * 60)/100 .
              "</td><td>" . $row['volume']                  .
              "</td><td>" . $row['newAdoption']             .
              "</td><td>" . $row['toBuy']                   .
              "</td><td>" . $row['advised']                 .
              '</td><td>
                <form id="buy" method="post">
                  <input type="hidden" name="cliente" value="' . $cliente .'">
                  <input type="hidden" name="book" value="' . $book .'">
                  <input type="hidden" name="key" value="' . $row['seller'] . $row['id'] . '">
                  <div onclick="document.getElementById(' . $form_id .').submit()"> Acquista </div>
                </form>
              </tr>';
    }

    ?>

    <h1 class="title" align="center">COMPRA</h1>

<!-- BACK -->
    <form id="back" method="post" action="resoconto.php">
      <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
      <div class="arrow" onclick="document.getElementById('back').submit();"></div>
    </form>

    <div class="filter">
      <form method="post">
        <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
        <input type="text" name="book" value="">
        <input type="hidden" name="search" value="true">
      </form>

      <form method="post">
        
      </form>
    </div>

    <div class="show_storage">

      <?php echo $show ?>

    </div>

  </body>
</html>
