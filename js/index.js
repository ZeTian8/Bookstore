// //首页头部搜索框
// async function suo(){
//     $('#nav-input button').click(()=>{
//         alert(111)
//         $('.box').show()
//         try {
//             let {data:suoData}=await axios.get('http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=12')
//             console.log(suoData.data);
//             // for(let i=0;i<suoData.data.length;i++){
//             //     console.log(suoData.data);
//             //     let suoObj=
//             //     `<div>
//             //         <p>${suoData.data[i].name}</p> &nbsp;&nbsp;
//             //         <span>作者:
//             //             <span>${suoData.data[i].author}</span>
//             //         </span>
//             //     </div>
//             //     `
//             //     $('.box').append(suoObj)
//             // }
//         } catch (error) {
//             console.log(error);
//         }
//     })
// }
// suo()

//轮播图数据接口
async function Lun() {
    try {
        let data = await axios.get('http://localhost:3005/books')
        console.log(data);
        for (let i = 0; i < data.data.data.length; i++) {
            let LunObj =
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
//轮播图操作
function lunB() {
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: true,//自动播放
        // loop: true,//循环播放
        effect: 'coverflow',//3d播放
        observer: true,
        observerParents: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            disableOnInteraction: false,
            delay: 2000,
            pauseOnMouseEnter: true,
        },
    });

}
lunB()
//轮播图鼠标滑入滑出显示导航
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

//首页下方排行榜接口
async function Ranking() {

    try {
        let data = await axios.get('http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=5')
        console.log(data);

        for (let i = 0; i < data.data.data.length; i++) {
            let RankingObj =
                `
            <div id="books-Literature">
                <a href="#"></a>
                <img src="${data.data.data[i].coverImg}" alt="">
            </div>
            `
            $('#literature').append(RankingObj)
            //鼠标移入移出搜索按钮，显示隐藏
            $('#nav-input button').mouseenter(() => {
                $('.box').css('display', 'block')
                let suoObj =
                    `<div>
                        <p>${data.data.data[i].name}</p> &nbsp;&nbsp;
                        <span>作者:
                            <span>${data.data.data[i].author}</span>
                        </span>
                    </div>
                    `
                $('.box').append(suoObj)
            })
            //鼠标移出搜索按钮
            $('#nav-input button').mouseleave (()=>{
                setTimeout(()=>{
                    $('.box').hide()
                    $('.box').empty()
                },200)
            })

        }
    } catch (error) {
        console.log(error);
    }
}
Ranking()

//layui组件-------------------
async function lay() {
    try {
        let { data: layData } = await axios.get('http://localhost:3005/books?_page=1&_limit=10&_sort=id&_order=asc')
        layui.use('table', function () {
            let table = layui.table;
            table.render({
                elem: '#test'
                // ,url: 'http://localhost:3005/books?_page=1&_limit=5&_sort=id&_order=asc'
                , toolbar: true
                , title: '用户数据表'
                , totalRow: true
                , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    title: '提示'
                    , layEvent: 'LAYTABLE_TIPS'
                    , icon: 'layui-icon-tips'
                }]
                , cols: [[
                    { field: 'id', width: 80, title: '书名', sort: true }
                    , { field: 'coverImg', width: 80, title: '封面图' }
                    , { field: 'name', width: 80, title: '作者', }
                    , { field: 'author', width: 80, title: '简介', minWidth: 150, }
                    , { field: 'desc', title: '评分', sort: true }
                    , { field: 'experience', width: 80, title: '操作', }
                    ,
                ]]
                , page: true
                , response: {
                    statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
                }
                , skin: 'line' //表格风格
                , even: true
                , page: true //是否显示分页
                , limits: [5, 7, 10]
                , limit: 5 //每页默认显示的数量
                , data: layData.data

            });
            //头工具栏事件
            table.on('toolbar(test)', function (obj) {
                var checkStatus = table.checkStatus(obj.config.id);
                // data = checkStatus.data; //获取选中的数据
                switch (obj.event) {
                    case 'add':
                        layer.msg('添加');
                        break;
                    case 'getCheckData':
                        var data = checkStatus.data;
                        layer.alert(JSON.stringify(data));
                        break;
                    case 'getCheckLength':
                        var data = checkStatus.data;
                        layer.msg('选中了：' + data.length + ' 个');
                        break;
                    case 'isAll':
                        layer.msg(checkStatus.isAll ? '全选' : '未全选');
                        break;

                    //自定义头工具栏右侧图标 - 提示
                    case 'LAYTABLE_TIPS':
                        layer.alert('这是工具栏右侧自定义的一个图标按钮');
                        break;
                };
                //监听行工具事件
                table.on('tool(test)', function (obj) {
                    var data = obj.data;
                    //console.log(obj)
                    if (obj.event === 'del') {
                        layer.confirm('真的删除行么', function (index) {
                            obj.del();
                            layer.close(index);
                        });
                    } else if (obj.event === 'edit') {
                        layer.prompt({
                            formType: 2
                            , value: data.email
                        }, function (value, index) {
                            obj.update({
                                email: value
                            });
                            layer.close(index);
                        });
                    }
                })
            });
        });
    } catch (error) {
        console.log(error);
    }

}
lay()

//书籍详情跳转未生效
// $('#nav-book #books').click(function () {
//     alert(11)
//     $(location).attr('href', 'details.html');

// })



