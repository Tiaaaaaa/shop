<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>

  <style media="screen">

  td{
    border: 2px solid black;
  }

  </style>

  <?php

  $cliente = $_POST["cliente"];

  $servername = "localhost";
  $username = "root";
  $dbname = "shop";

  // Create connection
  $conn = new mysqli($servername, $username, "raspuino", $dbname);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }


  //-----------SELL-------------------
  $sql_to_sell= "SELECT *
                   FROM trades t
                   JOIN book b
                     ON (t.book = b.ISBN)
                  WHERE seller like '$cliente'; ";

  $result_to_sell = $conn->query($sql_to_sell);

  $to_sell = "<table>";

  while ($row = mysqli_fetch_array($result_to_sell)) {
    $to_sell .= "<tr><td>" . $row['ISBN'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". $row['price'] . "</tr>";
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

      while ($row = mysqli_fetch_array($result_to_buy)) {
        $to_buy .= "<tr><td>" . $row['soubject'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". $row['price'] . "</tr>";
      }

      $to_buy .= "</table>";

      ?>

        <div id="sell">

          <?php echo "<h1 align='center'>" . $cliente . "</h1>"  ?>

          <h1>In vendita</h1>
          <?php echo $to_sell ?>

          <form action="sell.php" method="post">
            <input type="submit" class="button" name="cliente" value="<?php echo $cliente ?>"/>
          </form>

        </div>

        <hr>

        <div class="buy">

          <h1>In acquisto</h1>
          <?php echo $to_buy ?>

        </div>
      </body>
      </html>
