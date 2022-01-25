<?php

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: authorization, content-type");

session_start();
require './../vendor/autoload.php';

(new \Cacofony\DIC\DIC())
    ->injectParameters('./../config/parameters.yaml')
    ->run('./../src', './../cacofony');

(new \Cacofony\Route\Router())
    ->getRoutesFromAnnotations('./../src/Controller')
    ->run();

