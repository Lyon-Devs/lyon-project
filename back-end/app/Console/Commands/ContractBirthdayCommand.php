<?php

namespace App\Console\Commands;

use App\Services\ContractBirthdayService;
use Illuminate\Console\Command;

class ContractBirthdayCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contract:birthday {days}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $days = $this->argument('days');
        $service = new ContractBirthdayService();
        $service->handle($days);
        return 0;
    }
}
