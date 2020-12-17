define([], function() {
    return {
        init: function() {
            let $form = $('#form');
            let $username = $('#username');
            let $password = $('#password');
            let $span = $('#form span');

            $userflag = true;
            $passflag = true;

            //用户名
            $username.on('focus', function() {
                $span.eq(0).html('请输入11位正确的手机号码').css('color', '#333');
            });
            $username.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        $span.eq(0).html('√').css('color', 'green');
                        $userflag = true;
                    } else {
                        $span.eq(0).html('手机号码有误').css('color', 'red');
                        $userflag = false;
                    }
                } else {
                    $span.eq(0).html('手机号码不能为空').css('color', 'red');
                    $userflag = false;
                }
            });

            //密码验证
            $password.on('focus', function() {
                $span.eq(1).html('请输入密码,长度为8-14个字符').css('color', '#333');

            });
            $password.on('blur', function() {
                let $value = $(this).val();
                if ($value.length >= 8 && $value.length <= 14) {
                    $span.eq(1).html('√').css('color', 'green');
                    $passflag = true;
                } else {
                    $span.eq(1).html('输入的密码长度有误').css('color', 'red');
                    $passflag = false;
                }
                if ($(this).val() !== '') {
                    if ($passflag) {
                        $span.eq(1).html('√').css('color', 'green');
                    }
                } else {
                    $span.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }
            });
            // 阻止跳转 
            $form.on('submit', function() {
                if ($username.val() === '') {
                    $span.eq(0).html('用户名不能为空').css('color', 'red');
                    $userflag = false;
                }
                if ($password.val() === '') {
                    $span.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }
                if (!$userflag || !$passflag) {
                    return false;
                }
            });
        }
    }
})