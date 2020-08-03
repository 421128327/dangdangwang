;
! function() {
    //1.渲染首页列表
    //后端提供接口
    //前端获取接口数据，进行渲染。
    const goodslist = document.querySelector('.goodslist');
    //http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php
    $ajaxpromise({
        url: 'http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php'
    }).then(function(data) {
        let taobaoarr = JSON.parse(data); //数据转对象。
        // console.log(taobaoarr);
        let strhtml = '<ul>';
        for (let value of taobaoarr) {
            strhtml += `
                <a href="details.html?sid=${value.sid}" target="_blank">
                    <li>
                        <img src="${value.url}"/>
                        <p>${value.title}</p>
                        <span>${value.price}</span>
                        <span>${value.sailnumber}</span>
                    </li>
                </a>
            `;
        }
        strhtml += '</ul>';
        goodslist.innerHTML = strhtml;
    })

}();