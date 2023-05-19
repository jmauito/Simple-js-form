<?php
header("Access-Control-Allow-Origin:*");

$dsn = "mysql:host=localhost;dbname=store";
$user = "root";
$password = "admin";
$connection = new PDO($dsn, $user, $password);

$id = $_GET['id'];

$query = "DELETE FROM users WHERE id = $id ";

$connection->query($query);


