<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'brand',
        'price',
        'image_url',
        'description',
        'gender',
        'category',
        'rating',
        'review_count',
        'fragrance_notes',
        'sillage',
        'projection',
        'longevity',
        'purchase_link',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
        'review_count' => 'integer',
        'fragrance_notes' => 'array',
        'sillage' => 'integer',
        'projection' => 'integer',
        'longevity' => 'integer',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function bookmarkedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'bookmarks')
            ->withTimestamps();
    }

    /**
     * Update product rating based on reviews
     */
    public function updateRating(): void
    {
        $reviews = $this->reviews;
        
        if ($reviews->count() > 0) {
            $averageRating = $reviews->avg('rating');
            $this->update([
                'rating' => round($averageRating, 1),
                'review_count' => $reviews->count(),
            ]);
        } else {
            $this->update([
                'rating' => 0,
                'review_count' => 0,
            ]);
        }
    }
}