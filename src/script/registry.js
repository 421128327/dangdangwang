define([], function() {
    return {
        init: function() {
            class Registry {
                constructor() {
                    this.yzm = $('#yzm');
                    this.change = $('#change');
                    this.username = $('#user');
                    this.password = $('#password');
                    this.surepass = $('#sure');
                    this.email = $('#email');
                    this.sureyzm = $('#sureyzm');
                    this.form = $('#form1');
                    this.agree = $('#agree')
                    this.span = $('form span');
                }
                init() {
                    let yzm = this.randomyzm();
                    this.yzm.html(yzm);
                    //换一个验证码功能
                    this.change.on('click', () => {
                        yzm = this.randomyzm();
                        this.yzm.html(yzm);
                    });
                    this.formsure();
                    this.usernamesure();
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
                formsure() { //表单验证
                    const $span = $('form span');
                    var usernameflag = true;
                    var passwordflag = true;
                    var passsureflag = true;
                    var yzmflag = true;
                    var emailflag = true;
                    //用户名验证
                    this.username.on('focus', () => {
                        $span.get(0).innerHTML = '数字，字符均可，最长14个字符';
                    });
                    this.username.on('blur', () => {
                        if (this.username.val() !== '') {
                            let strlen = this.username.val().length;
                            let reg = /^[^\u4e00-\u9fa5]+$/g;
                            if (strlen <= 14) {
                                if (reg.test(this.username.val())) {
                                    $span.get(0).innerHTML = '√';
                                    $span.get(0).style.color = 'green';
                                    usernameflag = true;
                                } else {
                                    $span.get(0).innerHTML = '格式有误,用户名不能存在中文';
                                    $span.get(0).style.color = 'red';
                                    usernameflag = false;
                                }
                            } else {
                                $span.get(0).innerHTML = '用户名长度有误，最长14个字符';
                                $span.get(0).style.color = 'red';
                                usernameflag = false;
                            }
                        } else {
                            $span.get(0).innerHTML = '用户名不能为空';
                            $span.get(0).style.color = 'red';
                            usernameflag = false;
                        }
                    });
                    //密码验证
                    this.password.on('focus', () => {
                        $span.get(1).innerHTML = '密码为6-20个字符，可由英文、数字及符号组成'
                        this.password.on('input', () => {
                            console.log(this.password.val());
                            if (this.password.val().length >= 6 && this.password.val().length <= 20) {
                                let regnum = /\d+/; //数字 
                                let reglower = /[a-z]+/; //小写字母 
                                let regupper = /[A-Z]+/; //大写字母
                                let other = /[\W\_]+/; //特殊字符
                                let count = 0; //计数器
                                if (regnum.test(this.password.val())) {
                                    count++;
                                }
                                if (reglower.test(this.password.val())) {
                                    count++;
                                }
                                if (regupper.test(this.password.val())) {
                                    count++;
                                }
                                if (other.test(this.password.val())) {
                                    count++;
                                }
                                switch (count) {
                                    case 1:
                                        $span.get(1).innerHTML = '弱';
                                        $span.get(1).style.color = 'red';
                                        passwordflag = false;
                                        break;
                                    case 2:
                                    case 3:
                                        $span.get(1).innerHTML = '中';
                                        $span.get(1).style.color = 'orange';
                                        passwordflag = true;
                                        break;
                                    case 4:
                                        $span.get(1).innerHTML = '强';
                                        $span.get(1).style.color = 'green';
                                        passwordflag = true;
                                        break;
                                }
                            } else {
                                $span.get(1).innerHTML = '密码长度有误，请输入6-20位的密码';
                                $span.get(1).style.color = 'red';
                                passwordflag = false;
                            }
                        });
                    });
                    this.password.on('blur', () => {
                        if (this.password.val() !== '') {
                            if (passwordflag) {
                                $span.get(1).innerHTML = '√';
                                $span.get(1).style.color = 'green';
                            }
                        } else {
                            $span.get(1).innerHTML = '密码不能为空';
                            $span.get(1).style.color = 'red';
                            passwordflag = false;
                        }
                    });
                    //确认密码验证
                    this.surepass.on('input', () => {
                        if (this.password.val() === this.surepass.val()) {
                            $span.get(2).innerHTML = "√";
                            $span.get(2).style.color = 'green';
                            passsureflag = true;

                        } else {
                            $span.get(2).innerHTML = "密码不一致";
                            $span.get(2).style.color = 'red';
                            passsureflag = false;
                        }
                    });
                    //邮箱验证
                    this.email.on('focus', () => {
                        $span.get(3).innerHTML = '请输正确的邮箱格式';
                    });
                    this.email.on('blur', () => {
                        if (this.email.val() !== '') {
                            let reg = /^(\w+[+-.]*\w+)\@(\w+\w+)\.(\w+\w+)$/;
                            if (reg.test(this.email.val())) {
                                $span.get(3).innerHTML = '√';
                                $span.get(3).style.color = 'green';
                                emailflag = true;
                            } else {
                                $span.get(3).innerHTML = '邮箱格式有误';
                                $span.get(3).style.color = 'red';
                                emailflag = false;
                            }
                        } else {
                            $span.get(3).innerHTML = '邮箱不能为空';
                            $span.get(3).style.color = 'red';
                            emailflag = false;
                        }
                    });
                    //验证码验证
                    this.sureyzm.on('blur', () => {
                        if (this.sureyzm.val().toLowerCase() === this.yzm.html().toLowerCase()) {
                            $span.get(5).innerHTML = '√';
                            $span.get(5).style.color = 'green';
                            yzmflag = true;
                        } else {
                            $span.get(5).innerHTML = '验证码错误';
                            $span.get(5).style.color = 'red';
                            yzmflag = false;
                        }
                    });
                    //提交表单
                    this.form.on('submit', () => {
                        if (this.username.val() === '') {
                            $span.get(0).innerHTML = '用户名不能为空';
                            $span.get(0).style.color = 'red';
                            usernameflag = false;
                        }
                        if (this.password.val() === '') {
                            $span.get(1).innerHTML = '密码不能为空';
                            $span.get(1).style.color = 'red';
                            passwordflag = false;
                        }
                        if (this.surepass.val() === '') {
                            $span.get(2).innerHTML = '请确认密码';
                            $span.get(2).style.color = 'red';
                            passsureflag = false;
                        }
                        if (this.email.val() === '') {
                            $span.get(3).innerHTML = '邮箱不能为空';
                            $span.get(3).style.color = 'red';
                            emailflag = false;
                        }
                        if (this.sureyzm.val() === '') {
                            $span.get(5).innerHTML = '验证码不能为空';
                            $span.get(5).style.color = 'red';
                            yzmflag = false;
                        }
                        if (!usernameflag || !passwordflag || !passsureflag || !emailflag || !yzmflag) {
                            return false;
                        }
                    });
                }
                usernamesure() { //用户名重名检测
                    let $usernameflag = true;
                    this.username.on('blur', () => {
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost/JS2004/Second-step/dangdangwang1/php/registry.php',
                            data: {
                                username: this.username.val()
                            }
                        }).done((result) => {
                            if (!result) { //不存在
                                this.span.eq(0).html('√').css('color', 'green');
                                $usernameflag = true;
                            } else {
                                this.span.eq(0).html('该用户名已经存在').css('color', 'red');
                                $usernameflag = false;
                            }
                        })
                    });
                    this.form.on('submit', () => {
                        if (this.username.val() == '') {
                            this.span.eq(0).html('用户名不能为空').css('color', 'red');
                            $usernameflag = false;
                        }
                        if (!$usernameflag) {
                            return false; //阻止提交
                        }
                    });
                }
            }
            new Registry().init();
        }
    }
});