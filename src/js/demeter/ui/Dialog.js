// +----------------------------------------------------------------------
// | Author: Mr.5 <u@mr-5.cn>
// +----------------------------------------------------------------------
// + Datetime: 13-6-30 下午9:15
// +----------------------------------------------------------------------
// + 对话框工具类，目前实现alert、propmt、confirm
// +----------------------------------------------------------------------
/**
 * 实现tip alert、propmt、confirm
 * @author Mr.5
 */
KISSY.add('demeter/ui/Dialog', function (S,Node,Event, O,Util) {
    var tip_dialog = null;
    var tip_lastshow = 0;
    /**
     *
     * 实现alert、propmt、confirm
     * @class nayewx.widget.XBDialog
     */
    return {
        /**
         *
         * @param {string}  message 提示消息
         * @param {string}  type    [option]类型，支持info|error|ok，默认为info
         * @param {int}     delay   [option]消失延迟时间毫秒数，默认为3000
         * @memberOf XBDialog
         */
        tip:function(message,type,delay){
            if(delay == null){
                delay = 3000;
            }
            if(type == null){
                type = 'info';
            }
            type = type.toLowerCase();
            var icon = '&#x3437;'; // info
            var text_cls = 'text-info-inverse';
            switch(type){
                case 'success':
                    icon = '&#x3435;'; // ok
                    text_cls = 'text-success-inverse';
                    break;
                case 'error':
                    icon = '&#x3432;';// error
                    text_cls = 'text-danger-inverse';
                    break;
            }
            var content =
//                '<div class="tip-icon ' + icon+ '">&nbsp;</div>'+
                    '<p class="tip-text '+ text_cls +'"><i class="iconfont">'+icon+'</i>'+message+'</p>';
//                    '<div class="tip-right">&nbsp;</div>';
            if(tip_dialog == null){
                tip_dialog = new O({
//                    height:45,
                    //height:100,
                    width:'auto',
//                    elCls:'drift-tip',
                    align: {
                        points: ['cc', 'cc']
                    },
                    effect:{
                        duration:0.3,effect:'fade',easing:'backBoth'
                    },
                    mask:false
                });
            }
            tip_dialog.set({content:content,align: {
                points: ['cc', 'cc']
            }});
            tip_lastshow = Util.current_unixtime();
            tip_dialog.show();

            if(delay > 0){
                setTimeout(function(){
                    // TODO 这里将改用clearTimeout()
                    // 判断最后一次显示是什么时候，避免前面的隐藏延迟打断后面的显示
                    if((Util.current_unixtime() - tip_lastshow) >= ((delay - 100)/1000)){
                        tip_dialog.hide();
                    }
                },delay);
            }

        },
        /**
         * 弹出提示消息
         * @static
         * @param {string}      message         提示消息
         * @param {function}    handler         [option]确定按钮处理事件
         * @param {string}      title           [option]标题，默认为“提示消息”
         * @param {string}      okBtn           [option]确定按钮文字，默认为“确认”
         * @memberOf XBDialog
         */
        alert:function(message,handler,title,okBtn){
            if(title == null){
                title = '提示消息';
            } else {
                title = title.toString();
            }
            if(okBtn == null){
                okBtn = '知道了';
            } else {
                okBtn = okBtn.toString();
            }
            if(message != null){
                message.toString();
            }
            var guid = S.guid();
            var dialog = new O.Dialog({
                width:300,
                //height:100,
                headerContent:title,
                bodyContent:message,
                footerContent:'<a class="btn btn-primary btn-small" style="float:right;" id="J_nayewxAlert_'+ guid +'">'+okBtn+'</a>',
                align: {
                    points: ['cc', 'cc']
                },
                mask:true,
                closeAction: "destroy"
            });
            if(handler == null){
                var finalHandler = function(){
                    dialog.destroy();
                }
            } else {
                var finalHandler = function(){
                    handler();
                    dialog.destroy();
                }
            }
            dialog.on('show',function(){
                var _okBtn = S.Node.one('#J_nayewxAlert_' + guid);
                if(_okBtn != null){
                    _okBtn.on('click',finalHandler);
                }
            });
            dialog.show();
//            console.log(dialog);
//            console.log(dialog.show());
        },
        /**
         * 弹出输入提示
         * @static
         * @param {string}      message         提示消息
         * @param {function}    handler         回调函数，会将输入框中的内容作为参数传入
         * @param {string}      title           [option]提示标题
         * @param {string}      okBtn           [option]确定按钮文字替换，默认为“确定输入”
         * @param {Regex}       regex           [option]!!!TODO 这个功能还没做。正则表达式，在提交前将使用改正则测试输入框中的内容，如果false，则提示errormsg
         * @param {string}      errormsg        [option]!!!TODO 这个功能还没做错误提示消息，参考regex参数
         * @memberOf XBDialog
         */
        prompt:function(message,handler,title,okBtn,regex,errormsg){
            if(title == null){
                title = '请输入';
            }
            if(okBtn == null){
                okBtn = '确定输入';
            }

            var guid = S.guid();
            var dialog = new O.Dialog({
                width:350,
                //height:100,
                headerContent:title,
                bodyContent:'<form  id="J_nayewxPromptForm_'+guid+'" class="label-block"><label class="label">'+ message +'</label><input type="text" class="input input-1" id="J_nayewxPromptInput_'+guid+'"/></form>',
                footerContent:'<a  class="btn btn-primary btn-small" style="float:right;cursor: pointer;" '
                    +' id="J_nayewxPrompt_'+ guid +'">'+ okBtn +'</a><a class="btn btn-small" style="margin-right: 20px;float:right;" id="J_nayewxPromptCancel_'+ guid +'">取消</a>',
                align: {
                    points: ['cc', 'cc']
                },
                mask:true,
                closeAction: "destroy"
            });
            if(handler == null){
                var clickHandler = function(){
                    dialog.destroy();
                }
            } else {
                var clickHandler = function(){
                    handler(S.Node.one('#J_nayewxPromptInput_' + guid).val());
                    dialog.destroy();
                }
            }
            dialog.on('show',function(){
                var _okBtn = S.Node.one('#J_nayewxPrompt_' + guid);
                if(_okBtn != null){
                    _okBtn.on('click',clickHandler);
                }
                S.Node.one('#J_nayewxPromptForm_' + guid).on('submit',function(){
                    clickHandler();
                    return false
                });
                S.Node.one('#J_nayewxPromptCancel_' + guid).on('click',function(){
                    dialog.destroy();
                });
            });

            dialog.show();
        },
        /**
         * 弹出操作确认提示
         * @static
         * @param {string}      message             提示消息
         * @param {function}    okHandler           确认处理函数
         * @param {function}    cancelHandler       [option]取消处理函数，默认为销毁窗口。!!!TODO 由于没有绑定“叉”关闭事件，因此存在不确定性，所以暂时不要设置这个参数。
         * @param {string}      okBtn               [option]确定按钮文字替换，默认为“确定”
         * @param {string}      cancelBtn           [option]取消按钮文字替换，默认为“取消”
         * @param {string}      title               [option]提示标题，默认为“操作确认”
         * @memberOf XBDialog
         */
        confirm:function(message,okHandler,cancelHandler,okBtn,cancelBtn,title){
            if(title == null){
                title = '操作确认';
            }
            if(okBtn == null){
                okBtn = '确定';
            }
            if(cancelBtn == null){
                cancelBtn = '取消';
            }
            var guid = S.guid();
            var dialog = new O.Dialog({
                width:350,
                //height:100,
                headerContent:title,
                bodyContent:message,
                footerContent:'<a  class="btn btn-danger btn-small" style="float:right;" '
                    +' id="J_demeterConfirmOK_'+ guid +'">'+ okBtn +'</a><a class="btn  btn-small" style="margin-right: 20px;float:right;" id="J_demeterConfirmCancel_'+ guid +'">取消</a>',
                align: {
                    points: ['cc', 'cc']
                },
                mask:true,
                closeAction: "destroy"
            });
            // 定义确定按钮事件回调函数
            if(okHandler == null){
                var _okHandler = function(){
                    dialog.destroy();
                }
            } else {
                var _okHandler = function(){
                    okHandler();
                    dialog.destroy();
                }
            }
            // 定义取消按钮事件回调函数
            if(cancelHandler == null){
                var _cancelHandler = function(){
                    dialog.destroy();
                }
            } else {
                var _cancelHandler = function(){
                    cancelHandler();
                    dialog.destroy();
                }
            }
            dialog.on('show',function(){
                // “确定”按钮事件
                var _okBtn = S.Node.one('#J_demeterConfirmOK_' + guid);
                if(_okBtn != null){
                    _okBtn.on('click',_okHandler);
                }
                var _cancelBtn = S.Node.one('#J_demeterConfirmCancel_' + guid);
                // “取消”按钮事件
                if(_cancelBtn != null){
                    _cancelBtn.on('click',_cancelHandler);
                }

            });
            dialog.show();
        }
    };

}, {
    requires: [
        'node','event','overlay','demeter/Util','demeter/demeter-ui.css'
    ]
});