<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Comprare</title>
  <link rel="stylesheet" href="./assets/stylesheets/buy.css">
  <link rel="stylesheet" href="./assets/stylesheets/general.css">
</head>
  <body>

    <?php

    foreach ($_POST as $key => $value) {
      echo $key . "  " . $value . " </br> ";
    }

    include_once './assets/connection.php';

    $client = $_POST["client"];
    $book = "";
    $select_soubject = "";


//  If a buy button has been pressed, the "buyer" field in respective line
//  will be updated

    if (isset($_POST['key'])) {
      $book = $_POST['book'];

      $seller = substr($_POST["key"], 0, -1);
      $id     = substr($_POST["key"], -1);

      echo "seller: " . $seller . "<br>";
      echo "id: " . $id;

      $sql_to_find_gain = "SELECT price
                             FROM book
                            WHERE ISBN = '$book';";

      $sql_gain = $conn -> query($sql_to_find_gain);

      $gain = ((int)(mysqli_fetch_array($sql_gain)) * 10)/100;

      $sql_to_buy = "UPDATE trades
                        SET buyer  = '$client', gain = '$gain'
                      WHERE book   = '$book'
                        AND seller = '$seller'
                        AND id     = '$id';";

      if ($conn -> query($sql_to_buy)) {

      }else {

      }
    }


//If there is a slected book in $_POST[] the table will be filtered by that book
    if (isset($_POST['search'])) {
      if (isset($_POST['book'])) {

        $book = $_POST['book'];

        $sql_in_adding = "SELECT *
                            FROM clients
                            JOIN trades
                              ON (clients.email = trades.seller)
                            JOIN book
                              ON (trades.book = book.ISBN)
                           WHERE trades.buyer IS NULL
                             AND trades.seller != '$client'
                             AND book.ISBN = '$book';";

      } else if (isset($_POST['class']) and $_POST['class'] != "Seleziona") {

//Filter trougth class
        $class = $_POST['class'];

        $sql_in_adding = "SELECT *
                            FROM clients
                            JOIN trades
                              ON (clients.email = trades.seller)
                            JOIN book
                              ON (trades.book = book.ISBN)
                            JOIN classes
                              ON (book.ISBN = classes.book)
                           WHERE trades.buyer IS NULL
                             AND trades.seller != '$client'
                             AND classes.class = '$class';";

         //Filter trougth soubject and class
         if (isset($_POST['soubject']) and $_POST['soubject'] != "") {
           $soubject = "%" . $_POST['soubject'] . "%";
           $sql_in_adding = "SELECT *
                               FROM clients
                               JOIN trades
                                 ON (clients.email = trades.seller)
                               JOIN book
                                 ON (trades.book = book.ISBN)
                               JOIN classes
                                 ON (book.ISBN = classes.book)
                              WHERE trades.buyer IS NULL
                                AND trades.seller != '$client'
                                AND classes.class = '$class'
                                AND book.soubject LIKE '$soubject';";
         }

      }

    } else {

      $sql_in_adding = "SELECT *
                          FROM clients
                          JOIN trades
                            ON (clients.email = trades.seller)
                          JOIN book
                            ON (trades.book = book.ISBN)
                         WHERE buyer IS NULL
                           AND trades.seller != '$client';";
    }

    $sql_to_storage= "SELECT *
                        FROM clients
                        JOIN trades
                          ON (clients.email = trades.seller)
                        JOIN book
                          ON (trades.book = book.ISBN)
                       WHERE buyer IS NULL; ";


    if($storage_result = $conn->query($sql_to_storage)) {
    } else {
      printf("Error select storage: %s\n", $conn->error);
    }

    $in_storage = "<table> <th colspan='9'> In Magazzino </th>
            <tr><td>  Posizione
            </td><td> Materia
            </td><td> Titolo
            </td><td> Prezzo
            </td><td> Volume
            </td><td> Nuova Adozione
            </td><td> Da comprare
            </td><td> Consigliato
            </td><th> ACQUISTA </th></tr>";

    while ($row = mysqli_fetch_array($storage_result)) {

      echo $row["price"] / 2;

      $form_id = "'buy" . $row['ISBN'] . $row['seller'] . $row['id'] . "'";

      $in_storage.= "<tr><td>"  . $row['position']                    .
                    "</td><td>" . $row['soubject']                    .
                    "</td><td>" . $row['title']                       .
                    "</td><td>" . ((float)$row["price"] * $value)/100 .
                    "</td><td>" . $row['volume']                      .
                    "</td><td>" . $row['newAdoption']                 .
                    "</td><td>" . $row['toBuy']                       .
                    "</td><td>" . $row['advised']                     .
                    '</td><td>
                      <form id='. $form_id .' method="post">
                        <input type="hidden" name="client" value="' . $client .'">
                        <input type="hidden" name="book" value="' . $row['ISBN'] .'">
                        <input type="hidden" name="seller" value="' . $row['seller'] . '">
                        <input type="hidden" name="id" value="'. $row['id'] .'">
                        <div class="buy" onclick="document.getElementById(' . $form_id .').submit()"> Acquista </div>
                      </form>
                    </tr>';
     }

     $in_storage .= "</table>";


//Making the table used to show the books in storage
    if($adding_result = $conn->query($sql_in_adding)) {
    } else {
      printf("Error select trades: %s\n", $conn->error);
    }

    $in_adding = "<table> <th colspan='8'> In Aggiunta </th>
            <tr><td>  Posizione
            </td><td> Materia
            </td><td> Titolo
            </td><td> Prezzo
            </td><td> Volume
            </td><td> Nuova Adozione
            </td><td> Da comprare
            </td><td> Consigliato</tr>";

    while ($row = mysqli_fetch_array($adding_result)) {

      echo $row['usury'];

      if ($row['usury'] == 1) {
        $value = 50;
      }else{
        $value = 60;
      }

      $in_adding .= "<tr><td>"  . $row['position']                    .
                    "</td><td>" . $row['soubject']                    .
                    "</td><td>" . $row['title']                       .
                    "</td><td>" . ((float)$row["price"] * $value)/100 .
                    "</td><td>" . $row['volume']                      .
                    "</td><td>" . $row['newAdoption']                 .
                    "</td><td>" . $row['toBuy']                       .
                    "</td><td>" . $row['advised'];
    }

    $in_storage .= "</table>";


    ?>

    <h1 class="title" align="center">COMPRA</h1>

<!-- BACK -->
    <form id="back" method="post" action="resoconto.php">
      <input type="hidden" name="client" value="<?php echo $client; ?>">
      <div class="arrow" onclick="document.getElementById('back').submit();"></div>
    </form>

    <div class="filter">
      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        Libro: <input type="text" name="book" value="">
        <input type="submit" name="search" value="Cerca">
      </form>

      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        <input type="hidden" name="class" value="<?php echo $class ?>">
        <fieldset>
          <legend>Classe: </legend>
          <select name="class">
            <option value="Seleziona  ">Seleziona</option>
            <option value="1ITIS">1ITIS</option>
            <option value="2ITIS">2ITIS</option>
            <option value="2ITIS Chimica">2ITIS Chimica</option>
            <option value="3ITIS Automazione">3ITIS Automazione</option>
            <option value="4ITIS Automazione">4ITIS Automazione</option>
            <option value="3ITIS Chimca">3ITIS Chimca</option>
            <option value="4ITIS Chimica">4ITIS Chimica</option>
            <option value="5ITIS Chimica">5ITIS Chimica</option>
            <option value="3ITIS Informatica">3ITIS Informatica</option>
            <option value="4ITIS Informatica">4ITIS Informatica</option>
            <option value="5ITIS Informatica">5ITIS Informatica</option>
            <option value="3ITIS Meccainca">3ITIS Meccainca</option>
            <option value="4ITIS Meccanica">4ITIS Meccanica</option>
            <option value="5ITIS Meccanica">5ITIS Meccanica</option>
            <option value="3ITIS Serale Meccanica">3ITI SSerale Meccanica</option>
            <option value="4ITIS Serale Meccainca">4ITIS Meccanico Serale</option>
            <option value="1leFP op Elettrico">1leFP op Elettrico</option>
            <option value="2leFP op Elettrico">2leFP op Elettrico</option>
            <option value="3leFP op Elettrico">3leFP op Elettrico</option>
            <option value="1leFP op Meccanico">1leFP op Meccanico</option>
            <option value="2leFP op Meccanico">2leFP op Meccanico</option>
            <option value="3leFP op Meccanico">3leFP op Meccanico</option>
            <option value="1leFP op Meccanico Serale">1leFP op Meccanico Serale</option>
            <option value="2leFP op Meccanico Serale">2leFP op Meccanico Serale</option>
            <option value="3leFP op Meccanico Serale">3leFP op Meccanico Serale</option>
          </select>
          <input type='text' name='soubject'>
          <input type="submit" name="search" value="Cerca">
        </fieldset>
      </form>

      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        <input type="submit" value="Ripristina ricerca">
      </form>
    </div>


    <div class="show_storage">
      <?php echo $in_storage ?>

    </div>

    <hr size="8px" color="red" style="width:100vw;'">
    <hr size="8px" color="red" style="width:100vw;'">

    <div class="adding">

      <?php echo $in_adding ?>

    </div>

  </body>
</html>
