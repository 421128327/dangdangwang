define([], function() {
    return {
        init: function() {
            class Render {
                constructor() {
                    this.arrsid = [];
                    this.arrnum = [];
                    this.sum = $('#payAmount');
                    this.arr = [];
                    this.del = null;
                }
                init() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        this.arrsid = $.cookie('cookiesid').split(',');
                        this.arrnum = $.cookie('cookienum').split(',');
                        for (let i = 0; i < this.arrsid.length; i++) {
                            this.rendercart(this.arrsid[i], this.arrnum[i]);
                        }
                    }
                }
                rendercart(sid, num) {
                    $.ajax({
                        url: 'http://localhost/JS2004/Second-step/dangdangwang1/php/data.php',
                        dataType: 'json'
                    }).done(function(data) {
                        let strhtml = '';
                        $.each(data, function(index, value) {
                            if (value.sid == sid) {
                                strhtml += `
                                <table class="shop_title" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <input type="checkbox" class="all storebox">
                                    </td>
                                    <td>
                                        <a href="javascript:;">${value.storename}</a>
                                    </td>
                                </tr>
                            </table>
                            <div class="cart_table">
                                <table cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td class="row1">
                                            <input type="checkbox" class="all usebox">
                                        </td>
                                        <td class="row_img">
                                            <a href="javascript:;">
                                                <img src="${value.url}" alt="" width="80" height="80" sid="${value.sid}">
                                            </a>
                                        </td>
                                        <td class="row_name">
                                            <div class="name">
                                                <a href="javascript:;">${value.maintitle}</a>
                                            </div>
                                        </td>
                                        <td class="price_every">
                                            <span>¥${value.price}</span>
                                        </td>
                                        <td class="row3">
                                            <span class="amount">
                                                <a href="javascript:;" class="down">-</a>
                                                <input type="text" value="${num}" class="itemnum">
                                                <a href="javascript:;" class="add">+</a>
                                            </span>
                                        </td>
                                        <td class="row4">
                                            <span class="red sum">¥${(value.price*num).toFixed(2)}</span>
                                        </td>
                                        <td class="row5">
                                            <span>
                                                <a href="javascript:;" class="fn-add-wish">移入收藏</a>
                                            </span>
                                            <span>
                                                <a href="javascript:;" class="fn-remove-product">删除
                                                </a>
                                            </span>
                                        </td>
                                    </tr>
                                    <tfoot>
                                        <tr class="total">
                                            <td class="row1">&nbsp;</td>
                                            <td class="row_img">店铺合计</td>
                                            <td colspan="2">&nbsp;</td>
                                            <td colspan="3" class="row4">
                                                <span class="red big">¥${(value.price*num).toFixed(2)}</span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                                `;
                                $('#cart .item').get(0).innerHTML += strhtml;
                            }
                        });
                        this.sumbox = $('#cart .item .sum');
                        this.checkbox = $('#cart .item .all');
                        this.storebox = $('#cart .item .storebox');
                        this.del = $('#cart .item .fn-remove-product');
                        this.count = $('.sum .sum_left .a .red');
                        const usebox = $('#cart .item .usebox');
                        let _this = this;
                        let sum = 0;
                        let arrsid = [];
                        let arrnum = [];
                        for (let i = 0; i < usebox.length; i++) {
                            usebox[i].index = i;
                        }
                        for (let i = 0; i < this.storebox.length; i++) {
                            this.storebox[i].index = i;
                        }
                        for (let i = 0; i < this.del.length; i++) {
                            this.del[i].index = i;
                        }
                        //全选功能
                        $('#allselect').on('click', () => {
                            this.checkbox.prop('checked', $('#allselect').prop('checked'));
                            $('#cart .f1 .allselect').prop('checked', $('#allselect').prop('checked'));
                            for (let i = 0; i < usebox.length; i++) {
                                if ($(usebox[i]).prop('checked')) {
                                    sum = sum + parseFloat(_this.sumbox.eq(i).html().substring(1));
                                } else {
                                    sum = sum - parseFloat(_this.sumbox.eq(i).html().substring(1));
                                }
                                $('#payAmount').html('¥' + sum.toFixed(2));
                                if ($('#payAmount').html().substring(1) > 0) {
                                    $('#checkout_btn').css('background', '#ff0000');
                                } else {
                                    $('#checkout_btn').css('background', '#e1e1e1');
                                }
                            }
                        });
                        this.checkbox.on('click', () => {
                            console.log($('#cart .item input:checked').length + 1);
                            if (this.checkbox.length === $('#cart .item input:checked').length + 1) {
                                $('#allselect').prop('checked', true);
                                $('#cart .f1 .allselect').prop('checked', true);
                            } else {
                                $('#allselect').prop('checked', false);
                                $('#cart .f1 .allselect').prop('checked', false);
                            }
                        });
                        usebox.on('click', function() {
                            _this.count.html($('#cart .item .usebox:checked').length);
                            _this.storebox.eq(this.index).prop('checked', $(this).prop('checked'));
                            if ($(this).prop('checked')) {
                                sum = sum + parseFloat(_this.sumbox.eq(this.index).html().substring(1));
                            } else {
                                sum = sum - parseFloat(_this.sumbox.eq(this.index).html().substring(1));
                            }
                            $('#payAmount').html('¥' + sum.toFixed(2));
                            if ($('#payAmount').html().substring(1) > 0) {
                                $('#checkout_btn').css('background', '#ff0000');
                            } else {
                                $('#checkout_btn').css('background', '#e1e1e1');
                            }
                        });
                        this.storebox.on('click', function() {
                            $(usebox[this.index]).prop('checked', $(this).prop('checked'));
                            if ($(this).prop('checked')) {
                                sum = sum + parseFloat(_this.sumbox.eq(this.index).html().substring(1));
                            } else {
                                sum = sum - parseFloat(_this.sumbox.eq(this.index).html().substring(1));
                            }
                            $('#payAmount').html('¥' + sum.toFixed(2));
                            if ($('#payAmount').html().substring(1) > 0) {
                                $('#checkout_btn').css('background', '#ff0000');
                            } else {
                                $('#checkout_btn').css('background', '#e1e1e1');
                            }
                        });
                        //+号加商品
                        $('.add').on('click', function() {
                            let $num = $(this).parents('.amount').find('.itemnum').val();
                            let $price = $(this).parents('.cart_table').find('.price_every').find('span').html().substring(1);
                            $num++;
                            $(this).parents('.amount').find('.itemnum').val($num);
                            $(this).parents('.cart_table').find('.row4').find('.sum').html('¥' + ($price * $num).toFixed(2));
                            $(this).parents('.cart_table').find('.total').find('.row4').find('.big').html('¥' + ($price * $num).toFixed(2));
                            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                                arrsid = $.cookie('cookiesid').split(',');
                                arrnum = $.cookie('cookienum').split(',');
                            } else {
                                arrsid = [];
                                arrnum = [];
                            }
                            let $sid = $(this).parents('.cart_table').find('img').attr('sid');
                            arrnum[$.inArray($sid, arrsid)] = $(this).parents('.amount').find('.itemnum').val();
                            $.cookie('cookienum', arrnum, {
                                expires: 7,
                                path: '/'
                            })
                        });
                        //-号减商品
                        $('.down').on('click', function() {
                            let $num = $(this).parents('.amount').find('.itemnum').val();
                            let $price = $(this).parents('.cart_table').find('.price_every').find('span').html().substring(1);
                            $num--;
                            if ($num < 1) {
                                $num = 1;
                            }
                            $(this).parents('.amount').find('.itemnum').val($num);
                            $(this).parents('.cart_table').find('.row4').find('.sum').html('¥' + ($price * $num).toFixed(2));
                            $(this).parents('.cart_table').find('.total').find('.row4').find('.big').html('¥' + ($price * $num).toFixed(2));
                            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                                arrsid = $.cookie('cookiesid').split(',');
                                arrnum = $.cookie('cookienum').split(',');
                            } else {
                                arrsid = [];
                                arrnum = [];
                            }
                            let $sid = $(this).parents('.cart_table').find('img').attr('sid');
                            arrnum[$.inArray($sid, arrsid)] = $(this).parents('.amount').find('.itemnum').val();
                            $.cookie('cookienum', arrnum, {
                                expires: 7,
                                path: '/'
                            })
                        });
                        //输入商品数量
                        $('.amount .itemnum').on('input', function() {
                            let $num = $(this).parents('.amount').find('.itemnum').val();
                            let $price = $(this).parents('.cart_table').find('.price_every').find('span').html().substring(1);
                            let $reg = /^\d+$/g;
                            let $value = $(this).val();
                            if (!$reg.test($value)) {
                                $(this).val(1);
                                $(this).parents('.cart_table').find('.row4').find('span').html('¥' + $price);
                            } else {
                                $(this).parents('.cart_table').find('.row4').find('.sum').html('¥' + ($price * $num).toFixed(2));
                                $(this).parents('.cart_table').find('.total').find('.row4').find('.big').html('¥' + ($price * $num).toFixed(2));
                            }

                            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                                arrsid = $.cookie('cookiesid').split(',');
                                arrnum = $.cookie('cookienum').split(',');
                            } else {
                                arrsid = [];
                                arrnum = [];
                            }
                            let $sid = $(this).parents('.cart_table').find('img').attr('sid');
                            arrnum[$.inArray($sid, arrsid)] = $(this).parents('.amount').find('.itemnum').val();
                            $.cookie('cookienum', arrnum, {
                                expires: 7,
                                path: '/'
                            });
                        });
                        //删除
                        $('#cart .item .fn-remove-product').on('click', function() {
                            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                                arrsid = $.cookie('cookiesid').split(',');
                                arrnum = $.cookie('cookienum').split(',');
                            } else {
                                arrsid = [];
                                arrnum = [];
                            }
                            if (window.confirm('你确定要删除吗?')) {
                                $(this).parents('.item').find('table').remove();
                                $(this).parents('.cart_table').remove();

                                let $index = -1;
                                let sid = $(this).parents('.cart_table').find('img').attr('sid');
                                $.each(arrsid, function(index, value) {
                                    if (sid == value) {
                                        $index = index;
                                    }
                                });
                                arrsid.splice($index, 1);
                                arrnum.splice($index, 1);
                                $.cookie('cookiesid', arrsid, {
                                    expires: 7,
                                    path: '/'
                                });
                                $.cookie('cookienum', arrnum, {
                                    expires: 7,
                                    path: '/'
                                });
                            }
                        });
                        //全部删除
                        $('#delall').on('click', function() {
                            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                                arrsid = $.cookie('cookiesid').split(',');
                                arrnum = $.cookie('cookienum').split(',');
                            } else {
                                arrsid = [];
                                arrnum = [];
                            }
                            if (window.confirm('你确定要全部删除吗?')) {
                                $('.cart_table').each(function() {
                                    if ($(this).find(':checkbox').is(':checked')) {
                                        $(this).parents('.item').find('table').remove();
                                        $(this).remove();
                                        $('#payAmount').html('¥0.00');
                                        let $index = -1;
                                        let sid = $(this).find('img').attr('sid');
                                        $.each(arrsid, function(index, value) {
                                            if (sid == value) {
                                                $index = index;
                                            }
                                        });
                                        arrsid.splice($index, 1);
                                        arrnum.splice($index, 1);
                                        $.cookie('cookiesid', arrsid, {
                                            expires: 7,
                                            path: '/'
                                        });
                                        $.cookie('cookienum', arrnum, {
                                            expires: 7,
                                            path: '/'
                                        });
                                    }
                                });
                            }
                        });
                    });

                }
            }
            new Render().init();
        }
    }
});