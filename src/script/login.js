define([], function() {
    return {
        init: function() {
            class Login {
                constructor() {
                    this.yzm = $('#yzm');
                    this.btn = $('#submitLoginBtn');
                    this.yzmsure = $('#inputyzm');
                    this.yzmbox = $('#yzmbox');
                }
                init() {
                    let yzm = this.randomyzm();
                    this.yzm.html(yzm);
                    //换一个验证码功能
                    this.yzm.on('click', () => {
                        yzm = this.randomyzm();
                        this.yzm.html(yzm);
                    });
                    this.formsure();
                }
                randomyzm() { //产生随机验证码
                    let arr = [];
                    for (let i = 48; i <= 57; i++) {
                        arr.push(String.fromCharCode(i));
                    }
                    for (let i = 65; i <= 90; i++) {
                        arr.push(String.fromCharCode(i));
                    }
                    let yzm = '';
                    for (let i = 1; i <= 6; i++) {
                        let ranindex = parseInt(Math.random() * arr.length);
                        if (ranindex > 9) {
                            var bool = Math.random() > 0.5 ? true : false;
                            if (bool) {
                                yzm += arr[ranindex].toLowerCase();
                            } else {
                                yzm += arr[ranindex];
                            }
                        } else {
                            yzm += arr[ranindex];
                        }

                    }
                    return yzm;
                }
                formsure() { //发送数据到后端和数据库比较
                    this.btn.on('click', () => {
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost/JS2004/Second-step/dangdangwang1/php/login.php',
                            data: {
                                user: $('#username').val(),
                                pass: hex_sha1($('#password').val())
                            }
                        }).done((result) => {
                            if (result) {
                                if (this.yzmsure.val().toLowerCase() === this.yzm.html().toLowerCase()) {
                                    this.yzmbox.html('√').css('color', 'green');
                                    location.href = "index123.html";
                                    $.cookie('username', $('#username').val(), {
                                        expires: 7,
                                        path: '/'
                                    });
                                } else {
                                    this.yzmbox.html('验证码有误').css('color', 'red');
                                }
                            } else {
                                $('#password').val('');
                                alert('用户名或者密码错误');
                            }
                        })
                    });
                }
            }
            new Login().init();
        }
    }
});