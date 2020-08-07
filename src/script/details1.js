define([], function() {
    return {
        init: function() {
            class Render {
                constructor() {
                    this.navtitle = $('.nav .navtitle');
                    this.wrap = $('.main .picinfo');
                    this.pic = $('.main .picinfo .pic img');
                    this.piclist = $('#ullist ul');
                    this.name = $('.showinfo .name_info h1');
                    this.hotword = $('.showinfo .name_info .hot');
                    this.star = $('.showinfo .messbox_info .pinglun .star');
                    this.price = $('#dd-price');
                    this.price_s = $('#dd-zhe');
                    this.price_r = $('#order-price .op');
                    this.movebox = $('.main .picinfo .pic .move');
                    this.bf = $('.main .picinfo .bigpic');
                    this.spic = $('.main .picinfo .pic');
                    this.bigpic = $('.main .picinfo .bigpic img');
                    this.leftarrow = $('.main .picinfo .bottom .left');
                    this.rightarrow = $('.main .picinfo .bottom .right');
                    this.btn_cart = $('.main .showinfo .buy_box .buy_button .btn_cart');
                    this.arrsid = [];
                    this.arrnum = [];
                    this.sid = location.search.substring(1).split('=')[1];
                    this.buy_num = $('#buy-num');
                    this.add = $('#num_add');
                    this.del = $('#num_del');
                }
                init() { //详情页的渲染
                    let sid = location.search.substring(1).split('=')[1];
                    $.ajax({
                        url: 'http://localhost/JS2004/Second-step/dangdangwang1/php/getsid.php',
                        data: {
                            sid: sid
                        },
                        dataType: 'json'
                    }).done((data) => {
                        this.navtitle.html(data.maintitle);
                        this.pic.attr('src', '' + data.url);
                        this.name.attr('title', '' + data.maintitle);
                        this.name.html(data.maintitle);
                        this.hotword.html(data.title);
                        this.hotword.attr('title', '' + data.title);
                        this.star.html(data.star);
                        this.bigpic.attr('src', '' + data.url);
                        let pricehtml = `<span class="yen">¥</span>${data.price}`;
                        this.price.html(pricehtml);
                        this.price_s.html(data.price_s);
                        let orderhtml = `<span class="yen">¥</span>${data.price_r}`;
                        this.price_r.html(orderhtml);
                        let arr = data.piclisturl.split(',');
                        let strhtml = '';
                        $.each(arr, function(index, value) {
                            strhtml += `<li>
                                <img src=${value} width="54" height="54">
                            </li>`
                        });
                        this.piclist.html(strhtml);
                        if (arr.length > 5) {
                            this.leftarrow.show();
                            this.rightarrow.show();
                        } else {
                            this.leftarrow.hide();
                            this.rightarrow.hide();
                        }
                    });
                    this.scale();
                    this.picchange();
                    this.arrow();
                    this.addtocart();
                    this.btn();
                }
                scale() { //放大镜效果
                    //计算移动盒子的尺寸
                    let boxwidth = this.spic.width() * this.bf.width() / this.bigpic.width();
                    let boxheight = this.spic.height() * this.bf.height() / this.bigpic.height();
                    let bili = this.bigpic.width() / this.spic.width();
                    this.spic.on('mouseover', (ev) => {
                        this.movebox.width(boxwidth);
                        this.movebox.height(boxheight);
                        this.movebox.css('visibility', 'visible');
                        this.movebox.css('cursor', 'move');
                        this.bf.css('visibility', 'visible');
                        this.spic.on('mousemove', (ev) => {
                            let $left = ev.pageX - this.wrap.offset().left - this.movebox.width() / 2;
                            let $top = ev.pageY - this.wrap.offset().top - this.movebox.height() / 2;
                            if ($left <= 0) {
                                $left = 0;
                            } else if ($left >= this.spic.width() - this.movebox.width()) {
                                $left = this.spic.width() - this.movebox.width();
                            }
                            if ($top <= 0) {
                                $top = 0;
                            } else if ($top >= this.spic.height() - this.movebox.height()) {
                                $top = this.spic.height() - this.movebox.height();
                            }
                            this.movebox.css({
                                left: $left,
                                top: $top
                            });
                            this.bigpic.css({
                                left: -bili * $left,
                                top: -bili * $top
                            });
                        });
                    });
                    this.spic.on('mouseout', () => {
                        this.movebox.css('visibility', 'hidden');
                        this.bf.css('visibility', 'hidden');
                    });
                }
                picchange() { //鼠标移入图片，切换图片
                    let _this = this;
                    this.piclist.on('mouseover', 'li', function() {
                        let $url = $(this).find('img').attr('src');
                        _this.pic.attr('src', $url);
                        _this.bigpic.attr('src', $url);
                    });
                }
                arrow() { //左右箭头事件
                    let $num = 5;
                    this.rightarrow.on('click', () => {
                        let $len = $('#ullist ul li').length; //6
                        let count = 1;
                        let $movewidth = $('#ullist').outerWidth(true);
                        if ($len > $num) {
                            $num++;
                            this.piclist.animate({
                                left: -$movewidth * ($num - count * 5)
                            });
                            count++;
                            $num += 4;
                        } else {
                            let current = parseInt(this.piclist.css('left'));
                            this.piclist.animate({
                                left: current + $movewidth
                            });
                            $num -= 5;
                        }
                    });
                    this.leftarrow.on('click', () => {
                        let $len = $('#ullist ul li').length; //6
                        let count = 1;
                        let $movewidth = $('#ullist').outerWidth(true);
                        if ($len > $num) {
                            $num++;
                            this.piclist.animate({
                                left: -$movewidth * ($num - count * 5)
                            });
                            count++;
                            $num += 4;
                        } else {
                            let current = parseInt(this.piclist.css('left'));
                            this.piclist.animate({
                                left: current + $movewidth
                            });
                            $num -= 5;
                        }
                    });
                }
                addcookie() { //提前获取cookie，将其转换成数组
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        this.arrsid = $.cookie('cookiesid').split(',');
                        this.arrnum = $.cookie('cookienum').split(',');
                    } else {
                        this.arrsid = [];
                        this.arrnum = [];
                    }
                }
                addtocart() { //点击添加购物车事件
                    this.btn_cart.on('click', () => {
                        this.addcookie();
                        if (this.arrsid.indexOf(this.sid) === -1) {
                            this.arrsid.push(this.sid);
                            this.arrnum.push(this.buy_num.val());
                            $.cookie('cookiesid', this.arrsid.toString(), {
                                expires: 7,
                                path: '/'
                            });
                            $.cookie('cookienum', this.arrnum.toString(), {
                                expires: 7,
                                path: '/'
                            });
                        } else {
                            let num = this.arrsid.indexOf(this.sid);
                            this.arrnum[num] = parseInt(this.arrnum[num]) + parseInt(this.buy_num.val());
                            $.cookie('cookienum', this.arrnum.toString(), {
                                expires: 7,
                                path: '/'
                            });
                        }
                        alert('添加购物车成功！');
                    });
                }
                btn() {
                    this.add.on('click', () => {
                        let num = this.buy_num.val();
                        num = Number(num) + 1;
                        this.buy_num.val(num);
                    });
                    this.del.on('click', () => {
                        let num = this.buy_num.val();
                        num = Number(num) - 1;
                        if (this.buy_num.val() == 1) {
                            num = 1;
                        }
                        this.buy_num.val(num);
                    });
                }
            }
            new Render().init();
        }
    }
});