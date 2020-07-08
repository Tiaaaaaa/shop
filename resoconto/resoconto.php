<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Resoconto Persona</title>
  <link rel="stylesheet" href="../stylesheets/general.css">
  <link rel="stylesheet" href="./resoconto.css">
</head>
<body>

  <?php
    include_once '../assets/connection.php';

    $client = $_POST["client"];

    //-----------SELL------------------
    $sql_to_sell= "SELECT *
                     FROM trades
                     JOIN book
                       ON (trades.book = book.ISBN)
                    WHERE seller = '$client'; ";

    $result_to_sell = $conn->query($sql_to_sell);

    $to_sell = "<table>";

    $gain = 0;
    while ($row = mysqli_fetch_array($result_to_sell)) {

      if ($row['state'] == 1) {
        $price = ((float)$row["price"] * 40)/100;
      } else {
        $price = ((float)$row["price"] * 50)/100;
      }



      $to_sell .= "<tr><td>"  . $row['subject'] .
                  "</td><td>" . $row['title']    .
                  "</td><td>" . $price . "</tr>";

      $gain += $price;
    }

    $to_sell .= "</table>";

    //------------BUY------------------

    $sql_to_buy= "SELECT *
                    FROM trades
                    JOIN book
                      ON (trades.book = book.ISBN)
                   WHERE buyer = '$client'; ";

    $result_to_buy = $conn->query($sql_to_buy);

    $to_buy = "<table>";

    if ($row['state'] == 1) {
      $price = ((float)$row["price"] * 50)/100;
    } else {
      $price = ((float)$row["price"] * 60)/100;
    }

    $cart_price = 0;

      while ($row = mysqli_fetch_array($result_to_buy)) {
        $to_buy .= "<tr><td>"  . $row['subject'] .
                   "</td><td>" . $row['title']    .
                   "</td><td>" . $price . "</tr>";

        $cart_price += $price;
      }

      $to_buy .= "</table>";

      ?>

      <h1 align='center' class="title"> <?php echo $client ?> </h1>

<!-- BACK -->
      <div class="arrow" onclick="window.location.href = '../index.html';"></div>

      <div id="sell">

        <p class="subtitle">In vendita</p>

        <div class="lua">
          <?php echo $to_sell ?>
          <div class="coln">
            <p align="center">Possibile guadagno: <?php echo $gain . "€" ?></p>
            <form action="../sell/sell.php" method="post">
              <input type="submit" class="button"value="Vendi"/>
              <input type="hidden"name="client" value="<?php echo $client ?>"/>
            </form>
          </div>
        </div>

      </div>

      <hr>

      <div class="buy">
        <p class="subtitle">Acquistati</p>
        <div class="lua">
          <?php echo $to_buy ?>
          <div class="coln">
            <p align="center">Costo carrello: <?php echo $cart_price . "€"?> </p>
            <form action="../buy/buy.php" method="post">
              <input type="submit" class="button" value="Acquista"/>
              <input type="hidden"name="client" value="<?php echo $client ?>"/>
            </form>
          </div>
        </div>

      </div>
    </body>
    </html>
