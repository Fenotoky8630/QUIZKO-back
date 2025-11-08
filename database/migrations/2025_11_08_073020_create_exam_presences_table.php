<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_presences', function (Blueprint $table) {
            $table->id();

            // Relations
            $table->unsignedBigInteger('candidate_id');
            $table->unsignedBigInteger('interview_id');
            $table->unsignedBigInteger('scanned_by')->nullable();

            // Données de présence
            $table->timestamp('scanned_at')->nullable();
            $table->string('status')->default('present'); // 'present', 'absent', 'late', etc.

            $table->timestamps();

            // Clés étrangères (optionnelles mais recommandées)
            $table->foreign('candidate_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('interview_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->foreign('scanned_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_presences');
    }
};
