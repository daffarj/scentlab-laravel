<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'image_url',
        'gender',
        'category',
        'fragrance_notes',
        'sillage',
        'projection',
        'longevity',
        'description',
        'purchase_link',
        'rating',
        'review_count',
        'is_active',
    ];

    /**
     * Auto cast JSON ke array
     */
    protected $casts = [
        'fragrance_notes' => 'array', // Auto decode JSON
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
        'sillage' => 'integer',
        'projection' => 'integer',
        'longevity' => 'integer',
        'review_count' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Default values
     */
    protected $attributes = [
        'sillage' => 5,
        'projection' => 5,
        'longevity' => 5,
        'rating' => 0.0,
        'review_count' => 0,
        'is_active' => true,
    ];
}