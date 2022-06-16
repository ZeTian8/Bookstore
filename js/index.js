//轮播图操作
function lunB() {
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: true,//自动播放
        loop: true,//循环播放
        effect: 'coverflow',//3d播放
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            disableOnInteraction: false,
            delay: 2000,
        },
    });
}
lunB()
//鼠标滑入滑出
function hua() {
    $('#Swip').mouseenter(() => {
        $('.swiper-button-prev').show()
        $('.swiper-button-next').show()
    })
    $('#Swip').mouseleave(() => {
        $('.swiper-button-prev').hide()
        $('.swiper-button-next').hide()
    })
}
hua()

//layui组件
function lay(){
    layui.use('table', function(){
        var table = layui.table;
        
        table.render({
          elem: '#test'
          ,url: 'http://localhost:3005/books?_page=1&_limit=10&_sort=id&_order=asc'
          ,cols: [[
            {field:'id', width:80, title: '书名', sort: true}
            ,{field:'coverImg', width:80, title: '封面图'}
            ,{field:'name', width:80, title: '作者',}
            ,{field:'author', width:80, title: '简介', minWidth: 150,}
            // ,{field:'desc', title: '评分',sort: true}
            // ,{field:'experience', width:80, title: '操作', }
          ]]
          ,page: true
        });
      });
}
lay()


