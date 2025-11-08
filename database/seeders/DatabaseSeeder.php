<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Candidate;
use App\Models\Department;
use App\Models\Recruiter;
use App\Models\Answer;
use App\Models\Interview;
use App\Models\Subject;
use App\Models\QuestionSubject;
use App\Models\Post;
use App\Models\Question;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Question::factory(3)->create();
        //Answer::factory(9)->create();
        //Subject::factory(3)->create();
        //QuestionSubject::factory(3)->create();
        //Interview::factory(3)->create();
        /*** Seeders
        $this->call(UserSeeder::class);
        Post::factory(3)->create();
        Department::factory(3)->create();
        Candidate::factory(10)->create();
        Recruiter::factory(10)->create();
        */
        $this->call(UserSeeder::class);
      
    }
}
