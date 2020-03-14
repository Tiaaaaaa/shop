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

    include_once './assets/connection.php';

    $cliente = $_POST["cliente"];

    if (isset($_POST['book'])) {
      $book = $_POST['book'];

      $storage = "SELECT *
                    FROM clients
                    JOIN trades
                      ON (clients.CF = trades.seller)
                    JOIN book
                      ON (trades.book = book.ISBN)
                   WHERE trades.buyer IS NULL
                     AND book.ISBN = '" . $book  . "';";

    }else {

      $storage = "SELECT *
                    FROM clients
                    JOIN trades
                      ON (clients.CF = trades.seller)
                    JOIN book
                      ON (trades.book = book.ISBN)
                   WHERE buyer IS NULL;";

    }



    if($result = $conn->query($storage)){
    } else {
      printf("Error select trades: %s\n", $conn->error);
    }

    $show = "<table> <th colspan='8'> Presenti </th>
            <tr><td>  Posizione
            </td><td> Materia
            </td><td> Titolo
            </td><td> Prezzo
            </td><td> Volume
            </td><td> Nuova Adozione
            </td><td> Da comprare
            </td><td> Consigliato";

    while ($row = mysqli_fetch_array($result)) {
      $show .= "<tr><td>" . $row['position']                .
              "</td><td>" . $row['soubject']                .
              "</td><td>" . $row['title']                   .
              "</td><td>" . ((float)$row["price"] * 60)/100 .
              "</td><td>" . $row['volume']                  .
              "</td><td>" . $row['newAdoption']             .
              "</td><td>" . $row['toBuy']                   .
              "</td><td>" . $row['advised']                 . "</tr>";
    }

    ?>

    <h1 class="title" align="center">COMPRA</h1>

<!-- BACK -->
    <form id="back" method="post" action="resoconto.php">
      <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
      <div class="arrow" onclick="document.getElementById('back').submit();"></div>
    </form>

    <div class="show_storage">

      <?php echo $show ?>

    </div>


    <div class="filter">
      <form method="post">
        <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
        <input type="text" name="book" value="">
      </form>
    </div>

  </body>
</html>
