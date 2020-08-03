;
! function() {
    //1.获取cookie进行渲染。
    if (cookie.get('cookiesid') && cookie.get('cookienum')) { //cookie存在
        arrsid = cookie.get('cookiesid').split(','); //[1,3,5]
        arrnum = cookie.get('cookienum').split(','); //[10,140,50]
        for (let i = 0; i < arrsid.length; i++) {
            rendercart(arrsid[i], arrnum[i]);
        }
    }


    function rendercart(sid, num) { //sid:商品的编号  num:商品的数量
        //http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php
        //获取所有的数据,和当前的sid进行比较，确定那条数据是匹配的。
        $ajaxpromise({
            url: 'http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php'
        }).then(function(data) {
            console.log(JSON.parse(data));
            let arrdata = JSON.parse(data);
            let strhtml = '';
            for (let value of arrdata) {
                if (value.sid == sid) {
                    strhtml += `
                    <div class="goods-item goods-item-sele">
                    <div class="goods-info">
                        <div class="cell b-checkbox">
                            <div class="cart-checkbox">
                                <input type="checkbox" checked="" name="" id="" value="" />
                                <span class="line-circle"></span>
                            </div>
                        </div>
                        <div class="cell b-goods">
                            <div class="goods-name">
                                <div class="goods-pic">
                                    <a href=""><img src="${value.url}" alt="" /></a>
                                </div>
                                <div class="goods-msg">
                                    <div class="goods-d-info">
                                        <a href="">${value.title}</a>
                                    </div>
                                    <div class="goods-ex">
                                        <span class="promise"></span>
                                        <span class="promise">
                                            <i></i><a href="">购买京东服务</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cell b-props">
                            <div class="prop-text"></div>
                        </div>
                        <div class="cell b-price">
                            <strong>${value.price}</strong>
                            <a class="sales-promotion" href="">
                                促销优惠
                                <b></b>
                            </a>
                            <div class="sales-promotion-dropdown">
                            </div>
                        </div>
                        <div class="cell b-quantity">
                            <div class="quantity-form">
                                <a class="quantity-down" href="javascript:void(0)">-</a>
                                <input type="text" value="${num}" />
                                <a class="quantity-add" href="javascript:void(0)">+</a>
                            </div>
                            <div class="quantity-text">有货</div>
                        </div>
                        <div class="cell b-sum">
                            <strong>${(value.price*num).toFixed(2)}</strong>
                        </div>
                        <div class="cell b-action">
                            <a href="javascript:void(0)">删除</a>
                        </div>
                    </div>
                </div>
                    `;

                    $('.item-list').innerHTML += strhtml;
                }
            }
        });
    }

}();