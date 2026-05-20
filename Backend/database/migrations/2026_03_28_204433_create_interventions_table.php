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
    Schema::create('interventions', function (Blueprint $table) {
        $table->id('id_intervention');
        $table->foreignId('id_commande')->constrained('commandes');
        $table->foreignId('id_technicien')->constrained('techniciens');
        $table->text('description');
        $table->string('statut');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interventions');
    }
};
