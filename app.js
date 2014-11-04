"use strict";

requirejs.config({
    'paths': {
        'jquery': [
            // 'http://code.jquery.com/jquery-latest.min',
            'vendor/jquery'
        ],
        'knockout': [
            // 'http://cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min',
            'vendor/knockout'
        ]
    }
});

requirejs(["app/main"]);
