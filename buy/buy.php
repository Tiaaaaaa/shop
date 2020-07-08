<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Comprare</title>
  <link rel="stylesheet" href="./buy.css">
  <link rel="stylesheet" href="../stylesheets/general.css">

  <body>

    <?php

    foreach ($_POST as $key => $valore) {
      echo $key . "  " . $valore . " </br> ";
    }

    include_once '../assets/connection.php';

    $client = $_POST["client"];
    $book = "";

    if (isset($_POST["subject"])) {
      $subject = $_POST["subject"];
    }else{
      $subject = "";
    }
    

//  If a buy button has been pressed the "buyer" field in respective line
//  will be updated

    if (isset($_POST['key'])) {
      $book = $_POST['book'];

      $seller = substr($_POST["key"], 0, -1);
      $id     = substr($_POST["key"], -1);

      echo "seller: " . $seller . "<br>";
      echo "id: " . $id;

      $sql_to_buy = "UPDATE trades
                        SET buyer  = '$client'
                      WHERE book   = '$book'
                        AND seller = '$seller'
                        AND id     = '$id';";

      if (!$conn -> query($sql_to_buy)) {
        die("<h1 class='error'>ERRORE</h1>");
      }
    }

    $sql_to_storage = "SELECT *
                         FROM clients c, trades t, book b, classes cl
                        WHERE c.CF   = t.seller
                          AND t.book = b.ISBN
                          AND t.buyer IS NULL
                          AND t.seller != '$client'
                          AND cl.book  = b.ISBN";

    if (isset($_POST['search'])) {

      if (isset($_POST['book'])) {
          echo "libri";
          //Filter trougth ISBN 
          $book = $_POST['book'];

          $sql_to_storage .=" AND b.ISBN = '$book'";

      }
      
      if (isset($_POST['class']) and $_POST["class"] != "") {
        echo "classi";

          //Filter trougth class
          $class = $_POST['class'];

          $sql_to_storage .= " AND cl.class = '$class'";

      }
      
      if (isset($_POST["subject"]) and $_POST["subject"] != "") {

        echo " materia";

          //Filter trougth subject
          
          $sql_to_storage .= " AND b.subject = '$subject'";
      }
  }

  
  $sql_to_storage .= " ORDER BY b.subject;";
  echo $sql_to_storage;

    $sql_in_adding= "SELECT *
                       FROM clients c, book b, trades t
                      WHERE c.CF = t.seller
                        AND t.book = b.ISBN
                        AND t.buyer = '$client'
                   ORDER BY b.subject;";


    if($storage_result = $conn->query($sql_to_storage)) {
    } else {
      printf("Error select storage: %s\n", $conn->error);
    }

//header of stored books' table
    $in_storage = "<table> <th colspan='10'> In Magazzino </th>
                    <tr>
                      <td class='smaller_column'> Posizione </td>
                      <td> ISBN           </td>
                      <td> Materia        </td>
                      <td> Titolo         </td>
                      <td> Prezzo         </td>
                      <td> Volume         </td>
                      <td class='smaller_column'> Nuova Adozione </td>
                      <td class='smaller_column'> Da comprare    </td>
                      <td class='smaller_column'> Consigliato    </td>
                      <th> ACQUISTA </th>
                    </tr>";

    //body of buyable books' table                  
    while ($row = mysqli_fetch_array($storage_result)) {

      if ($row['state'] == 1) {
        $price = ((float)$row["price"] * 50)/100;
      } else {
        $price = ((float)$row["price"] * 60)/100;
      }

      $key = $row["seller"].$row["id"];

      $button = "<form method='post'>
                   <input type='hidden' name='client' value='$client'>
                   <input type='hidden' name='key' value='$key'>
                   <input type='hidden' name='book' value=' ". $row['book'] . "'>
                   <input type='submit' name='' value='Acquista'>
                 </form>";

      $in_storage.= "<tr>
                       <td>"  . $row['position']    . "</td>" .
                       "<td>" . $row['ISBN']        . "</td>" .
                       "<td>" . $row['subject']     . "</td>" .
                       "<td>" . $row['title']       . "</td>" .
                       "<td>" . $price              . "</td>" .
                       "<td>" . $row['volume']      . "</td>" .
                       "<td>" . $row['newAdoption'] . "</td>" .
                       "<td>" . $row['toBuy']       . "</td>" .
                       "<td>" . $row['advised']     . "</td>" .
                       "<td>" . $button             . "</td> 
                    </tr>";
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
                      <td> Materia        </td>
                      <td> Titolo         </td>
                      <td> Volume         </td>
                      <td class='smaller_column'> Nuova Adozione </td>
                      <td class='smaller_column'> Da comprare    </td>
                    </tr>";

    $total = 0;

//body of adding table
    while ($row = mysqli_fetch_array($adding_result)) {

      $in_adding .= "<tr>
                      <td>"  . $row['position']    . "</td>" .
                      "<td>" . $row['subject']     . "</td>" .
                      "<td>" . $row['title']       . "</td>" .
                      "<td>" . $row['volume']      . "</td>" .
                      "<td>" . $row['newAdoption'] . "</td>" .
                      "<td>" . $row['toBuy']       . "</td>" .
                      "<td>" . $row['advised']     . "</td>
                    </tr>";
      
      if (isset($_POST["price"])) {
        $total += (float)$_POST["price"];
      }else{
        $total = 0;
      }
     
    }

    $in_adding .= "<th colspan= '7'> Total:" . $total . " </th>
                  </table>";

  ?>

    <div class="active_filter">
      
      <?php 

        if (isset($_POST["book"])) {
          $book = $_POST["book"];
        }else{
          $book = "";
        }
        if (isset($_POST["class"])) {
          $class = $_POST["class"];
        }else {
          $class="";
        }
        if (isset($_POST["subject"])) {
          $subject = $_POST["subject"];
        }else{
          $subject = "";
        }
      ?>
      <table>
        <tr>
          <th colspan="2">Filtri attivi</th>
        </tr>
        <tr>
          <td>ISBN</td>
          <td><?php echo $book; ?></td>
        </tr>
        <tr>
          <td>classe</td>
          <td><?php echo $class; ?></td>
        </tr>
        <tr>
          <td>materia</td>
          <td><?php echo $subject; ?></td>
        </tr>
      </table>

    </div>

  <div class="container">
    <h1 class="title" align="center">COMPRA</h1>

    <!-- BACK -->
    <form id="back" method="post" action="../resoconto/resoconto.php">
      <input type="hidden" name="client" value="<?php echo $client; ?>">
      <div class="arrow" onclick="document.getElementById('back').submit();"></div>
    </form>

    <div class="filter">
      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        Libro: <input type="text" name="book" value="">
        <input type="submit" name="search" value="Cerca">
      </form>

      <?php 
        if(isset($class)){
        }else{
          $class = "";
        }

        //dynamic selection of classes
        $sql_to_classes =" SELECT DISTINCT class
                             FROM classes;";

        if($classes_result = $conn->query($sql_to_classes)) {
        } else {
          printf("Error select storage: %s\n", $conn->error);
        }

        $class_list = "";

        while ($row = mysqli_fetch_array($classes_result)) {
          $class_list .= "<option value='". $row["class"] ."'>". $row["class"] ."</option>";
        }

        //dinamic selection of subjects 
        
        if(isset($subject)){
        }else{
          $subject = "";
        }

        $sql_to_subjects =" SELECT DISTINCT subject
                              FROM book b, trades t
                             WHERE b.ISBN = t.book
                               AND t.seller != '$client';";

        if($subjects_result = $conn->query($sql_to_subjects)) {
        } else {
          printf("Error select storage: %s\n", $conn->error);
        }

        $subjects_list = "";

        while ($row = mysqli_fetch_array($subjects_result)) {
          $subjects_list .= "<option value='". $row["subject"] ."'>". $row["subject"] ."</option>";
        }

      ?>

      <!-- filter by class -->
      <form method="post">
        <fieldset>
          <legend>Classe:</legend>
          <select name="class">
            <option value="">Seleziona</option>
            <?php echo $class_list; ?>
          </select>
          <input type="submit" name="search" value="Cerca">
          <input type="hidden" name="client" value="<?php echo $client; ?>">
          <input type="hidden" name="subject" value="<?php echo $subject; ?>">
        </fieldset>
      </form>

      <!-- filter by subject -->
      <form method="post">
        <fieldset>
          <legend>Materia:</legend>
          <select name="subject">
            <option value="">Seleziona</option>
            <?php echo $subjects_list; ?>
          </select>
          <input type="submit" name="search" value="Cerca">
          <input type="hidden" name="client" value="<?php echo $client; ?>">
          <input type="hidden" name="class" value="<?php echo $class; ?>">
        </fieldset>
      </form>

      <form method="post">
        <input type="hidden" name="client" value="<?php echo $client; ?>">
        <input type="submit" value="Ripristina ricerca">
      </form>
    </div>

    <?php
     
        
    ?>


    <div id="confirm">
        <h1>Vuoi aggiungere</h1>
        <?php echo $confirmation; ?>

    </div>  

    <div class="show_storage">
      <?php echo $in_storage ?>

    </div>

    <hr size="8px" color="red" style="width:95vw;'">
    <hr size="8px" color="red" style="width:95vw;'">

    <div class="adding">

      <?php echo $in_adding ?>

    </div>

  </div>
  </body>
</html>
