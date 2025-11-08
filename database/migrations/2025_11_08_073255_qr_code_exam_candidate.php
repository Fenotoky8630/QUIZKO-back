<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécute la migration.
     */
    public function up(): void
    {
        Schema::create('exam_qr_codes', function (Blueprint $table) {
            $table->id();

            // 🔹 Clés étrangères
            $table->unsignedBigInteger('candidate_id');
            $table->unsignedBigInteger('interview_id');

            // 🔹 Données du QR code
            $table->uuid('token')->unique();
            $table->boolean('is_used')->default(false);
            $table->timestamp('used_at')->nullable();
            $table->string('status')->default('valid'); // "valid", "expired", "used"
            $table->timestamp('generated_at')->useCurrent();

            $table->timestamps();

            // 🔹 Clés étrangères
            $table->foreign('candidate_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->foreign('interview_id')->references('id')->on('interviews')->onDelete('cascade');
        });
    }

    /**
     * Annule la migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_qr_codes');
    }
};
