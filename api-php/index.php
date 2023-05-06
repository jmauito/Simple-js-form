<?php
//Permite recibir peticiones desde cualquier dirección
header("Access-Control-Allow-Origin:*");
//Para recibir datos enviados en el cuerpo de la petición
$rawData = file_get_contents("php://input");
// Transformar el rawData en un objeto de PHP
$user = json_decode($rawData);
//Para ver en pantalla qué estamos recibiendo
$dsn = "mysql:dbname=store;host=localhost:3306";
$username = "root";
$password = "admin";


$connection = new PDO($dsn, $username, $password);

$name = $user->name;
$email = $user->email;
$birthDate = $user->birthdate;
$sex = $user->sex;

$query = "INSERT INTO users 
    (username, email, birthdate, sex) 
    VALUES('$name', '$email', '$birthDate', '$sex')";

echo $query;

$connection->query($query);





