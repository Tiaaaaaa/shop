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

    foreach ($_POST as $key => $value) {
      echo $key . "  " . $_POST[$key] . " </br> ";
    }

    include_once './assets/connection.php';

    $cliente = $_POST["cliente"];
    $book = "";
    $select_soubject = "";


//  If a buy button has been pressed, the "buyer" field in respective line
//  will be updated NOT WORKING

    if (isset($_POST['key'])) {
      $book = $_POST['book'];

      $seller = substr($_POST["key"], 0, -1);
      $id     = substr($_POST["key"], -1);

      echo "seller: " . $seller . "<br>";
      echo "id: " . $id;

      if ($conn -> query("UPDATE trades
                             SET buyer  = '$cliente'
                           WHERE book   = '$book'
                             AND seller = '$seller'
                             AND id     = '(int)$id';")) {
        }
    }


//If there is a slected book in _POST[] the table will be filtered by that book
    if (isset($_POST['search'])) {
      if (isset($_POST['book'])) {

        $book = $_POST['book'];

        $storage = "SELECT *
                      FROM clients
                      JOIN trades
                        ON (clients.CF = trades.seller)
                      JOIN book
                        ON (trades.book = book.ISBN)
                     WHERE trades.buyer IS NULL
                       AND trades.seller != '$cliente'
                       AND book.ISBN = '$book';";

      } else if (isset($_POST['class'])) {

//Filter trougth class
        $class = $_POST['class'];

        $storage = "SELECT *
                      FROM clients
                      JOIN trades
                        ON (clients.CF = trades.seller)
                      JOIN book
                        ON (trades.book = book.ISBN)
                      JOIN classes
                        ON (book.ISBN = classes.book)
                     WHERE trades.buyer IS NULL
                       AND trades.seller != '$cliente'
                       AND classes.class = '$class';";

        //Filter trougth soubject
        $select_soubject = " "
      }

    } else {

      $storage = "SELECT *
                    FROM clients
                    JOIN trades
                      ON (clients.CF = trades.seller)
                    JOIN book
                      ON (trades.book = book.ISBN)
                   WHERE buyer IS NULL
                     AND trades.seller != '$cliente';";
    }

//Making the table used to show the books in storage
    if($result = $conn->query($storage)) {
    } else {
      printf("Error select trades: %s\n", $conn->error);
    }

    $show = "<table> <th colspan='9'> In magazzino </th>
            <tr><td>  Posizione
            </td><td> Materia
            </td><td> Titolo
            </td><td> Prezzo
            </td><td> Volume
            </td><td> Nuova Adozione
            </td><td> Da comprare
            </td><td> Consigliato
            </td><th> ACQUISTA </th></tr>";

    while ($row = mysqli_fetch_array($result)) {
      $form_id = "'buy'";
      $show .= "<tr><td>" . $row['position']                .
              "</td><td>" . $row['soubject']                .
              "</td><td>" . $row['title']                   .
              "</td><td>" . ((float)$row["price"] * 60)/100 .
              "</td><td>" . $row['volume']                  .
              "</td><td>" . $row['newAdoption']             .
              "</td><td>" . $row['toBuy']                   .
              "</td><td>" . $row['advised']                 .
              '</td><td>
                <form id="buy" method="post">
                  <input type="hidden" name="cliente" value="' . $cliente .'">
                  <input type="hidden" name="book" value="' . $book .'">
                  <input type="hidden" name="key" value="' . $row['seller'] . $row['id'] . '">
                  <div onclick="document.getElementById(' . $form_id .').submit()"> Acquista </div>
                </form>
              </tr>';
    }

    ?>

    <h1 class="title" align="center">COMPRA</h1>

<!-- BACK -->
    <form id="back" method="post" action="resoconto.php">
      <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
      <div class="arrow" onclick="document.getElementById('back').submit();"></div>
    </form>

    <div class="filter">
      <form method="post">
        <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
        Libro: <input type="text" name="book" value="">
        <input type="submit" name="search" value="Cerca">
      </form>

      <form method="post">
        <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
        <input type="hidden" name="class" value="<?php echo $class ?>">
        <fieldset>
          <legend>Classe: </legend>
          <select name="class" >
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
          <input type="submit" name="search" value="Cerca">
          <?php echo $select_soubject?>
        </fieldset>
      </form>

      <form method="post">
        <input type="hidden" name="cliente" value="<?php echo $cliente; ?>">
        <input type="submit" value="Ripristina ricerca">
      </form>
    </div>

    <div class="show_storage">

      <?php echo $show ?>

    </div>

  </body>
</html>
