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
    Schema::create('commandes', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_client');
        $table->foreign('id_client')->references('id')->on('clients')->onDelete('cascade');
        $table->string('statut')->default('en_attente');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
