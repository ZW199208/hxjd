
function setcookieServerTime() {
    var nowTime=$.ajax({async:false}).getResponseHeader("Date");
    var serverTime = new Date(nowTime);
    //服务器时间戳
    var  server=serverTime.getTime();
    var ds= new Date();
    var client=ds.getTime();
    setCookie("serverTime",server-client)
}

<!-- 时间模块-->
var timeTemplate = {
    init: function () {
        var str = ":";
        setcookieServerTime();
        setInterval(function () {
            var timezone = 8; //目标时区时间，东八区
            // if(getCookie("serverTime")){
            //     var s=parseInt(getCookie("serverTime"));
            //     var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            //     var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            //     var date= nowDate+s;
            //     var d = new Date(date + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
            // }else{
                var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
                var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
                var d = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
            // }
            var year = d.getFullYear();
            var month = (d.getMonth() + 1);
            var day = (d.getDate());
            var hour = (d.getHours());
            if(hour<10){
                hour="0"+hour;
            }
            var minutes = (d.getMinutes());
            if(minutes<10){
                minutes="0"+minutes;
            }
            var weekDay1= new Date().toLocaleString('zh-Hans-u-ca-chinese')
            var weekDay=d.getDay();
            var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            var week = weeks[weekDay];
            $("#time").html(" <div class='time' style='font-size: 64px;font-weight: 64px'><span>" + hour + "</span><span class='timeClock'>" + str + "</span><span>" + minutes + "</span>&nbsp;&nbsp;<span>" +week + "</span></div> <div class='date' style='font-size: 38px;font-weight: 38px;letter-spacing: 1px'><span>" + year + "年" + month + "月" + day + "日</span></div>")
        }, 1000);
        setInterval(function () {
            setcookieServerTime();
        }, 3600000);
    },
}


// <!-- 轮播图片视频-->
// var carousel = {
//     init: function () {
//         var hotelId = this.hotelId;
//         webix.ajax().get("/admin/hotelInformation/hotelGetType", {"hotelid": hotelId}).then(function (result) {
//             var fileType = result.json();
//             webix.ajax().get("/admin/TbCarousel/select", {
//                 "hotelid": hotelId,
//                 "fileType": fileType
//             }).then(function (result) {
//                 var res = result.json();
//                 //图片
//                 if (fileType == 0) {
//                     //查询图片尺寸
//                     webix.ajax().get('/admin/hotelInformation/queryTemplateSize?templateUrl=template-h6.html').then(function (result) {
//                         var resp = result.json();
//                         var html1="";
//                         for (var i = 0; i < res.length; i++) {
//                             if(resp.msg==1){
//                                 html1 = html1+"<img  src='"+res[i].imgurl+"'>";
//                             }else if(resp.msg==2){
//                                 html1 = html1+"<img  src='"+res[i].imgurlTwo+"'>";
//                             }else{
//                                 html1 = html1+"<img  src='"+res[i].imgurlThree+"'>";
//                             }
//                         }
//                         $("#slider").html(html1);
//                         $('#slider').nivoSlider();
//                     });




//           /*              $(function() {
//                             $('#slider').vmcSlider({

//                                 effects: [// 使用的转场动画效果
//                                     'fade', 'fadeLeft', 'fadeRight', 'fadeTop', 'fadeBottom', 'fadeTopLeft', 'fadeBottomRight',
//                                     'blindsLeft', 'blindsRight', 'blindsTop', 'blindsBottom', 'blindsTopLeft', 'blindsBottomRight',
//                                     'curtainLeft', 'curtainRight', 'interlaceLeft', 'interlaceRight', 'mosaic', 'bomb', 'fumes'
//                                 ],
//                                 gridCol: 10,
//                                 gridRow: 5,
//                                 gridVertical: 20,
//                                 gridHorizontal: 10,
//                                 ascending: true,
//                                 autoPlay: true,// 自动播放
//                                 random: true,// 随机使用转场动画效果
//                                 duration: 8000, // 图片停留时长（毫秒）
//                                 speed: 2000,// 转场效果时长（毫秒）
//                                 interval : 10
//                             });
//                         });*/

//                     webix.ajax().get("/admin/TbCarousel/select", {
//                         "hotelid": hotelId,
//                         "fileType": 2
//                     }).then(function (result) {
//                         var resp = result.json();
//                         $("#music").html("<audio id='myMusic' src='"+resp[0].imgurl+"' preload='auto'  autoplay='autoplay' controls='controls' hidden='hidden' ></audio>");
//                         var vLen = resp.length;
//                         var curr = 0;
//                         var myMusic = document.getElementById("myMusic");
//                         myMusic.addEventListener('ended', function (event) {
//                             curr++;
//                             if (curr >= vLen) {
//                                 curr = 0; //重新循环播放
//                             }
//                             myMusic.src = resp[curr].imgurl;
//                             myMusic.load();
//                             myMusic.play();
//                         },false)
//                     });

//                   /*  $('#btn').click();*/


//                     //---------轮播图函数-------------//
//           /*          function slideshow() {
//                         var slideshow = document.getElementById("slideshow"),
//                             imgs = slideshow.getElementsByTagName("div"), //得到图片们
//                             current = 0; //current为当前活跃的图片编号
//                         function slideOff() {
//                             imgs[current].className = "rightOut"; //图片淡出
//                         }

//                         function slideOn() {
//                             imgs[current].className = "rightIn"; //图片淡入
//                         }

//                         function changeSlide() { //切换图片的函数
//                             slideOff(); //图片淡出
//                             current++; //自增1
//                             if (current >= res.length) current = 0;
//                             slideOn(); //图片淡入
//                         }

//                         //每10s调用changeSlide函数进行图片轮播
//                         var slideon = setInterval(changeSlide, 5000);
//                     }

//                     slideshow();*/
//                 } else {
//                     //视频
//                     var html = " <video id='myVideos' src='" + res[0].imgurl + "'   style='width: 100%;height: 100%;' preload='auto'  autoplay='autoplay' controls='controls' ></video> ";
//                     $("#videos").html(html);
//                     var vLen = res.length;
//                     var curr = 0;
//                     var myVideo = document.getElementById("myVideos");
//                     myVideo.addEventListener('ended', function (event) {
//                         curr++;
//                         if (curr >= vLen) {
//                             curr = 0; //重新循环播放
//                         }
//                         myVideo.src = res[curr].imgurl;
//                         myVideo.load();
//                         myVideo.play();

//                     })
//                 }
//             });


//         });
//     }
// }




// <!-- 房型列表-->
// var datatable = {
//     init: function () {
//         var hotelId = this.hotelId;
//         var wi=1;
//         //head
//         webix.ajax().get("/admin/tbprice/query", {"hotelId": hotelId}).then(function (result) {
//             var resp = result.json();
//             var head = resp[0];
//             if (head.priceonec == 1) {
//                 wi=wi+1;
//             }
//             if (head.pricetwoc == 1) {
//                 wi=wi+1;
//             }
//             if (head.pricethreec == 1) {
//                 wi=wi+1;
//             }
//             if (head.pricefourc == 1) {
//                 wi=wi+1;
//             }
//             if (head.pricefivec == 1) {
//                 wi=wi+1;
//             }
//             wi=100/wi;

//             var html1 = "<span  style='width:"+wi+"%'> 房型</span>";
//             if (head.priceonec == 1) {
//                 html1 = html1 + "<span style='width:"+wi+"%'>" + head.priceone + "</span>";
//             }
//             if (head.pricetwoc == 1) {
//                 html1 = html1 + "<span style='width:"+wi+"%'>" + head.pricetwo + "</span>";
//             }
//             if (head.pricethreec == 1) {
//                 html1 = html1 + "<span style='width:"+wi+"%'>" + head.pricethree + "</span>";
//             }
//             if (head.pricefourc == 1) {
//                 html1 = html1 + "<span style='width:"+wi+"%'>" + head.pricefour + "</span>";
//             }
//             if (head.pricefivec == 1) {
//                 html1 = html1 + "<span style='width:"+wi+"%'>" + head.pricefive + "</span>";
//             }
//             $("#dataTableHead").html("<li>"+html1+"</li>");
//             webix.ajax().get("/admin/TbHotelRoomType/queryshow", {"hotelId": hotelId}).then(function (result) {
//                 var resp = result.json();
//                 var htmlbody = "";
//                 var num=0;
//                 for (var i = 0; i < resp.length; i++) {
//                     if(resp[i].display==1){
//                     num++;
//                     if (resp[i].roomtypename == null ||resp[i].roomtypename=="") {
//                         resp[i].roomtypename = "--";
//                     }
//                     var html2 = "<span class='roomTitle' style='width:"+wi+"%'>" + resp[i].roomtypename + "</span>";
//                     if (head.priceonec == 1) {
//                         if (resp[i].priceone == null ||resp[i].priceone=="") {
//                             resp[i].priceone = "--";
//                         } else {
//                             resp[i].priceone = "<span  style='font-size: 30px;text-align: right'>￥</span><span style='text-align: left;width: 50%;'>"+ resp[i].priceone+"</span>";
//                         }
//                         html2 = html2 + "<span  class='roomPrice' style='width:"+wi+"%'>" + resp[i].priceone + "</span>";
//                     }
//                     if (head.pricetwoc == 1) {
//                         if (resp[i].pricetwo == null ||resp[i].pricetwo=="") {
//                             resp[i].pricetwo = "--";
//                         } else {
//                             resp[i].pricetwo = "<span  style='font-size: 30px;text-align: right'>￥</span><span style='text-align: left;width: 50%;'>"+ resp[i].pricetwo+"</span>";
//                         }
//                         html2 = html2 + "<span class='roomPrice'  style='width:"+wi+"%'>" + resp[i].pricetwo + "</span>";
//                     }
//                     if (head.pricethreec == 1) {
//                         if (resp[i].pricethree == null ||resp[i].pricethree=="") {
//                             resp[i].pricethree = "--";
//                         } else {
//                             resp[i].pricethree = "<span style='font-size: 30px;text-align: right'>￥</span><span style='text-align: left;width: 50%;'>"+ resp[i].pricethree+"</span>";
//                         }
//                         html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].pricethree + "</span>";
//                     }
//                     if (head.pricefourc == 1) {
//                         if (resp[i].pricefour == null ||resp[i].pricefour=="") {
//                             resp[i].pricefour = "--";
//                         } else {
//                             resp[i].pricefour = "<span style='font-size: 30px;text-align: right'>￥</span><span style='text-align: left;width: 50%;'>"+ resp[i].pricefour+"</span>";
//                         }
//                         html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].pricefour + "</span>";
//                     }
//                     if (head.pricefivec == 1) {
//                         if (resp[i].pricefive == null ||resp[i].pricefive=="") {
//                             resp[i].pricefive = "--";
//                         } else {
//                             resp[i].pricefive = "<span style='font-size: 30px;text-align: right'>￥</span><span style='text-align: left;width: 50%;'>"+ resp[i].pricefive+"</span>";
//                         }
//                         html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].pricefive + "</span>";
//                     }
//                     if(num%2 ==0){
//                         htmlbody = htmlbody + "<li>" + html2 + "</li>";
//                     }else{
//                         htmlbody = htmlbody + "<li style='background-color: #e8e6e7'>" + html2 + "</li>";
//                     }
//                 }

//                 $("#dataTable").html(htmlbody);
//                 }
//                 if(num<6){
//                     for (var i=num;i<6;i++){
//                         if(i%2 ==0){
//                             htmlbody = htmlbody + "<li style='background-color: #e8e6e7'></li>";

//                         }else{
//                             htmlbody = htmlbody + "<li></li>";
//                         }

//                     }
//                     $("#dataTable").html(htmlbody);
//                 }else{
//                     //判断最后出现的数据是否是奇数，是：追加一次数据使其变成偶数
//                     if(!(num%2 ==0)){
//                         var nums=0;
//                         for (var i = 0; i < resp.length; i++) {
//                             if(resp[i].display==1){
//                                 nums++;
//                                 var html2 = "<span class='roomTitle' style='width:"+wi+"%'>" + resp[i].roomtypename + "</span>";
//                                 if (head.priceonec == 1) {
//                                     html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].priceone + "</span>";
//                                 }
//                                 if (head.pricetwoc == 1) {
//                                     html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].pricetwo + "</span>";
//                                 }
//                                 if (head.pricethreec == 1) {
//                                     html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].pricethree + "</span>";
//                                 }
//                                 if (head.pricefourc == 1) {
//                                     html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].pricefour + "</span>";
//                                 }
//                                 if (head.pricefivec == 1) {
//                                     html2 = html2 + "<span class='roomPrice' style='width:"+wi+"%'>" + resp[i].pricefive + "</span>";
//                                 }
//                                 if(nums%2 ==0){
//                                     htmlbody = htmlbody + "<li style='background-color: #e8e6e7'>" + html2 + "</li>"
//                                 }else{
//                                     htmlbody = htmlbody + "<li>" + html2 + "</li>";
//                                 }
//                             }
//                             $("#dataTable").html(htmlbody);
//                         }
//                     }
//                 }



//                 //上下轮播
//                 function autoScroll(obj) {
//                     var n = $(obj).find("li").height();
//                     $(obj).find("ul").animate({
//                         marginTop: -n
//                     }, 2000, function () {
//                         $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
//                         //设置切换一行后停顿时间
//                         setTimeout(function () {
//                             autoScroll(".liList");
//                         }, 8000);
//                     })
//                 }
//                 if(num>6){
//                     autoScroll(".liList");
//                 }
//             });
//         });
//     }
// }






// var MarqueeTemplate = {
//     init: function () {
//         var hotelId = this.hotelId;
//         webix.ajax().get("/admin/hotelInformation/hotelGetById?id="+hotelId).then(function (result) {
//             var resp = result.json();
//             var notice;
//             if (resp.notice)
//                 notice = resp.notice;
//             else
//                 notice = "";
//             $("#notice").html("<span>"+notice+"</span>")
//         })
//     }
// }
