var payWindow = function (hotelId, text, payState) {
    function qarcode() {
        webix.ajax().get('/admin/config/querydomain').then(function (result) {
            var resp = result.json();
            var host_url = window.location.protocol + "//" + resp.msg;
            var qrcode_str = host_url + "/pay.html?hotelId=" + hotelId;
            webix.require("js/qrcode.min.js", function () {
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: qrcode_str,
                    width: 150,
                    height: 150,
                    colorDark: "#fff",
                    colorLight: "rgb(0, 0, 0)",
                    correctLevel: QRCode.CorrectLevel.L
                });
            });
        });
    }

    webix.ui({
        id: "payHotel",
        view: "window",
        modal: true,
        position: "center",
        width: 900,
        height: 900,
        head: {
            view: "toolbar",
            css: {"background-color": "white !important;"},
            cols: [
                {view: "icon", icon: "iconfont iconfont icon-Scan",css: {"margin-top": "4px !important"}},
                {view: "label", label: lc("扫码支付"), css: {"margin-top": "7px !important"}},
                {
                    view: "icon", icon: "iconfont icon-guanbi",css: {"margin-top": "4px !important"}, click: function () {
                        if (payState == 1) {
                            $$("payHotel").close();
                        }
                    }, on: {
                        onAfterRender: function () {
                             if (payState == 1) {
                                 setTimeout(function () {
                                     $$("payHotel").close();
                                 }, 30000);
                             }
                        }
                    }
                }
            ]
        },
        body: {
            id: "addVideoLibraryForm",
            view: "form",
            scroll: false,
            width: 600,
            height: 300,
            elements: [
                {
                    cols: [
                        {
                            width: 250,
                            rows: [
                                {
                                    height: 30,
                                },
                                {
                                    view: "label",
                                    height: 240,
                                    width: 240,
                                    template: "<div style='background-image: url(images/saoma.png) ;background-size:100% 100%; height: 200px; margin-left: 20px; padding-top: 20px;' align='center'><div style='width: 160px; height: 160px; border: 1px solid #c8c8c8; padding-top: 10px;padding-bottom: 5px; '><div align='center' id='qrcode'></div></div></div>",
                                    on: {
                                        onAfterRender: function () {
                                            qarcode();
                                        }
                                    }
                                }
                            ]
                        }, {
                            width: 350,
                            rows: [

                                {
                                    view: "label",
                                    height: 120,
                                    width: 300,
                                    template:"<div style='width: 300px; margin:20px;'><span>"+text+"</span></div>"
                                },
                                {
                                    height: 30,
                                },
                                {
                                    view: "label",
                                    height: 100,
                                    template: "<div align='center'><img  src='images/alipay.png'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='images/weixinpay.png'><p>请使用支付宝或者微信扫码</p></div>"
                                },

                            ]
                        }
                    ]
                }

            ]

        }
    }).show();

}