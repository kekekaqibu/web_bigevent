$(function(){
    // 获取用户的基本信息
    function getUserInfo(){
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            headers:{
                // 请求头配置对象
                // 这个值就是我们登录成功之后，获取到的token值
                // 如果要请求有权限的接口，必须在请求头加上这个字段，才可以请求成功
                Authorization:localStorage.getItem('token') || "",
            },
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('获取用户信息失败')
                }
                // 请求成功了之后，就可以渲染用户的头像
                // 调用renderAvatar渲染用户的头像
                renderAvatar(res.data)
            },
            // 不论成功还是失败，最终都会调用complete函数
            // 【在每次调用有权限接口的时候，都要指定一个complete函数】
            // complete:function(res){
            //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            //     if(res.responseJSON.status === 1 && res.responseJSON.message ==="身份认证失败"){
            //         // 1.强制清空我们的token
            //         localStorage.removeItem('token')
            //         // 2.强制跳转到登录页面
            //         location.href = '/login.html'
            //     }
            // }
        })
    }
    // 渲染用户头像【操作DOM】
    // 这里的user使用户的信息
    // 有昵称渲染昵称，没有的话，就渲染的是登录的名字
    function renderAvatar(user){
        // 获取用户的昵称
        var name = user.nickname || user.username
        // 设置欢迎的文本
        $('#welcome').html('欢迎 &nbsp;&nbsp' + name)
        // 按需渲染用户的头像
        if(user.user_pic !== null){
            // 渲染图片头像
                // 设置图片的src属性
            $('.layui-nav-img').attr('src',user.user_pic).show();
            $('.text-avatar').hide();
        }else{
            // 渲染文本头像
            $('.layui-nav-img').hide();
            // 获取到字符串的第一个字符,并且转为大写
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();

        }
    }
    //点击按钮， 实现退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出 【利用layui弹出提示框】
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
          //do something
          //【登录成功的时候做了什么事情，退出的时候，(反方向)要相应的做什么事情】
          // 1. 清空本地存储中的 token
          localStorage.removeItem('token')
          // 2. 重新跳转到登录页面
          location.href = '/login.html'
    
          // 关闭 confirm 询问框【这个是官方提供的，不能删除】
          layer.close(index)
        })
    })
})