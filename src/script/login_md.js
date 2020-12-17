define([], function() {
    return {
        init: function() {
            let $username = $('#username');
            let $password = $('#password');
            let $btn = $('#login');
            $btn.on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.56/dashboard/nubiyaphone/php/login.php',
                    data: {
                        user: $username.val(),
                        pass: $password.val()
                    }
                }).done(function(data) {
                    if (!data) {
                        alert('用户名或者密码错误');
                        $password.val('')
                    } else {
                        location.href = 'index.html';
                        localStorage.setItem('loginname', $username.val());
                    }
                })
            })
        }
    }
})