<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display catalog page with all products
     */
    public function index()
    {
        // Get all products WITHOUT is_active filter first (untuk testing)
        $products = Product::all()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'brand' => $product->brand,
                    'price' => $product->price,
                    'image' => $product->image_url, // Changed from image_url to image
                    'image_url' => $product->image_url,
                    'gender' => $product->gender,
                    'category' => $product->category,
                    'rating' => $product->rating ?? 0,
                    'review_count' => $product->review_count ?? 0,
                    'fragrance_notes' => $product->fragrance_notes, // Auto cast to array
                ];
            });
        
        // Get all brands
        $brands = Brand::all();
        
        // Get all unique fragrance notes
        $allNotes = collect();
        
        try {
            $allNotes = Product::all()
                ->pluck('fragrance_notes')
                ->flatten()
                ->filter()
                ->unique()
                ->sort()
                ->values();
        } catch (\Exception $e) {
            \Log::error('Error getting fragrance notes: ' . $e->getMessage());
        }
        
        // Debug: Log data count
        \Log::info('Catalog Data', [
            'products_count' => $products->count(),
            'brands_count' => $brands->count(),
            'notes_count' => $allNotes->count(),
        ]);
        
        return Inertia::render('Catalog', [
            'products' => [
                'data' => $products
            ],
            'brands' => $brands,
            'allNotes' => $allNotes,
        ]);
    }

    /**
     * Display single product detail page
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        
        // Safely handle fragrance_notes
        $fragranceNotes = $product->fragrance_notes;
        if (is_string($fragranceNotes)) {
            $fragranceNotes = json_decode($fragranceNotes, true);
        }
        if (!is_array($fragranceNotes)) {
            $fragranceNotes = [];
        }
        
        // Get related products (same brand or category)
        $relatedProducts = Product::where('id', '!=', $id)
            ->where(function($query) use ($product) {
                $query->where('brand', $product->brand)
                      ->orWhere('category', $product->category);
            })
            ->limit(4)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name ?? '',
                    'brand' => $p->brand ?? '',
                    'price' => $p->price ?? 0,
                    'image_url' => $p->image_url ?? '',
                    'rating' => $p->rating ?? 0,
                ];
            });
        
        return Inertia::render('ProductDetail', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name ?? '',
                'brand' => $product->brand ?? '',
                'price' => $product->price ?? 0,
                'image_url' => $product->image_url ?? '',
                'description' => $product->description ?? '',
                'gender' => $product->gender ?? 'Unisex',
                'category' => $product->category ?? 'Eau de Parfum',
                'rating' => $product->rating ?? 0,
                'review_count' => $product->review_count ?? 0,
                'fragrance_notes' => $fragranceNotes,
                'sillage' => $product->sillage ?? 5,
                'projection' => $product->projection ?? 5,
                'longevity' => $product->longevity ?? 5,
                'purchase_link' => $product->purchase_link ?? '',
            ],
            'relatedProducts' => $relatedProducts,
        ]);
    }
}