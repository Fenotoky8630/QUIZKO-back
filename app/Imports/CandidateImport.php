<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use App\Models\Candidate;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Mail\UserCreated; 
use Illuminate\Support\Facades\Mail;
class CandidateImport implements ToCollection, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (!empty($row['first_name']) && !empty($row['last_name']) &&
                !empty($row['address']) &&
                !empty($row['email']) && !empty($row['phone']) &&
                !empty($row['gender']) && !empty($row['post'])) {
                
                $postId = Post::where('name', $row['post'])->pluck('id')->first();

                $password = Str::random(10);

                $user = User::create([
                    'name' => $row['first_name']." ".$row['last_name'],
                    'email' => $row['email'],
                    'password' => Hash::make($password),
                    'role' => 'candidate',
                    'first_name' => $row['first_name'],
                    'last_name' => $row['last_name'],
                    'address' => $row['address'],
                    'phone' => $row['phone'],
                ]);

                Candidate::create([
                    'gender' => $row['gender'],
                    'user_id' => $user->id,
                    'post_id' => $postId,
                ]);

                // Envoi de l'e-mail avec les détails de connexion
               // Mail::to($user->email)->send(new UserCreated($user, $password));
            }
        }
    }
}
