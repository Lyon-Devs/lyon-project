<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\Proposal;
use App\Observers\ClientObserver;
use App\Observers\ProposalObserver;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        if (!$this->app->routesAreCached()) {
            Passport::enableImplicitGrant();
            Passport::routes(null, ['prefix' => "api/oauth"]);
        }
        Client::observe(ClientObserver::class);
        Proposal::observe(ProposalObserver::class);
    }
}
