<?php


namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;

class UrlController extends Controller
{
    const MAX_URLS_PER_PAGE = 25;

    public function addUrl(Request $request)
    {
        $rules = [
            'long_url' => 'required|url',
        ];
        $validatedData = $this->validate($request, $rules);
        $longUrl = rawurldecode($validatedData['long_url']);

        if ($longUrl[- 1] === '/') {
            $longUrl = substr($longUrl, 0, - 1);
        }

        $model = Url::where('long_url', $longUrl)->first();
        if (!$model) {
            $model = new Url();
            $model->long_url = $longUrl;
            $model->save();
        }

        return response()->json($model);
    }

    public function redirect(Request $request, string $key)
    {
        $model = new Url();
        $model->key = $key;

        $model = Url::where('id', $model->id)->first();

        if ($model) {
            return redirect($model->long_url, 308);
        } else {
            abort(404);
        }
    }

    public function getLastUrls(Request $request)
    {
        $rowsNumber = (int)$request->per_page >  0
            && (int)$request->per_page <= self::MAX_URLS_PER_PAGE
                ? (int)$request->per_page
                : self::MAX_URLS_PER_PAGE;

        $page = Url::orderBy('id', 'DESC')->simplePaginate($rowsNumber);

        return response()->json($page);
    }
}
