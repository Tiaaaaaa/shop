<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Comprare</title>
  <link rel="stylesheet" href="./buy.css">
  <link rel="stylesheet" href="../stylesheets/general.css">
</head>
  <body>

    <?php

    foreach ($_POST as $key => $valore) {
      echo $key . "  " . $valore . " </br> ";
    }

    include_once '../assets/connection.php';

    $client = $_POST["client"];
    $book = "";
    $select_subject = "";


//  If a buy button has been pressed the "buyer" field in respective line
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

        $sql_to_storage = "SELECT *
                            FROM clients
                            JOIN trades
                              ON (clients.CF = trades.seller)
                            JOIN book
                              ON (trades.book = book.ISBN)
                           WHERE trades.buyer IS NULL
                             AND trades.seller != '$client'
                             AND book.ISBN = '$book'
                        ORDER BY subject;";

      } else if (isset($_POST['class']) and $_POST['class'] != "Seleziona") {

//Filter trougth class
        $class = $_POST['class'];

        $sql_to_storage = "SELECT *
                            FROM clients
                            JOIN trades
                              ON (clients.CF = trades.seller)
                            JOIN book
                              ON (trades.book = book.ISBN)
                            JOIN classes
                              ON (book.ISBN = classes.book)
                           WHERE trades.buyer IS NULL
                             AND trades.seller != '$client'
                             AND classes.class = '$class'
                        ORDER BY subject;";

         //Filter trougth subject and class
         if (isset($_POST['subject']) and $_POST['subject'] != "") {
           $subject = "%" . $_POST['subject'] . "%";
           $sql_to_storage = "SELECT *
                               FROM clients
                               JOIN trades
                                 ON (clients.CF = trades.seller)
                               JOIN book
                                 ON (trades.book = book.ISBN)
                               JOIN classes
                                 ON (book.ISBN = classes.book)
                              WHERE trades.buyer IS NULL
                                AND trades.seller != '$client'
                                AND classes.class = '$class'
                                AND book.subject LIKE '$subject'
                           ORDER BY subject;";
         }

      }

    } else {

      $sql_to_storage = "SELECT *
                           FROM clients
                           JOIN trades
                             ON (clients.CF = trades.seller)
                           JOIN book
                             ON (trades.book = book.ISBN)
                          WHERE buyer IS NULL
                            AND trades.seller != '$client'
                       ORDER BY subject;";
    }

    $sql_in_adding= "SELECT *
                       FROM clients
                       JOIN trades
                         ON (clients.CF = trades.seller)
                       JOIN book
                         ON (trades.book = book.ISBN)
                      WHERE buyer = '$client' 
                        AND trades.seller != '$client'
                   ORDER BY subject;";


    if($storage_result = $conn->query($sql_to_storage)) {
    } else {
      printf("Error select storage: %s\n", $conn->error);
    }

//header of stored books' table
    $in_storage = "<table> <th colspan='9'> In Magazzino </th>
                    <tr>
                      <td> Posizione      </td>
                      <td> Materia        </td>
                      <td> Titolo         </td>
                      <td> Prezzo         </td>
                      <td> Volume         </td>
                      <td> Nuova Adozione </td>
                      <td> Da comprare    </td>
                      <td> Consigliato    </td>
                      <th> ACQUISTA </th>
                    </tr>";

//body of buyable books' table                  
    while ($row = mysqli_fetch_array($storage_result)) {
      echo "porcodio";
      $row["price"] += $row["price"]/10;

      $form_id = "'buy" . $row['ISBN'] . $row['seller'] . $row['id'] . "'";

      $in_storage.= "<tr><td>"  . $row['position']                    .
                    "</td><td>" . $row['subject']                    .
                    "</td><td>" . $row['title']                       .
                    "</td><td>" . ($row["price"] * $value)/100        .  
                    "</td><td>" . $row['volume']                      .
                    "</td><td>" . $row['newAdoption']                 .
                    "</td><td>" . $row['toBuy']                       .
                    "</td><td>" . $row['advised']                     .
                    '</td><td>  <button onclick="document.getElementById("confirm").style = "block"> Acquista </button>  
                    
                    </tr>';
      }

     $in_storage .= "</table>";
     
//building the table used to show the books in storage
    if($adding_result = $conn->query($sql_in_adding)) {
    } else {
      printf("Error select trades: %s\n", $conn->error);
    }
//header of adding table 
    $in_adding = "<table> <th colspan='7'> In Aggiunta </th>
                    <tr>
                      <td> Posizione      </td>
                      <td> Materia        </td>
                      <td> Titolo         </td>
                      <td> Volume         </td>
                      <td> Nuova Adozione </td>
                      <td> Da comprare    </td>
                      <td> Consigliato    </td>
                    </tr>";

    $total = 0;

//body of adding table
    while ($row = mysqli_fetch_array($adding_result)) {

      $in_adding .= "<tr><td>"  . $row['position']                    .
                    "</td><td>" . $row['subject']                    .
                    "</td><td>" . $row['title']                       .
                    "</td><td>" . $row['volume']                      .
                    "</td><td>" . $row['newAdoption']                 .
                    "</td><td>" . $row['toBuy']                       .
                    "</td><td>" . $row['advised'];
      
      if (isset($_POST["price"])) {
        $total += (float)$_POST["price"];
      }else{
        $total = 0;
      }
     
    }

    $in_adding .= "<th colspan= '7'> Total:" . $total . " <th>
                  </table>";

  ?>

    <h1 class="title" align="center">COMPRA</h1>

    <!-- BACK -->
    <form id="back" method="post" action="../resoconto/resoconto.php">
      <input type="hidden" name="client" value="<?php echo $client; ?>">
      <div class="arrow" onclick="document.getElementById('back').submit();"></div>
    </form>

    <div class="filter">
      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        <input type="hidden" name="price" value="<?php echo ((float)$row["price"] * $value)/100 ?>">
        Libro: <input type="text" name="book" value="">
        <input type="submit" name="search" value="Cerca">
      </form>

      <?php
        if(isset($class)){
        }else{
          $class = "Seleziona";
        }

        $sql_to_classes =" SELECT DISTINCT class
                             FROM classes;";

        if($classes_result = $conn->query($sql_to_classes)) {
        } else {
          printf("Error select storage: %s\n", $conn->error);
        }

        $list = "";

        while ($row = mysqli_fetch_array($classes_result)) {
          $list .= "<option value='". $row["class"] ."'>". $row["class"] ."</option>";
        }

      ?>

      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        <input type="hidden" name="class" value="<?php echo $class ?>">
        <fieldset>
          <legend>Classe: </legend>
          <select name="class">
            <option value="<?php echo $class; ?>"><?php echo $class; ?></option>
            <?php echo $list; ?>
          </select>
          <input type='text' name='subject'>
          <input type="submit" name="search" value="Cerca">
        </fieldset>
      </form>

      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        <input type="submit" value="Ripristina ricerca">
      </form>
    </div>

    <div id="confirm">
        <h1>Vuoi aggiungere</h1>

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
