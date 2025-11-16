<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand');
            $table->decimal('price', 10, 2);
            $table->string('image_url');
            $table->enum('gender', ['Male', 'Female', 'Unisex']);
            $table->string('category');
            $table->json('fragrance_notes');
            $table->integer('sillage')->default(5);
            $table->integer('projection')->default(5);
            $table->integer('longevity')->default(5);
            $table->text('description');
            $table->string('purchase_link')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};