<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>

  <style media="screen">

    table,td,th{

      border: 1px solid black;

    }

  </style>

  <?php

    $client = $_POST["buy"];

    $servername = "localhost";
    $username = "root";
    $dbname = "shop";

    $sql = "SELECT *";

    $conn = new mysqli($servername, $username, "raspuino", $dbname);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $bought = $conn->query($sql);

    if (!$bought) {
      printf("Error: %s\n", mysqli_error($conn));
      exit();
    }

    $string = "<table> <th colspan='6'>" . $client . "</th>";

    while ($row = mysqli_fetch_array($bought, MYSQLI_ASSOC)) {
      $string .= "<tr>  <td> " . $row['soubject'] .
                 "</td> <td> " . $row['ISBN'] .
                 "</td> <td colspan='4'> " . $row['title'] . "</tr>" . "<tr>" .
                 "</td> <td> " . $row['volume'] .
                 "</td> <td> " . $row['publisher'] .
                 "</td> <td> " . $row['price'] .
                 "</td> <td> " . $row['newAdoption'] .
                 "</td> <td> " . $row['toBuy'] .
                 "</td> <td> " . $row['advised'] . "</td> </tr>";
    }

    $string .= "</table>";

    echo $string;

  ?>



</body>
</html>
