<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="./assets/stylesheets/resoconto.css">

</head>
<body>

  <?php
    include_once './assets/connection.php';

    $cliente = $_POST["cliente"];


    //-----------SELL-------------------
    $sql_to_sell= "SELECT *
                     FROM trades t
                     JOIN book b
                       ON (t.book = b.ISBN)
                    WHERE seller like '$cliente'; ";

    $result_to_sell = $conn->query($sql_to_sell);

    $to_sell = "<table>";

    $gain = 0;
    while ($row = mysqli_fetch_array($result_to_sell)) {
      $to_sell .= "<tr><td>" . $row['soubject'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". ((float)$row["price"] * 50)/100 . "</tr>";
      $gain += ((float)$row["price"] * 50)/100;
    }

    $to_sell .= "</table>";

    //------------BUY---------------

    $sql_to_buy= "SELECT *
                    FROM trades t
                    JOIN book b
                      ON (t.book = b.ISBN)
                   WHERE buyer like '$cliente'; ";

    $result_to_buy = $conn->query($sql_to_buy);

    $to_buy = "<table>";

      $price = 0;

      while ($row = mysqli_fetch_array($result_to_buy)) {
        $to_buy .= "<tr><td>" . $row['soubject'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". ((float)$row["price"] * 60)/100 . "</tr>";
        $price += ((float)$row["price"] * 60)/100;
      }

      $to_buy .= "</table>";

      ?>

      <?php echo "<h1 align='center' id='title'>" . $cliente . "</h1>"  ?>

      <div class="arrow" onclick="window.location.href = './index.html';"></div>

      <div id="sell">

        <h1>In vendita</h1>

        <div class="lua">
          <?php echo $to_sell ?>
          <div class="coln">
            <p align="center">Possibile guadagno: <?php echo $gain ?></p>
            <form action="sell.php" method="post">
              <input type="submit" class="button" name="cliente" onclick="refe" value="<?php echo $cliente ?>"/>
            </form>
          </div>
        </div>

      </div>

      <hr>

      <div class="buy">

        <h1>In acquisto</h1>
        <div class="lua">
          <?php echo $to_buy ?>
          <div class="coln">
            <p align="center">Costo carrello: <?php echo $price ?> </p>
          </div>
        </div>

        <script type="text/javascript">



        </script>

      </div>
    </body>
    </html>
