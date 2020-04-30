<?php


namespace App\Http\Controllers\Manage;


use App\Http\Resources\JsonResponse;
use App\Http\Resources\UserResource;
use App\Utils\Constant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        $credentials['status'] = Constant::ENABLE;
        if (!Auth::attempt($credentials)) {
            return response()->json(new JsonResponse([], '用户或者密码错误'), Response::HTTP_UNAUTHORIZED);
        }

        $user = $request->user();
        $tokenResult = $user->createToken($user['username']);
        $token = $tokenResult->token;
        $token->save();

        return response()->json(new UserResource($user), Response::HTTP_OK)
            ->header('Authorization', $tokenResult->accessToken);
    }

    public function user()
    {
        return \response()->json(new UserResource(Auth::user()));
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json((new JsonResponse())->success([]), Response::HTTP_OK);
    }

}
