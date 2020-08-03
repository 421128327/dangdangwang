const username = document.querySelector('.username');
const span = document.querySelector('span');
//1.获取用户名传给后端。
username.onblur = function() {
    $ajaxpromise({
        type: 'post',
        url: 'http://localhost:8088/JS2004/Day%2024_cookie/login&registry/php/registry.php',
        data: {
            name: this.value //将表单的值传给后端。
        }
    }).then(function(data) {
        //data返回1：存在  否则返回空，不存在
        if (!data) { //可以注册
            span.innerHTML = '√';
            span.style.color = 'green';
        } else { //用户名重名。
            span.innerHTML = '该用户名已被注册';
            span.style.color = 'red';
        }
    })
};