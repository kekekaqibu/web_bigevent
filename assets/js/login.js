$(function(){
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 自定义校验规则
    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.veryify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd:[/^[\S]{6,12}$/,"密码必须是6到12位，且不能出现空格"],
        repwd:function(value){
            // 通过形参拿到的是确认密码 框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return "两次输入的密码不一致"
            }
        }
    })
    // 发起注册用户Ajax请求
    $('#form_reg').on('submit',function(e){
        // 1.阻止表单的默认提交行为
        e.preventDefault();
        // 2.用一个变量来接收请求的数据
        var data ={
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        // 3.发起Ajax的post请求
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click()
        })
        
    })
    // 发起登录的Ajax请求
    $('#form_login').submit(function(e){
        // 阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            url:"/api/login",
            method:"post",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登录成功得到的token字符串，保存到local Storage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})