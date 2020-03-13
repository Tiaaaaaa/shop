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

    $storage = "SELECT *
                  FROM trades
                  JOIN book
                    ON (trades.book = book.ISBN)
                 WHERE buyer IS NULL;";

    if($result = $conn->query($storage)){
    } else {
      printf("Error select trades: %s\n", $conn->error);
    }

    $show = "<table> <th> Presenti </th>";

    while ($row = mysqli_fetch_array($result)) {
      $show .= "<tr><td>" . $row['soubject']                .
              "</td><td>" . $row['title']                   .
              "</td><td>" . ((float)$row["price"] * 60)/100 .
              "</td><td>" . $row['volume']                  .
              "</td><td>" . $row['newAdoption']             .
              "</td><td>" . $row['toBuy']                   .
              "</td><td>" . $row['advised']                 . "</tr>";
    }

    ?>

    <h1 class="title" align="center">COMPRA</h1>

    <form id="back" method="post" action="resoconto.php">
      <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
      <div class="arrow" onclick="document.getElementById('back').submit();"></div>
    </form>

    <div class="show_storage">

      <?php echo $show ?>

    </div>


    <form method="post">
      <input type="text" name="book" value="">
    </form>
  </body>
</html>
