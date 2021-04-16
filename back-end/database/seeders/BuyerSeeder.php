<?php

namespace Database\Seeders;

use App\Models\Buyer;
use App\Models\Client;
use Illuminate\Database\Seeder;

class BuyerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = __DIR__ . "/data/buyer.csv";
        $row = 1;
        if (($handle = fopen($path, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $num = count($data);
                $row++;
                for ($c = 0; $c < $num; $c++) {
                    // echo $data[$c] . "\n";
                    if ($data[$c]) {
                        $dataExplode = explode(',', $data[$c]);
                        $client = Client::where('name', $dataExplode[1])->first();
                        if (isset($client->id)) {
                            Buyer::create([
                                'name' => $dataExplode[2],
                                'client_id' => $client->id
                            ]);
                        } else {
                            dump($dataExplode[1]);
                        }
                    }
                }
            }
            fclose($handle);
        }
    }
}
