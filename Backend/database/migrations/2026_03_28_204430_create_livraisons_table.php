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
    Schema::create('livraisons', function (Blueprint $table) {
        $table->id();
        $table->string("name");
        $table->enum('type', ['voiture', 'moto', 'messagerie']);
        $table->string('statut');
        $table->unsignedBigInteger('id_bl');
        $table->string("tele");
        $table->foreign('id_bl')->references('id')->on('bon_livraisons')->onDelete('cascade');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livraisons');
    }
};
