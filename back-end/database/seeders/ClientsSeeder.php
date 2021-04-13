<?php

namespace Database\Seeders;

use App\Models\ActingBranch;
use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = __DIR__ . "/data/clients.csv";
        $row = 1;
        if (($handle = fopen($path, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $num = count($data);
                $row++;
                for ($c = 0; $c < $num; $c++) {
                    // echo $data[$c] . "\n";
                    if ($data[$c]) {
                        $dataExplode = explode(',', $data[$c]);
                        $actionBranch = ActingBranch::where('name', $dataExplode[1])->first();
                        Client::create([
                            'name' => $dataExplode[0],
                            'acting_branches_id' => $actionBranch->id
                        ]);
                    }
                }
            }
            fclose($handle);
        }
    }
}
