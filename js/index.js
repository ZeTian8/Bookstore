//轮播图操作
function lunB(){
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay:true,//自动播放
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
      });
}
lunB()
//鼠标滑入滑出
function hua(){
    // mouseleave 
    $('#Swip').mouseenter(()=>{
        $('.swiper-button-prev').show()
        $('.swiper-button-next').show()
    })
    $('#Swip').mouseleave(()=>{
        $('.swiper-button-prev').hide()
        $('.swiper-button-next').hide()
    })
}
hua()
