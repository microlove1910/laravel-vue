<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel-vue</title>
    <meta name="theme-color" content="#ffffff">
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="app">
    <app></app>
</div>

{{--<script src="https://cdn.bootcss.com/vue/2.5.7/vue.min.js"></script>--}}
{{--<script src="https://unpkg.com/element-ui@2.4.6/lib/index.js"></script>--}}
{{--<script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js"></script>--}}

<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
