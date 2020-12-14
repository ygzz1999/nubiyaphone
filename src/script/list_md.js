define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.list ul');
            $.ajax({
                url: 'http://localhost/dashboard/nubiyaphone/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                <p>${value.title}</p>
                                <span>￥${value.price}</span>
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
                //渲染的下面进行懒加载操作
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });

            const $list1 = $('.head-ul li');
            const $cartlist = $('.head-ul-xiala');
            const $boxlist = $('.head-ul-xiala-box1');
            $list1.hover(function() {
                $cartlist.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                $boxlist.eq($(this).index()).show().siblings('.head-ul-xiala-box1').hide();
            }, function() {
                $cartlist.hide();
            })
            $cartlist.hover(function() {
                $cartlist.show();
            }, function() {
                $cartlist.hide();
            });
            if (localStorage.getItem('loginname')) {
                $('.admin').show();
                $('.login').hide();
                $('.admin span').html(localStorage.getItem('loginname'));
            }

            //退出登录 - 删除本地存储
            $('.admin a').on('click', function() {
                $('.admin').hide();
                $('.login').show();
                localStorage.removeItem('loginname');
            });
        }
    }
});