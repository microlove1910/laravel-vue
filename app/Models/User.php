<?php


namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

/**
 * Class User
 *
 * @method static User create(array $user)
 * @package App\Models
 */
class User extends \Illuminate\Foundation\Auth\User
{
    use Notifiable, HasApiTokens;

    protected $guarded = 'manage';

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}
