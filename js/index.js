// //首页头部搜索框
// async function suo(){
// //鼠标聚焦
// $('#nav-input button').click(() => {
//     // alert(111)
//     // $('.boxInput').show()
//     async function suo() {
//         try {
//             let { data:suoData } = await axios({
//                 method: "get",
//                 url: "http://localhost:3005/books",
//                 params: {
//                     name_like: $("#nav-input").val(),
//                 },
//             })
//             console.log(suoData.data);
//             $('.boxInput').text($('#navInp').val())


//             // for(let i=0;i<suoData.length;i++){
//             //     console.log(suoData);
//             //     let suoObj=
//             //     `<div>
//             //         <p>${suoData[i].name}</p> &nbsp;&nbsp;
//             //         <span>作者:
//             //             <span>${suoData[i].author}</span>
//             //         </span>
//             //     </div>
//             //     `
//             //     $('.boxInput').append(suoObj)
//             // }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     // suo()
// })
// }


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

//点击每一张图片跳转详情页面
// async function img(){

// }
// img()

//首页下方排行榜接口,鼠标移入移出搜索按钮，显示隐藏
async function Ranking() {

    try {
        let data = await axios.get('http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=5')
        // console.log(data);

        for (let i = 0; i < data.data.data.length; i++) {
            let RankingObj =
                `
            <div id="books-Literature">
                <a href="#"></a>
                <img src="${data.data.data[i].coverImg}" alt="">
            </div>
            `
            $('#literature').append(RankingObj)

            //鼠标点击搜索按钮，显示隐藏
            if ($('#navInp').val('')) {
                $('#nav-input button').click(() => {
                    $('.boxInput').show()
                    let { data: suoData } = await axios({
                        method: "get",
                        url: "http://localhost:3005/books",
                        params: {
                            name_like: $("#nav-input").val(),
                        },
                    })

                    console.log(suoData.data);
                    $('.boxInput').text($('#navInp').val())

                })


            } else if ($('#navInp').val()) {
                $('#nav-input button').click(() => {
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
                $('#nav-input button').mouseleave(() => {
                    setTimeout(() => {
                        $('.box').hide()
                        $('.box').empty()
                    }, 200)
                })
            }


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
                , toolbar: true
                , title: '用户数据表'
                , height: 690//总行高
                , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    title: '提示'
                    , layEvent: 'LAYTABLE_TIPS'
                    , icon: 'layui-icon-tips'
                }]
                , cols: [[
                    { type: 'checkbox', fixed: 'left' },
                    { field: 'name', width: 120, title: '书名', sort: true, }
                    , {
                        //图片
                        field: 'coverImg', title: '封面图', width: 120,
                        edit: 'test', templet: function (d) {
                            return `<img src=" ${d.coverImg}" alt="">`
                        }
                    }
                    , { field: 'author', width: 80, title: '作者', }
                    , { field: 'desc', title: '简介', minWidth: 150, }
                    , {
                        field: 'tate', title: '评分', sort: true,
                        templet: function (d) {
                            let index = d.LAY_INDEX;
                            layui.use('rate', function () {
                                // console.log(d.rate);
                                var rate = layui.rate;
                                //渲染
                                let obj = {}
                                var ins1 = rate.render({
                                    elem: '.bookXing' + index  //绑定元素
                                    , length: 10//长度
                                    , text: true//开启分数显示
                                    , half: true//开启半星
                                    , value: d.rate//初始值
                                    , readonly: true//禁止修改
                                });
                            });
                            index++;
                            return `<div class = "bookXing${index}"></div>`
                        }
                    }
                    , { field: 'experience', width: 180, title: '操作', toolbar: '#barDemo' }

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

            //监听表格复选框选择
            table.on('checkbox(demo)', function (obj) {
                console.log(obj)
            });

            // case 'add':
            //     layer.msg('添加');
            //     break;

            //监听工具条
            table.on('tool(demo)', function (obj) {
                var data = obj.data;
                if (obj.event === 'detail') {
                    layer.msg('ID：' + data.id + ' 的查看操作');
                } else if (obj.event === 'del') {

                    layer.confirm('确定删除这本书吗?', function (index) {
                        axios.delete('http://localhost:3005/books/'
                            + data.id).then(data => {
                                console.log(data);
                            })
                        obj.del();
                        layer.msg("删除成功")
                        layer.close(index);
                    });

                } else if (obj.event === 'edit') {
                    layer.alert('编辑行：<br>' + JSON.stringify(data))
                }
            });

            var $ = layui.$, active = {
                getCheckData: function () { //获取选中数据
                    var checkStatus = table.checkStatus('idTest')
                        , data = checkStatus.data;
                    layer.alert(JSON.stringify(data));
                }
                , getCheckLength: function () { //获取选中数目
                    var checkStatus = table.checkStatus('idTest')
                        , data = checkStatus.data;
                    layer.msg('选中了：' + data.length + ' 个');
                }
                , isAll: function () { //验证是否全选
                    var checkStatus = table.checkStatus('idTest');
                    layer.msg(checkStatus.isAll ? '全选' : '未全选')
                }
            };

            $('.demoTable .layui-btn').on('click', function () {
                var type = $(this).data('type');
                active[type] ? active[type].call(this) : '';
            });
        });


    } catch (error) {
        console.log(error);
    }

}
lay()

//书籍管理排行榜回到顶部
function Din() {
    $('#ding').click(function () {
        window.scrollTo(0, 2000);
        // 设置滚动行为改为平滑的滚动
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
}
Din()
//书籍管理点击头部导航三味书屋回到主页
function navLogoM() {
    //点击回到主页
    $('#nav-logo').click(function () {
        alert(11)
        window.location.href = 'file:///D:/%E6%A1%8C%E9%9D%A2/%E9%87%8F%E5%AD%90%E9%A1%B9%E7%9B%AE/pc%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B/index.html'
    })
    //点击回到书籍管理页
    $('#nav-book #books').click(function () {
        alert(11)
        window.location.href = 'file:///D:/%E6%A1%8C%E9%9D%A2/%E9%87%8F%E5%AD%90%E9%A1%B9%E7%9B%AE/pc%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B/management.html'
    })
    $('#rank').click(function () {
        alert(11)
        window.location.href = 'file:///D:/%E6%A1%8C%E9%9D%A2/%E9%87%8F%E5%AD%90%E9%A1%B9%E7%9B%AE/pc%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B/details.html'
    })
}
navLogoM()





