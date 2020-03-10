<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

/**
 * @property integer id
 * @property string long_url
 * @property string key
 * @property string short_url
 */
class Url extends Model
{
    protected $fillable = ['long_url'];

    protected $visible = ['short_url', 'long_url'];

    protected $appends = ['short_url'];

    public function getKeyAttribute(): string
    {
        return base_convert($this->id, 10, 36);
    }

    public function setKeyAttribute(string $value): void
    {
        $this->id = (int)base_convert($value, 36, 10);
    }

    public function GetShortUrlAttribute():string
    {
        return env('APP_URL') .  "/{$this->key}";
    }
}
