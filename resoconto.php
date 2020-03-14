<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="./assets/stylesheets/general.css">
  <link rel="stylesheet" href="./assets/stylesheets/resoconto.css">
</head>
<body>

  <?php
    include_once './assets/connection.php';
    include("./assets/cf.class.php");

    $cliente = $_POST["cliente"];

    $cf = new CodiceFiscale();
    $cf -> SetCF($cliente);

    if (!$cf -> GetCodiceValido()) {

    }
//-----Inserting a new client--------

    $sql_to_count_clients = "SELECT *
                               FROM clients";

    $result_to_count = $conn -> query($sql_to_count_clients);

    $position = mysqli_num_rows($result_to_count) + 1;

    $insert_new_client = "INSERT INTO clients
                          VALUES ('" . $cliente . "', " . $position .")";

    if ($result_insert = $conn -> query($insert_new_client)) {
      echo "<p align='center'> Nuovo cliente </p>";
    } else {
      echo "<p align='center'> cliente già presente </p>";
    }

    //-----------SELL-------------------
    $sql_to_sell= "SELECT *
                     FROM trades
                     JOIN book
                       ON (trades.book = book.ISBN)
                    WHERE seller = '$cliente'; ";

    $result_to_sell = $conn->query($sql_to_sell);

    $to_sell = "<table>";

    $gain = 0;
    while ($row = mysqli_fetch_array($result_to_sell)) {
      $to_sell .= "<tr><td>"  . $row['soubject'] .
                  "</td><td>" . $row['title']    .
                  "</td><td>" . ((float)$row["price"] * 50)/100 . "</tr>";

      $gain += ((float)$row["price"] * 50)/100;
    }

    $to_sell .= "</table>";

    //------------BUY---------------

    $sql_to_buy= "SELECT *
                    FROM trades
                    JOIN book
                      ON (trades.book = book.ISBN)
                   WHERE buyer = '$cliente'; ";

    $result_to_buy = $conn->query($sql_to_buy);

    $to_buy = "<table>";

      $price = 0;

      while ($row = mysqli_fetch_array($result_to_buy)) {
        $to_buy .= "<tr><td>"  . $row['soubject'] .
                   "</td><td>" . $row['title']    .
                   "</td><td>" . ((float)$row["price"] * 60)/100 . "</tr>";

        $price += ((float)$row["price"] * 60)/100;
      }

      $to_buy .= "</table>";

      ?>

      <h1 align='center' class="title"> <?php echo $cliente ?> </h1>

<!-- BACK -->
      <div class="arrow" onclick="window.location.href = './index.html';"></div>

      <div id="sell">

        <p class="subtitle">In vendita</p>

        <div class="lua">
          <?php echo $to_sell ?>
          <div class="coln">
            <p align="center">Possibile guadagno: <?php echo $gain ?></p>
            <form action="sell.php" method="post">
              <input type="submit" class="button" name="cliente" value="<?php echo $cliente ?>"/>
            </form>
          </div>
        </div>

      </div>

      <hr>

      <div class="buy">
        <p class="subtitle">In acquisto</p>
        <div class="lua">
          <?php echo $to_buy ?>
          <div class="coln">
            <p align="center">Costo carrello: <?php echo $price ?> </p>
            <form action="buy.php" method="post">
              <input type="submit" class="button" name="cliente" value="<?php echo $cliente ?>"/>
            </form>
          </div>
        </div>

      </div>
    </body>
    </html>
