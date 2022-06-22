//轮播图数据接口
async function Lun() {
    try {
        let data = await axios.get('http://localhost:3005/books?_limit=12')
        // console.log(data);
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
//首页下方排行榜接口,鼠标移入移出搜索按钮，显示隐藏
async function Ranking() {

    try {
        let data = await axios.get('http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=5')
        // console.log(data);

        for (let i = 0; i < data.data.data.length; i++) {
            let RankingObj =
                `
            <div id="books-Literature">
                <img src="${data.data.data[i].coverImg}" alt="">
            </div>
            `
            $('#literature').append(RankingObj)

            //鼠标点击搜索按钮，显示隐藏

            // $('#navInp').focus(function(){
            //     if (!$('#navInp').val('')) {
            //         $('#nav-input button').click(() =>{
            //             console.log(111);
            //         })

            //     }else{
            //         $('#nav-input button').click(() =>{
            //             console.log(222);
            //         })
            //     }
            // })



            // if ($('#navInp').val('')) {
            // $('#nav-input button').click(() => {
            //     // $('.boxInput').show()
            //     let { data: suoData } = await axios({
            //         method: "get",
            //         url: "http://localhost:3005/books",
            //         params: {
            //             name_like: $("#navInp").val(),
            //         },
            //     })
            //     console.log(suoData.data);
            //     $('.boxInput').text($('#navInp').val())

            // })
            // } else if ($('#navInp').val()) {
            // $('#nav-input button').click(() => {
            //     $('.box').css('display', 'block')
            //     let suoObj =
            //         `<div>
            //             <p>${data.data.data[i].name}</p> &nbsp;&nbsp;
            //             <span>作者:
            //                 <span>${data.data.data[i].author}</span>
            //             </span>
            //         </div>
            //         `
            //     $('.box').append(suoObj)
            // })
            // //鼠标移出搜索按钮
            // $('#nav-input button').mouseleave(() => {
            //     setTimeout(() => {
            //         $('.box').hide()
            //         $('.box').empty()
            //     }, 200)
            // })
            // }

        }
    } catch (error) {
        console.log(error);
    }
}
Ranking()

//点击图片，跳转详情页页面
async function xiang(a, url) {
    try {
        let { data: dataX } = await axios({
            method: "get",
            url: url,
            params: {

            }
        })
        console.log(dataX.data);
        for (let i = 0; i < dataX.data.length; i++) {
            $(a).eq(i).click(() => {
                location.href = `details.html?id=${dataX.data[i].id}`
            })
        }
    } catch (error) {
        console.log(error);
    }
}
//轮播图渲染详情页
xiang(('#Swip img'), 'http://localhost:3005/books')
//首页底部排行榜渲染详情页
xiang(('#literature img'), 'http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=5')

//搜索框渲染
function sou() {
    $('#nav-input button').click(async () => {
        try {
            let suoData = await axios({
                method: "get",
                url: 'http://localhost:3005/books',
                params: {
                    name_like: $('#navInp').val()
                }
            })
            let suoObj =
                `
            <a>${suoData.data.data[0].name} 作者：${suoData.data.data[0].author}</a>
            `
            $('.boxInput').append(suoObj)
            $('.boxInput').show()
            xiang(('.boxInput'), `http://localhost:3005/books?name_like=${suoData.data.data[0].name}`)
            $('.boxInput').click(() => {
                $('.boxInput').hide()
                $('#navInp').val('')
            })

        } catch (error) {
            console.log(error);
        }
    })
}
sou()
//layui组件---分页---表格渲染---事件(删除编辑查看)---新增----数据渲染------
//分页
async function lay() {
    try {
        let { data: layDataPage } = await axios.get('http://localhost:3005/books')
        layui.use('table', function () {
            let table = layui.table;
            //监听分页
            layui.use(['laypage', 'layer'], function () {
                var laypage = layui.laypage
                    , layer = layui.layer;
                //不显示首页尾页
                laypage.render({
                    elem: 'demo11'
                    , count: layDataPage.data.length//获取后台数据
                    , first: false//上一页
                    , last: false//下一页
                    , limit: 5//每页个数
                    , limits: [5, 10, 20]
                    , layout: ['count', 'limit', 'prev', 'page', 'next']//选择每页的条数
                    , jump: async function (obj) {
                        // console.log(obj.limit, obj.curr)
                        let { data: layData } = await axios.get(`http://localhost:3005/books?_page=${obj.curr}&_limit=${obj.limit}&_sort=id&_order=asc`)
                        // console.log(layData.data);
                        table.render({
                            elem: '#test'
                            , toolbar: true
                            ,autoSort: false
                            , title: '用户数据表'
                            , height: 690//总行高
                            , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                            //数据内容
                            , cols: [[
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
                            , response: {
                                statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
                            }
                            , data: layData.data
                        });

                    }
                });
            })
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
//表格事件删除，查看，编辑渲染
function shijian() {
    layui.use('table', function () {
        let table = layui.table;
        table.on('tool(demo)', async function (obj) {
            var data = obj.data;
            xiang(('.layui-btn-primary'), 'http://localhost:3005/books')
            // if (obj.event === 'detail') {
                
            // } else 
            if (obj.event === 'del') {//删除

                layer.confirm('确定删除这本书吗?', function (index) {
                    axios.delete('http://localhost:3005/books/'
                        + data.id).then(data => {
                            console.log(data);
                        })
                    obj.del();
                    layer.msg("删除成功")
                    layer.close(index);
                });

            } else if (obj.event === 'edit') {//编辑
                console.log(data);
                $('#titleinput').val(data.name);
                $('#imgurl').val(data.coverImg);
                $('#authorinput').val(data.author);
                $('#descinput').val(data.desc);
                let value = data.rate
                // console.log($('#imgurl').val());
                layui.use('rate', function () {//评分星星
                    var rate = layui.rate;
                    //渲染
                    var ins1 = rate.render({
                        elem: '#test2'  //绑定元素
                        , length: 10//长度
                        , text: true//开启分数显示
                        , half: true//开启半星
                        , value: value
                        , choose: function (value) {
                            $('.star').text(value + '星')
                        }
                    });
                })
                layer.prompt({
                    type: 1,
                    content: $('#model'),//内容model容器
                    shade: [0.8, '#393D49'],//遮罩
                    formType: 2,
                    value: '初始值',
                    title: '编辑',//头部
                    area: ['800px', '350px'], //自定义文本域宽高
                    yes: function (index, layero) {
                        console.log(data.id);
                        let startTxt = +$('.star').text().substr(0, $('.star').text().length - 1)
                        axios.put(
                            `http://localhost:3005/books/` + data.id, {
                            name: $('#titleinput').val(),
                            coverImg: $('#imgurl').val(),
                            author: $('#authorinput').val(),
                            rate: startTxt,
                            desc: $('#descinput').val()
                        })
                        layer.close(layer.index);
                        lay()
                    }
                });
            }
        });
    })
}
shijian()
//新增
function xinzneg() {
    $('#newAdd').click(() => {
        layui.use('rate', function () {//评分星星
            var rate = layui.rate;
            //渲染星星
            var ins1 = rate.render({
                elem: '#test2'  //绑定元素
                , length: 10//长度
                , text: true//开启分数显示
                , half: true//开启半星
            });
        })
        layer.prompt({
            type: 1,
            content: $('#model'),//内容model容器//弹出
            shade: [0.8, '#393D49'],//遮罩
            formType: 2,
            title: '新增',//头部
            area: ['800px', '350px'], //自定义文本域宽高
            yes: function (index, layero) {
                let startTxt = +$('.star').text().substr(0, $('.star').text().length - 1)
                startTxt=startTxt.toString()
                console.log(typeof startTxt);
                $.ajax({
                    url: 'http://localhost:3005/books',//传地址
                    method: 'post',
                    data: {
                        name: $('#titleinput').val(),
                        coverImg: $('#imgurl').val(),
                        author: $('#authorinput').val(),
                        rate: startTxt,
                        desc: $('#descinput').val(),
                    },
                    success: (data) => {
                        layer.close(layer.index);
                        console.log(data.data);
                        lay()
                    }
                })
            }
        },
        );
    })
}
xinzneg()
//排序
layui.use('table',function () {
    let table = layui.table;
    table.on('sort(demo)', async function (obj) {
      console.log(obj.field,obj.type);
      if (obj.field=='name'&&obj.type=='asc') {
        let { data: bookSort } = await axios.get('http://localhost:3005/books/')
        shuju(bookSort, 'id', 'asc')
      }
      if (obj.field=='name'&&obj.type=='desc') {
        let { data: bookSort } = await axios.get('http://localhost:3005/books/')
        shuju(bookSort, 'id', 'desc')
      }
      if (obj.field=='tate'&&obj.type=='asc') {
        let { data: bookSort } = await axios.get('http://localhost:3005/books/')
        shuju(bookSort, 'rate', 'asc')
      }
      if (obj.field=='tate'&&obj.type=='desc') {
        let { data: bookSort } = await axios.get('http://localhost:3005/books/')
        shuju(bookSort, 'rate', 'desc')
      }
    })
})
//数据封装,SJData(接口数据)，FS(根据何种方式排序)，ZF(正反顺序)
function shuju(SJData, FS, ZF) {
    layui.use('table', function () {
        let table = layui.table;
        //监听分页
        // function fenye() {
        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;
            //不显示首页尾页
            laypage.render({
                elem: 'demo11'
                , count: SJData.data.length//获取后台数据
                , first: false//上一页
                , last: false//下一页
                , limit: 5//每页个数
                , limits: [5, 10, 20]
                , layout: ['count', 'limit', 'prev', 'page', 'next']//选择每页的条数
                , jump: async function (obj) {
                    // console.log(obj.limit, obj.curr)
                    let { data: SJData } = await axios.get(`http://localhost:3005/books?_page=${obj.curr}&_limit=${obj.limit}&_sort=${FS}&_order=${ZF}`)
                    // console.log(layData.data);
                    table.render({
                        elem: '#test'
                        , autoSort: false
                        , toolbar: true
                        , title: '三味书屋'
                        , height: 690//总行高
                        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                        //数据内容
                        , cols: [[
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
                        , response: {
                            statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
                        }
                        , data: SJData.data
                    });

                }
            });
        })
        // }
        // fenye()
        $('.demoTable .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    });
}

//书籍管理排行榜回到顶部
$(document).ready(() => {
    //开始监听滚动条
    $(window).scroll(() => {
        let top = $(document).scrollTop();
        if (top >= 400) {
            $('#ding').show()
            $('#ding').click(() => {
                window.scrollTo(0, 2000);
                // 设置滚动行为改为平滑的滚动
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            })
        } else {
            $('#ding').hide()
        }
    })
})

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
        window.location.href = 'pai.html'
    })
}
navLogoM()

/* 导出第一步 */
// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}
/* 导出第二步 */
/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}
//  openDownloadDialog(url, saveName)
/* 导出第三步 */
//导出,点击获取数据，将数据依次放进二维数组、
var aoa = []
$('#daoAdd').click(() => {
    var aoa = [
        ['书名', '封面图', '作者', '简介', '评分'],
    ];
    async function execl() {
        try {
            let { data: execlBook } = await axios.get('http://localhost:3005/books/')
            // console.log(execlBook.data);
            execlBook.data.forEach((item) => {
                aoa.push([item.name, item.coverImg, item.author, item.desc, item.rate])
            });
            var sheet = XLSX.utils.aoa_to_sheet(aoa);
            openDownloadDialog(sheet2blob(sheet), '三味书屋.xlsx');
        } catch (error) {
            console.log(error);
        }
    }
    execl()

})

//打印
$('#printAdd').click(() => {
    $('.layui-table-box').attr('id', 'printTable')
    console.log($('#printTable'));
    printJS(
        {
            // pdf或图像的url，html元素的id或json数据的对象
            printable: 'printTable',
            // 设置打印类型 pdf，html，image，json和raw-html
            type: 'html',
            // css: '../layui/css/layui.css',
            css: ['../css/index.css', '../layui/css/layui.css'],
            // 最大文档宽度（像素）。根据需要更改此项。在打印HTML，图像或JSON时使用。
            // maxWidth: 600,
            // maxHeight: 800,
            // scanStyles:true,
            // 这允许我们传递一个字符串，该字符串应该应用于正在打印的html。
            // style:'color:red;font-size:50px'
        }
    )


})
