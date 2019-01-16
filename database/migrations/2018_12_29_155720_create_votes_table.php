<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('type', ['like', 'dislike']);
            $table->integer('user_id')->unsigned();
            $table->integer('voted_id')->unsigned();
            $table->string('voted_type');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('voted_id')
                ->references('id')->on('posts')
                ->onDelete('cascade');

            $table->unique(['user_id', 'voted_id', 'voted_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('votes');
    }
}