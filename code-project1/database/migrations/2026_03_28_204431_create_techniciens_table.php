<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('techniciens', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string("prenom");
            $table->string('cin')->nullable()->unique();
            $table->enum('specialite', [
    'Technicien Maintenance Hardware',
    'Technicien Logiciel (Software)',
    'Technicien Support PC',
    'Technicien Laptop (Portable)',
    'Technicien Micro-soudure',
    'Technicien Récupération de données'
]);
$table->enum('metier', [
    'Technicien de maintenance informatique',
    'Technicien support informatique',
    'Réparateur d’ordinateurs (PC)',
    'Technicien hardware',
    'Technicien software',
    'Technicien en réparation de laptops',
    'Technicien micro-soudure',
    'Spécialiste en récupération de données'
]);
$table->integer('années_d_expérience')->nullable()->unique();
$table->integer('Prix')->nullable();
$table->string("image")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('techniciens');
    }
};
