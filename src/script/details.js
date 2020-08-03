;
! function() {
    //1.获取地址栏sid
    let sid = location.search.substring(1).split('=')[1]; //获取地址栏sid
    console.log(sid);
    //将sid传给后端。
    $ajaxpromise({
        url: 'http://localhost:8088/JS2004/Day%2027_cart/php/getsid.php',
        data: {
            sid: sid
        }
    }).then(function(data) { //2.获取后端返回的对应的数据进行渲染。
        let taobaoobj = JSON.parse(data);
        console.log(taobaoobj);
        $('#spic img').src = taobaoobj.url;
        $('.loadtitle').innerHTML = taobaoobj.title;
        $('.loadpcp').innerHTML = taobaoobj.price;

        let listurl = taobaoobj.piclisturl;
        console.log(listurl.split(','));
        let picarr = listurl.split(',');
        let strhtml = '';
        for (let value of picarr) {
            strhtml += `<li><img src="${value}"></li>`;
        }
        $('#list ul').innerHTML = strhtml;
    });


    //3.购物车操作 - cookie
    //3.1.cookie里面存储商品的sid和商品的数量
    //3.2.利用两个数组分别存储sid和数量。先将sid和数量放入数组，然后存储cookie

    let arrsid = []; //存储商品的sid
    let arrnum = []; //商品的数量

    //3.3.如何确定商品的提交次数，第一次添加商品，创建购物车列表，从第二次开始只需要商品的数量进行累加。
    //商品如果是从第二次开始添加，cookie中应该存在商品的编号sid。利用存在的cookie进行判断，必须先获取cookie。
    //一开始约定好cookie里面存储sid和数量的key值。
    //cookiesid   cookienum key值分别表示存储cookie的编号和数量。

    //3.4提前获取cookie值，将其转换成数组。
    function cookietoarray() {
        if (cookie.get('cookiesid') && cookie.get('cookienum')) { //cookie存在
            arrsid = cookie.get('cookiesid').split(',');
            arrnum = cookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    $('.p-btn a').onclick = function() {
        cookietoarray(); //每次点击，重新获取cookie,转换成数组
        //先判断当前的商品是第一次存储，还是第二次或者多次存在。
        if (arrsid.indexOf(sid) === -1) { //第一次
            //将当前商品的sid添加到数组中
            arrsid.push(sid);
            //将当前商品的数量添加到数组中
            arrnum.push($('#count').value);

            //存储cookie
            cookie.set('cookiesid', arrsid.toString(), 7);
            cookie.set('cookienum', arrnum.toString(), 7);
        } else { //第二次或者多次
            //第二次或者多次无需创建商品列表，商品的编号不会发生变化。
            //对应的商品的数量进行累加。
            //随时获取当前商品的sid，通过sid的位置获取数量。
            let num = arrsid.indexOf(sid); //当前sid在数组中的位置。
            arrnum[num] = parseInt(arrnum[num]) + parseInt($('#count').value); //获取sid对应的数量+新加的值，再赋值给对应的位置

            //重新添加cookie
            cookie.set('cookienum', arrnum.toString(), 7);
        }
        alert('按钮被触发了');
    }

}();