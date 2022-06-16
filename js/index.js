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
//轮播图鼠标滑入滑出显示导航
function hua(){
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

//轮播图数据接口
async function Lun(){
    try {
        let data=await axios.get('http://localhost:3005/books')
        console.log(data);
        for(let i=0;i<data.data.data.length;i++){
            let LunObj=
            `
            <div class="swiper-slide" id="Sw-content">
                <a href="#"></a>
                <img src="${data.data.data[i].coverImg}"alt="">
            </div>
            `
            $('.swiper-wrapper').append(LunObj)
        }
       
    } catch (error) {
        console.log(error);
    }
}
Lun()

//下方排行榜接口
async function Ranking(){
    try {
        let data=await axios.get('http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=5')
        console.log(data);
        for(let i=0;i<data.data.data.length;i++){
            let RankingObj=
            `
            <div id="books-Literature">
                <a href="#"></a>
                <img src="${data.data.data[i].coverImg}" alt="">
            </div>
            `
            $('#literature').append(RankingObj)
        }
       
    } catch (error) {
        console.log(error);
    }
}
Ranking()

//头部搜索框接口
async function NavInp(){
    try {
        let data=await axios.get('http://localhost:3005/books?name_like=三国')
        console.log(data);
        for(let i=0;i<data.data.data.length;i++){
            let RankingObj=
            `
            <div id="books-Literature">
                <a href="#"></a>
                <img src="${data.data.data[i].coverImg}" alt="">
            </div>
            `
            $('#literature').append(RankingObj)
        }
       
    } catch (error) {
        console.log(error);
    }
}
NavInp()

