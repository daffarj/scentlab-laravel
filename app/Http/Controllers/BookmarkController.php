<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    /**
     * Toggle bookmark for a product
     */
    public function toggle($productId)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $product = Product::findOrFail($productId);
        $user = Auth::user();

        // Check if already bookmarked
        $bookmark = Bookmark::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if ($bookmark) {
            // Remove bookmark
            $bookmark->delete();
            $message = 'Removed from bookmarks';
            $bookmarked = false;
        } else {
            // Add bookmark
            Bookmark::create([
                'user_id' => $user->id,
                'product_id' => $productId,
            ]);
            $message = 'Added to bookmarks';
            $bookmarked = true;
        }

        // Return back with flash message
        return back()->with([
            'success' => $message,
            'bookmarked' => $bookmarked
        ]);
    }

    /**
     * Get all bookmarked products for current user
     */
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $bookmarkedProducts = Auth::user()
            ->bookmarkedProducts()
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'brand' => $product->brand,
                    'price' => $product->price,
                    'image_url' => $product->image_url,
                    'rating' => $product->rating ?? 0,
                    'review_count' => $product->review_count ?? 0,
                ];
            });

        return response()->json([
            'bookmarks' => $bookmarkedProducts
        ]);
    }
}