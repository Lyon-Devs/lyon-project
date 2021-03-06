<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Yajra\Acl\Models\Role;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role' => 'required'
            ],
            [
                'email.required' => 'O email é obrigatório',
                'email.unique' => 'O email ja está sendo utilizado',
                'password.required' => 'A senha é obrigatória',
                'password.min' => 'Sua senha tem menos de 8 caracteres',
                'role.required' => 'As permissões são obrigatórias'
            ]
        );

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        foreach ($request->role as $role) {
            $role = Role::where('slug', $role)->first();
            $user->roles()->attach($role);
        }


        event(new Registered($user));

        return $user;
    }
}
