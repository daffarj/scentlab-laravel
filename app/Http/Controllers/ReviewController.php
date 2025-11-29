<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Store a new review
     */
    public function store(Request $request, $productId)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->back()->with('error', 'You must be logged in to leave a review.');
        }

        // Validate request
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        // Check if user already reviewed this product
        $existingReview = Review::where('product_id', $productId)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingReview) {
            return redirect()->back()->with('error', 'You have already reviewed this product.');
        }

        // Create review
        Review::create([
            'product_id' => $productId,
            'user_id' => Auth::id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->back()->with('success', 'Review submitted successfully!');
    }

    /**
     * Update an existing review
     */
    public function update(Request $request, $reviewId)
    {
        $review = Review::findOrFail($reviewId);

        // Check if user owns this review
        if ($review->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'You can only edit your own reviews.');
        }

        // Validate request
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        // Update review
        $review->update($validated);

        return redirect()->back()->with('success', 'Review updated successfully!');
    }

    /**
     * Delete a review
     */
    public function destroy($reviewId)
    {
        $review = Review::findOrFail($reviewId);

        // Check if user owns this review
        if ($review->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'You can only delete your own reviews.');
        }

        $review->delete();

        return redirect()->back()->with('success', 'Review deleted successfully!');
    }
}