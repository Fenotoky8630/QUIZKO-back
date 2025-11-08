<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->timestamps();
        });

        Schema::create('question_subjects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('question_id');
            $table->unsignedBigInteger('subject_id');
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
            $table->timestamps();
           //ajouter une question à un sujet
            //$question = Question::find(1);
            //$subject = Suject::find(2);
            //$question->subjects()->attach($subject);
        });
    }

    public function down()
    {
        Schema::dropIfExists('question_subject');
        Schema::dropIfExists('subjects');
    }
};
