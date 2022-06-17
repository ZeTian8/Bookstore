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
// async function layUrl(){
//     try {
//         let  data=await axios.get('http://localhost:3005/books?_page=1&_limit=5&_sort=id&_order=asc')
//         console.log(data.data);
//     } catch (error) {
//         console.log(error);
//     }
// }

async function lay() {
    try {
        let  {data:layData}=await axios.get('http://localhost:3005/books?_page=1&_limit=5&_sort=id&_order=asc')
        console.log(layData);
    
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
                {field:'id', width:80, title: '书名', sort: true}
                ,{field:'coverImg', width:80, title: '封面图'}
                ,{field:'name', width:80, title: '作者',}
                ,{field:'author', width:80, title: '简介', minWidth: 150,}
                ,{field:'desc', title: '评分',sort: true}
                ,{field:'experience', width:80, title: '操作', }
                ,

                // { type: 'checkbox', fixed: 'left' }
                // , { field: 'id', title: 'ID', width: 80, fixed: 'left', unresize: true, sort: true }
                // , { field: 'username', title: '用户名', width: 120, edit: 'text' }
                // , {
                //     field: 'email', title: '邮箱', width: 150, edit: 'text', templet: function (res) {
                //         return '<em>' + res.email + '</em>'
                //     }
                // }
                // , { field: 'sex', title: '性别', width: 80, edit: 'text', sort: true }
                // , { field: 'city', title: '城市', width: 100 }
                // , { field: 'sign', title: '签名' }
                // , { field: 'experience', title: '积分', width: 80, sort: true }
                // , { field: 'ip', title: 'IP', width: 120 }
                // , { field: 'logins', title: '登入次数', width: 100, sort: true }
                // , { field: 'joinTime', title: '加入时间', width: 120 }
                // , { fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150 }
            ]]
            , page: true
            
            ,response: {
                statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
              }
            ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                return {
                  "code": res.status, //解析接口状态
                  "msg": res.message, //解析提示文本
                  "count": res.total, //解析数据长度
                  "data": [data.data.data] //解析数据列表
                };
              }

            // , data: [{
            //     "id": "10001"
            //     , "username": "杜甫"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "116"
            //     , "ip": "192.168.0.8"
            //     , "logins": "108"
            //     , "joinTime": "2016-10-14"
            // }, {
            //     "id": "10002"
            //     , "username": "李白"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "12"
            //     , "ip": "192.168.0.8"
            //     , "logins": "106"
            //     , "joinTime": "2016-10-14"
            //     , "LAY_CHECKED": true
            // }, {
            //     "id": "10003"
            //     , "username": "王勃"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "65"
            //     , "ip": "192.168.0.8"
            //     , "logins": "106"
            //     , "joinTime": "2016-10-14"
            // }, {
            //     "id": "10004"
            //     , "username": "贤心"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "666"
            //     , "ip": "192.168.0.8"
            //     , "logins": "106"
            //     , "joinTime": "2016-10-14"
            // }, {
            //     "id": "10005"
            //     , "username": "贤心"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "86"
            //     , "ip": "192.168.0.8"
            //     , "logins": "106"
            //     , "joinTime": "2016-10-14"
            // }, {
            //     "id": "10006"
            //     , "username": "贤心"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "12"
            //     , "ip": "192.168.0.8"
            //     , "logins": "106"
            //     , "joinTime": "2016-10-14"
            // }, {
            //     "id": "10007"
            //     , "username": "贤心"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "16"
            //     , "ip": "192.168.0.8"
            //     , "logins": "106"
            //     , "joinTime": "2016-10-14"
            // }, {
            //     "id": "10008"
            //     , "username": "贤心"
            //     , "email": "https://www.layuiweb.com/demo/table/test@email.com"
            //     , "sex": "男"
            //     , "city": "浙江杭州"
            //     , "sign": "人生恰似一场修行"
            //     , "experience": "106"
            //     , "ip": "192.168.0.8"
            //     , "logins": "106"
            //     , "joinTime": "2016-10-14"
            // }]
            , skin: 'line' //表格风格
            , even: true
            , page: true //是否显示分页
            , limits: [5, 7, 10]
            , limit: 5 //每页默认显示的数量

        });
        for(let i=0;i<layData.data.length;i++){
            console.log(layData.data);

        }
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
//




