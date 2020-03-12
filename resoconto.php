<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>

  <style media="screen">

    #ciao{

      height: 50vh;
      width: 100vw;

    }

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
                     FROM trades
                    WHERE seller like '$cliente'; ";

    $result_to_sell = $conn->query($sql_to_sell);
    printf("Select returned %d rows. </br> </br>", $result_to_sell->num_rows);

    $to_sell = "<table>";

    while ($row = mysqli_fetch_array($result_to_sell)) {
      $to_sell .= "<tr><td>" . $row['soubject'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". $row['price'] . "</tr>";
    }

    $to_sell .= "</table>";


//------------BUY---------------

    $sql_to_buy= "SELECT *
                    FROM trades
                   WHERE buyer like '$cliente'; ";

    $result_to_buy = $conn->query($sql_to_buy);
    printf("Select returned %d rows. </br> </br>", $result_to_buy->num_rows);

    $to_buy = "<table>";

    while ($row = mysqli_fetch_array($result_to_buy)) {
      $to_buy .= "<tr><td>" . $row['soubject'] .  ' </td> <td> ' . $row['title'] . "</td> <td> ". $row['price'] . "</tr>";
    }

    $to_buy .= "</table>";

  ?>

  <form class="" method="post">
    materia: <input id="client" onchange="change()" type="text" name="cliente" value="">
  </form>

  <div id="ciao">

    <?php echo "<h1 align='center'>" . $cliente . "</h1>"  ?>

    <h1>In vendita</h1>
    <?php echo $to_sell ?>
    <hr>

    <h1>In acquisto</h1>
    <?php echo $to_buy ?>
  </div>

  <script type="text/javascript">

    function change() {

      document.getElementById('sumbit').value = document.getElementById('client').value;
      document.innerHTML = document.getElementById('client').value;

    }

  </script>

</body>
</html>
