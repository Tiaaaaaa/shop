<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Dati</title>

    <link rel="stylesheet" href="../stylesheets/general.css">
    <link rel="stylesheet" href="./data.css">

  </head>
  <body>

    <?php
    include_once '../assets/connection.php';

    $password = $_POST["password"];

    if (!($password == "comitato")) {

      echo "<div id='error'>
              <p class='subtitle'>password errata, torna indietro e ritenta <p>
            </div>";

    }else{

      //declaring all variables
      $books_in_storage = 0;
      $books_sold = 0;
      $our_gain = 0;
      $total_books = 0;

      $sql_to_stats = "SELECT *
                         FROM trades;";

      $result = $conn ->query($sql_to_stats);

        while ($row = mysqli_fetch_array($result)) {

          //counting books
          if ($row['buyer'] == null) {
            $books_in_storage++;
          } else {
            $books_sold++;
          }
          $our_gain += $row['gain'];
        }

        $total_books = mysqli_num_rows($result);
    }


    ?>
    <!-- BACK -->
    <div class="arrow" onclick="window.location.href = '../index.html';"></div>

    <div class="container">

        <table>
          <tr>
            <th>Libri in store</th>
            <th>Libri venduti</th>
            <th>Libri totali</th>
            <th>Guadagno comitato</th>
          </tr>
          <tr>
            <td> <?php echo $books_in_storage; ?> </td>
            <td> <?php echo $books_sold; ?>       </td>
            <td> <?php echo $total_books; ?>      </td>
            <td> <?php echo $our_gain; ?>€        </td>
          </tr>
        </table>

    </div>


  </body>
</html>
