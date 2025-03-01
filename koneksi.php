<?php
$koneksi = new mysqli("simskul.org","ramasakti","Ramasakti123*","pernikahan","3306");

// Check connection
if ($koneksi->connect_errno) {
  echo "Failed to connect to MySQL: " . $koneksi->connect_error;
  exit();
}
?>