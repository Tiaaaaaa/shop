<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

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


      if (isset($_POST["book"])) {

        echo $_POST["book"];

        if ($table = $conn->query("SELECT *
                                     FROM trades
                                    WHERE seller = '" . $cliente . "'
                                      AND book   = '" . $_POST["book"] . "';")) {

        }else {
          printf("Error select: %s\n", $conn->error);
        }

        if (isset($_POST["usury"])) {
          $usury = "TRUE";
        }else{
          $usury = "FALSE";
        }

        $id = mysqli_num_rows($table) + 1;

        if ($insert = $conn->query("INSERT INTO trades
                                    VALUES(". $id .",". $_POST['book'] . ",'" . $cliente . "', NULL," . $usury . ");")) {

        }else {
          printf("Error insert: %s\n", $conn->error);
        }

      }

     ?>

     <h1>VENDI FRA</h1>

    <form method="post">
      <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
       ISBN: <input name="book" value=""><br>
       Usurato?: <input type="radio" name="usury" value="true"><br>
      <input type="submit">
    </form>


  </body>
</html>
