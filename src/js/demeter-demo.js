/**
 * Created by Mr5 on 14-3-8.
 */
KISSY.ready(function () {
    KISSY.use('uri,node', function (S, Uri, Node) {
        // 设置顶部菜单高亮
        var current_page_url = document.location.href;
        current_page_url = current_page_url.substr(current_page_url.indexOf('tests/') + 6);
        var active = current_page_url.substring(0, current_page_url.indexOf('.html'));
        if (active != null) {
            Node.one('#J_nav_' + active).addClass('active');
        }

        // 代码高亮渲染
        Node.all('pre').addClass('prettyprint');
        prettyPrint();
    });
});

KISSY.config({
    packages: [
        {
            // demeter包的基准路径
            base: '',
            name: "demeter",     //包名
            tag: "20130612",        //时间戳, 添加在动态脚本路径后面, 用于更新包内模块代码
            path: "../js/demeter",    //包对应路径, 相对路径指相对于当前页面路径
            charset: "utf-8",       //包里模块文件编码格式
            combine: false,          // 是否启用combine，需要web服务器容器支持 http://host/?a.js,b.js
            debug: true,              // 关闭调试模式后，调用的为 -min文件
            ignorePackageNameInUri: true

        },
        {
            name: "kissAssets",
            tag: "",
            path: "http://g.tbcdn.cn/kissy/k/1.4.2/",
            charset: "utf-8",
            ignorePackageNameInUri: true,
            combine: false,
            debug: false
        }
    ]
});
KISSY.ready(function () {
    KISSY.use('node, demeter/ui/Dialog', function (S, Node, Dialog) {
        Node.one('#J_DialogAlert').on('click', function () {
            Dialog.alert('你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年你这样是不对的，骚年');
        });
        Node.one('#J_DialogConfirm').on('click', function () {
            Dialog.confirm('我是confrim对话框，你真要这么做吗？', function () {
                Dialog.alert('你点击了确定');
            }, function () {
                Dialog.alert('你点击了否');
            });
        });
        Node.one('#J_DialogPrompt').on('click', function () {
            Dialog.prompt('我是prompt对话框，请输入一些文本：', function (val) {
                Dialog.alert('你输入了：' + val);
            });
        });
        Node.one('#J_DialogTip').on('click', function () {
            Dialog.tip('你的操作已经成功！', 'success');
        });
        Node.one('#J_DialogTip2').on('click', function () {
            Dialog.tip('这里是一些提示信息', 'info');
        });
        Node.one('#J_DialogTip3').on('click', function () {
            Dialog.tip('操作失败！请重试！', 'error');
        });
    });
    KISSY.use('demeter/ui/umeditor/, demeter/ui/umeditor/config', function (S, UMEditor, umConfig) {
        var _um = new UMEditor(umConfig);
        _um.render('J_RichTextarea');
    });
    KISSY.use('demeter/ui/Popover,node,demeter/ui/Dialog', function (S, Popover, Node, Dialog) {
//        console.log(Popover.confirm);
//        var confirm = Node.all('.J_DemeterPopover');
//        var _popover = new Popover({
//            align: 'left',
//            content: '<p>你好啊！</p>'
//        });
//        var align = 'left';
//        confirm.on('click', function (e) {
//            _popover.setTarget(e.currentTarget);
//            //popover.set
//            //console.log(align);
//            _popover.setAlign('auto');
//            _popover.show();
//        });
        //return;
        Node.one('#J_ConfirmPopoverLeft').on('click', function (e) {
            Popover.confirm(Node.one(e.currentTarget), '你确定要这样做吗？', function () {
                Dialog.tip('你点击了确定！');
            }, 'right', function () {
                Dialog.tip('你点击了取消！');
            });
        });
        Node.one('#J_PromptPopoverLeft').on('click', function (e) {
            Popover.prompt(Node.one(e.currentTarget), '请输入关键词：', function (val) {
                Dialog.tip('你输入了：' + val);
            },'','bottom');
        });
    });
});