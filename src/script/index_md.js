define([], () => {
    return {
        init: function() {
            const $lunbo = $('.lunbo');
            const $piclist = $('.lunbo ul li');
            const $btnlist = $('.lunbo ol li');
            const $left = $('#left');
            const $right = $('#right');
            let $num = 0;
            let $timer1 = null;
            let $timer2 = null;
            //1.小圆圈切换
            $btnlist.on('mouseover', function() {
                $num = $(this).index();
                $timer1 = setTimeout(function() {
                    tabswitch()
                }, 300);


            });

            $btnlist.on('mouseout', function() {
                clearTimeout($timer1);
            });

            //2.左右箭头切换
            $right.on('click', function() {
                $num++;
                if ($num > $btnlist.length - 1) {
                    $num = 0;
                }

                tabswitch()
            });

            $left.on('click', function() {
                $num--;
                if ($num < 0) {
                    $num = $btnlist.length - 1;
                }

                tabswitch()
            });

            function tabswitch() {
                $btnlist.eq($num).addClass('active').siblings().removeClass('active');
                $piclist.eq($num).stop(true).animate({
                    opacity: 1
                }).siblings().stop(true).animate({
                    opacity: 0
                });
            }

            //3.自动轮播
            $timer2 = setInterval(function() {
                $right.click();
            }, 3000);

            //4.鼠标控制定时器停止和开启。
            $lunbo.hover(function() {
                clearInterval($timer2);
            }, function() {
                $timer2 = setInterval(function() {
                    $right.click();
                }, 3000);
            });


            const $list = $('.head-ul li');
            const $cartlist = $('.head-ul-xiala');
            const $boxlist = $('.head-ul-xiala-box1');
            $list.hover(function() {
                $cartlist.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                $boxlist.eq($(this).index()).show().siblings('.head-ul-xiala-box1').hide();
            }, function() {
                $cartlist.hide();
            })



            // $list.hover(function() {
            //     $cartlist.show();
            //     // $(this).addClass('active').siblings('li').removeClass('active');
            //     //切换内容发生改变，不同的li对应不同的内容块。
            //     $img.eq($(this).index()).show().siblings('.head-ul-xiala').hide();

            //     //改变右侧的大盒子的位置
            //     let $scrolltop = $(window).scrollTop();
            //     let $bannertop = $('.head-ul').offset().top;
            //     if ($scrolltop > $bannertop) {
            //         $cartlist.css({
            //             top: $scrolltop - $bannertop
            //         });
            //     } else {
            //         $cartlist.css({
            //             top: 60
            //         });
            //     }
            // }, function() {
            //     $cartlist.hide();
            // });

            //2.鼠标移入右侧的大盒子，大盒子依然显示隐藏
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