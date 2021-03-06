//配置模块
//第三方文件

require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
        'pagination': 'jquery.pagination',
        'cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie'
    },
    shim: {
        'lazyload': ['jquery'],
        'pagination': ['jquery'],
        'cookie': ['jquery']
    }
});

//加载模块
require(['jquery', 'lazyload', 'pagination', 'cookie'], function($) {
    let mod = $('#currentpage').attr('currentmod'); //获取script标签下面的属性值
    if (mod) {
        //如果mod存在，加载对应的模块
        require([mod], function(modlist) {
            modlist.init();
        });
    }
});