// 每次调用$.get()或者$.post()或者$.ajax()的时候
// 会先调用ajaxprefilter  这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
})