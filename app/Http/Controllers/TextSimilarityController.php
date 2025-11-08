<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;

class TextSimilarityController extends Controller
{
    public function evaluate($text_1, $text_2)
    {
        $apiUrl = env('TEXT_SIMILARITY_API_URL'); 
        $apiKey = env('TEXT_SIMILARITY_API_KEY'); 
        
        $client = new Client();

        try {
            $response = $client->post($apiUrl, [
                'headers' => [
                    'X-Api-Key' => $apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'text_1' => $text_1,
                    'text_2' => $text_2,
                ],
            ]);

            $responseData = json_decode($response->getBody(), true);
            $similarity = $responseData['similarity']; 

            return response()->json(['similarity' => $similarity]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de l\'appel de l\'API: ' . $e->getMessage()], 500);
        }
    }
}
