<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $table = 'languages_forms_translation';

    public function language()
    {
        $this->hasOne(Language::class, 'id', 'language_id');
    }

    public function form()
    {
        $this->belongsTo(Form::class, 'form_id', 'id');
    }

    public function image()
    {
        return $this->hasMany(Image::class, 'translation_id', 'id');
    }

    public function wysiwyg()
    {
        return $this->hasMany(Wysiwyg::class, 'translation_id', 'id');
    }
}
