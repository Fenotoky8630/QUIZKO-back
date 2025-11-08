<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $password;

    public function __construct(User $user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    public function build()
    {
        return $this->from('example@example.com')  // Sender
                    ->subject('Welcome to Our Application!') //Email subject
                    ->view('emails.userCreated') //View to use
                    ->with([
                        'userName' => $this->user->name,
                        'userEmail' => $this->user->email,
                        'userPassword' => $this->password,
    ]);
    }
}
