define([], function() {
    return {
        init: function() {
            const $list2 = $('.head-ul li');
            const $cartlist = $('.head-ul-xiala');
            const $boxlist = $('.head-ul-xiala-box1');
            $list2.hover(function() {
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
})