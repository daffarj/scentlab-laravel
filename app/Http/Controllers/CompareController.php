<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompareController extends Controller
{
    public function index(Request $request)
    {
        // Get product IDs from query parameter
        $productIds = $request->query('ids');
        
        $compareProducts = [];
        
        if ($productIds) {
            // Split IDs by comma
            $ids = explode(',', $productIds);
            
            // Limit to 4 products maximum
            $ids = array_slice($ids, 0, 4);
            
            // Fetch products - NO relationship needed, brand is a direct column
            $compareProducts = Product::whereIn('id', $ids)
                ->get()
                ->map(function ($product) {
                    // Decode fragrance_notes if it's a JSON string
                    $fragranceNotes = $product->fragrance_notes;
                    if (is_string($fragranceNotes)) {
                        $fragranceNotes = json_decode($fragranceNotes, true);
                    }
                    
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'brand' => $product->brand, // Direct column access
                        'price' => $product->price,
                        'image_url' => $product->image_url,
                        'description' => $product->description,
                        'gender' => $product->gender,
                        'category' => $product->category,
                        'rating' => $product->rating ?? 0,
                        'review_count' => $product->review_count ?? 0,
                        'fragrance_notes' => $fragranceNotes ?? [],
                        'sillage' => $product->sillage ?? 5,
                        'projection' => $product->projection ?? 5,
                        'longevity' => $product->longevity ?? 5,
                        'purchase_link' => $product->purchase_link,
                    ];
                })
                ->values()
                ->toArray();
        }
        
        return Inertia::render('Compare', [
            'compareProducts' => $compareProducts,
        ]);
    }
}