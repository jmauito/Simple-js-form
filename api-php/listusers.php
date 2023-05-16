<?php
header("Access-Control-Allow-Origin:*");
$dsn = "mysql:dbname=store;host=localhost";
$username = "root";
$password = "admin";
$connection = new PDO($dsn, $username, $password);

$query = "SELECT * FROM users;";

$result = $connection->query($query, PDO::FETCH_OBJ);

$users = [];

foreach($result as $item){
    $users[] = $item;
}

print json_encode($users);


