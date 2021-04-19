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
                    if ($data[$c]) {
                        $dataExplode = explode(',', $data[$c]);
                        $actionBranch = ActingBranch::where('name', $dataExplode[2])->first();
                        if (@$actionBranch->id) {
                            // Client::unsetEventDispatcher();
                            $client = new Client();
                            $client->fill([
                                'name' => $dataExplode[1],
                                'code' => $dataExplode[0],
                                'acting_branches_id' => $actionBranch->id
                            ]);
                            $client->saveQuietly();
                        } else {
                            dump($dataExplode[2]);
                        }
                    }
                }
            }
            fclose($handle);
        }
    }
}
