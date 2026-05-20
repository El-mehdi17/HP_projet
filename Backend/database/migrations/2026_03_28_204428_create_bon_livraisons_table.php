<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up()
{
    Schema::create('bon_livraisons', function (Blueprint $table) {
        $table->id();

       $table->unsignedBigInteger('id_commande');

       $table->foreign('id_commande')->references('id')->on('commandes')->onDelete('cascade');
       $table->date('date_livraison');
         $table->string('adresse_livraison');
         

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bon_livraisons');
    }
};
