<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('contract:deadline 45')->dailyAt('23:00');
        $schedule->command('contract:deadline 30')->dailyAt('23:00');
        $schedule->command('contract:deadline 15')->dailyAt('23:00');

        $schedule->command('contract:birthday 45')->dailyAt('23:00');
        $schedule->command('contract:birthday 30')->dailyAt('23:00');
        $schedule->command('contract:birthday 15')->dailyAt('23:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
