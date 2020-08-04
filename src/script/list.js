define([], function() {
    return {
        init: function() {
            class Pagination { //分页排序功能
                constructor() {
                    this.default = $('.tools .toolsleft .icon .default');
                    this.sort_down = $('.tools .toolsleft .icon .icon_sort1');
                    this.sort_up = $('.tools .toolsleft .icon .icon_sort2');
                }
                init() {
                    let array_default = [];
                    let array = [];
                    let prev = null;
                    let next = null;
                    //渲染列表页
                    const goodslist = $('main .shoplist');
                    $.ajax({
                        url: 'http://localhost/JS2004/Second-step/dangdangwang1/php/listdata.php',
                        dataType: 'json'
                    }).done(function(data) {
                        let strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            strhtml += `
                                    <a href="details.html?sid=${value.sid}" target="_blank">
                                        <li class="line1">
                                            <img  data-original="${value.url}" class="lazy" width="200" height="200" alt="${value.maintitle}"/>
                                            <p class="price">
                                                <span class="price_n">¥${value.price}</span>
                                                <a>定价：</a>
                                                <span class="price_r">${value.price_r}</span>
                                                <span class="price_s">${value.price_s}</span>
                                            </p>
                                            <p class="name">
                                                <a>${value.maintitle}</a>
                                            </p>
                                            <p class="search_hot_word">${value.title}</p>
                                            <p class="star">
                                                <a>${value.star}</a>
                                            </p>
                                            <div class="link">
                                                <span class="iconfont icon-dianpu"></span>
                                                <a>${value.storename}</a>
                                            </div>
                                            <span class="new_lable">
                                                <span class="new_lable2">限时抢</span>
                                                <span class="new_lable2">满25-1</span>
                                            </span>
                                            <div class="shop_button">
                                                <p class="bottom_p">
                                                    <a class="btn_cart">
                                                        <span class="iconfont icon-gouwuche"></span>加入购物车
                                                    </a>
                                                    <a class="btn_like">收藏</a>
                                                </p>
                                            </div>
                                        </li>
                                    </a>
                                `;
                        });
                        strhtml += '</ul>';
                        goodslist.html(strhtml);
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        //对排序进行赋值
                        array_default = [];
                        array = [];
                        prev = null;
                        next = null;

                        //将页面的li元素加载到两个数组中
                        $('.shoplist li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                    $('.page').pagination({
                        pageCount: 3,
                        jump: true,
                        prevContent: '上一页',
                        nextContent: '下一页',
                        callback: function(api) {
                            $.ajax({
                                url: 'http://localhost/JS2004/Second-step/dangdangwang1/php/listdata.php',
                                data: {
                                    page: api.getCurrent()
                                },
                                dataType: 'json'
                            }).done(function(data) {
                                let strhtml = '<ul>';
                                $.each(data, function(index, value) {
                                    strhtml += `
                                    <a href="details.html?sid=${value.sid}" target="_blank">
                                        <li class="line1">
                                            <img  data-original="${value.url}" class="lazy" width="200" height="200" alt="${value.maintitle}"/>
                                            <p class="price">
                                                <span class="price_n">¥${value.price}</span>
                                                <a>定价：</a>
                                                <span class="price_r">${value.price_r}</span>
                                                <span class="price_s">${value.price_s}</span>
                                            </p>
                                            <p class="name">
                                                <a>${value.maintitle}</a>
                                            </p>
                                            <p class="search_hot_word">${value.title}</p>
                                            <p class="star">
                                                <a>${value.star}</a>
                                            </p>
                                            <div class="link">
                                                <span class="iconfont icon-dianpu"></span>
                                                <a>${value.storename}</a>
                                            </div>
                                            <span class="new_lable">
                                                <span class="new_lable2">限时抢</span>
                                                <span class="new_lable2">满25-1</span>
                                            </span>
                                            <div class="shop_button">
                                                <p class="bottom_p">
                                                    <a class="btn_cart">
                                                        <span class="iconfont icon-gouwuche"></span>加入购物车
                                                    </a>
                                                    <a class="btn_like">收藏</a>
                                                </p>
                                            </div>
                                        </li>
                                    </a>
                                `;
                                });
                                strhtml += '</ul>';
                                goodslist.html(strhtml);
                                $(function() {
                                    $("img.lazy").lazyload({ effect: "fadeIn" });
                                });

                                array_default = [];
                                array = [];
                                prev = null;
                                next = null;

                                $('.shoplist li').each(function(index, element) {
                                    array[index] = $(this);
                                    array_default[index] = $(this);
                                });
                            })
                        }
                    });
                    //排序
                    this.default.on('click', () => {
                        this.sort_up.show();
                        this.default.hide();
                        //升序排序
                        for (let i = 0; i < array.length - 1; i++) {
                            for (let j = 0; j < array.length - i - 1; j++) {

                                prev = parseFloat(array[j].find('.price_n').html().substring(1));
                                next = parseFloat(array[j + 1].find('.price_n').html().substring(1));

                                if (prev > next) {
                                    let temp = array[j];
                                    array[j] = array[j + 1];
                                    array[j + 1] = temp;
                                }
                            }
                        }

                        $.each(array, function(index, value) {
                            $('.shoplist ul').append(value);
                        });
                    });
                    this.sort_up.on('click', () => {
                        this.sort_up.hide();
                        this.sort_down.show();
                        //降序排序
                        for (let i = 0; i < array.length - 1; i++) {
                            for (let j = 0; j < array.length - i - 1; j++) {
                                prev = parseFloat(array[j].find('.price_n').html().substring(1));
                                next = parseFloat(array[j + 1].find('.price_n').html().substring(1));
                                //通过价格的判断，改变的是li的位置。
                                if (prev < next) {
                                    let temp = array[j];
                                    array[j] = array[j + 1];
                                    array[j + 1] = temp;
                                }
                            }
                        }
                        //换完li位置，进行渲染。
                        $.each(array, function(index, value) {
                            console.log(value);
                            $('.shoplist ul').append(value);
                        });
                    });
                    this.sort_down.on('click', () => {
                        this.sort_up.show();
                        this.sort_down.hide();
                        //升序排序
                        for (let i = 0; i < array.length - 1; i++) {
                            for (let j = 0; j < array.length - i - 1; j++) {
                                //取出array的价格，price进行排序
                                prev = parseFloat(array[j].find('.price_n').html().substring(1));
                                next = parseFloat(array[j + 1].find('.price_n').html().substring(1));
                                //通过价格的判断，改变的是li的位置。
                                if (prev > next) {
                                    let temp = array[j];
                                    array[j] = array[j + 1];
                                    array[j + 1] = temp;
                                }
                            }
                        }

                        //换完li位置，进行渲染。
                        $.each(array, function(index, value) {
                            console.log(value); //n.fn.init [li, context: li]
                            $('.shoplist ul').append(value);
                        });
                    });
                }
            }
            new Pagination().init();
        }
    }
});