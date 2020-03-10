<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return view('index');
});

$router->get('/{key}', 'UrlController@redirect');

$router->post('/api/add-url', 'UrlController@addUrl');

$router->get('/api/get-last-urls', 'UrlController@getLastUrls');
