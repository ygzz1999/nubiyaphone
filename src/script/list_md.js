define(['jlazyload', 'pagination'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.list ul');
            let $array_default = [];
            let $array = [];
            let $prev = [];
            let $next = [];
            $.ajax({
                url: 'http://10.31.161.56/dashboard/nubiyaphone/php/listdata.php',
                dataType: 'json'
            }).done(function(datalist) {
                data = datalist.pagedata;

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
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });

                $('.list li').each(function(index, element) { //element:原生的元素对象
                    $array_default[index] = $(this); //排序前
                    $array[index] = $(this); //排序后
                });

                // 分页设置
                $('.page').pagination({
                    pageCount: datalist.pageno, //总的页数
                    jump: true, //是否开启跳转到指定的页数，布尔值。
                    prevContent: '上一页',
                    nextContent: '下一页',
                    callback: function(api) {
                        console.log(api.getCurrent()); //获取当前的点击的页码。
                        $.ajax({
                            url: 'http://10.31.161.56/dashboard/nubiyaphone/php/listdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(datalist) {
                            data = datalist.pagedata; //获取接口里面数据
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
                            //懒加载
                            $("img.lazy").lazyload({ effect: "fadeIn" });

                            //将li元素添加到排序前的数组中。
                            $('.list li').each(function(index, element) {
                                $array_default[index] = $(this); //排序前
                                $array[index] = $(this); //排序后
                            });
                            console.log($array_default);
                        });
                    }
                });


                $('button').eq(0).on('click', function() {
                    //遍历渲染。
                    $.each($array_default, function(index, value) { //value就是li元素
                        $list.append(value);
                    });
                });

                $('button').eq(1).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('span').html().substring(1)); //下一个价格
                            if ($prev > $next) {
                                //通过价格的比较,交换的是里面的这个li元素
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) { //value就是li元素
                        $list.append(value);
                    });
                });

                $('button').eq(2).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('span').html().substring(1)); //下一个价格
                            if ($prev < $next) {
                                //通过价格的比较,交换的是里面的这个li元素
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) { //value就是li元素
                        $list.append(value);
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

            $('.admin a').on('click', function() {
                $('.admin').hide();
                $('.login').show();
                localStorage.removeItem('loginname');
            });
        }
    }
});