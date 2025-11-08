<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidate_answers', function (Blueprint $table) {
            $table->id();
            $table->integer('point')->nullable();
            $table->text('answer_of_candidate')->nullable();
            $table->unsignedBigInteger('interview_id');
            $table->unsignedBigInteger('candidate_id');
            $table->unsignedBigInteger('answer_id');
            $table->foreign('interview_id')->references('id')->on('interviews')->onDelete('cascade');
            $table->foreign('candidate_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->foreign('answer_id')->references('id')->on('answers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_answer');
    }
};
