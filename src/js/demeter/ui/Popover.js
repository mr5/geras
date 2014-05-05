/**
 * Created by mr5 on 14-4-6.
 */
KISSY.add('demeter/ui/Popover', function(S, Node, Event, XTemplate) {

    /**
     *
     * @param {Object} _config 支持的配置项有：
     * {
     *  content:{string} 内容
     *  target:{string|HTMLCollection|HTMLElement}   指向目标的css3选择器或者Node对象
     *
     *  mask:{bool}   [option] 是否显示遮罩层，默认为false
     *  height:{int}    [option] 高度，默认为30
     *  width:{int}     [option] 宽度，默认为auto
     *  align:{string} [option]popover的方位，支持 left、right、top、bottom、auto，默认为auto，当为auto时，会自动计算合适的位置，并保证内容显示正确，定位优先级为 left、bottom、right、top
     * }
     * @constructor
     */
    var Popover = function (_config) {
        var self = this;
        self.config = _config || {};
        /**
         * 模板字符串
         * @type {string}
         */
        self.popover_tpl = '<div class="dmt-popover dmt-popover-{{align}}" id="J_DemeterPopover{{guid}}">' +
                                '<div id="J_DemeterPopoverContent{{guid}}">{{{body}}}</div>' +
                                '<div class="dmt-arrow">'+
                                    '<span class="border-arrow border-arrow-down"></span>' +
                                    '<span class="border-arrow border-arrow-up"></span>' +
                                '</div>' +
                            '</div>';
        self._initialize();
    }
    S.augment(Popover, /* @lends Popover */{
        /**
         * 要指向的目标Node对象
         * @private
         */
        _targetNode:null,
        /**
         * 当前popover弹出层对象
         */
        _popoverNode:null,
        /**
         * popover中内容字符串
         */
        _content:'',
        /**
         * 指向的方位
         */
        _align:'auto',
        /**
         * 真实指向方位
         */
        _realAlign:'left',
        /**
         * 唯一识别符
         */
        _guid:null,
        /**
         * 箭头高度
         * @private
         */
        _arrowSize: 30,
        _contentNode: null,
        confirm:function() {

        },
        /**
         * 初始化
         * @private
         */
        _initialize: function() {
            var self = this;

            self._guid = S.guid();
            var config = self.config;
            self.setContent(config.content == null ? '' : config.content);
            if(config.target !== null) {
                self.setTarget(config.target);
            }
//            self.setTarget(config.target == null ? null : config.target);
            self.setAlign(config.align == null ? 'auto' : config.align);
            // 插入Node对象
            Node.one('body').append(new XTemplate(self.popover_tpl).render({
                align: self._align,
                guid: self._guid,
                body: self._content
            }));
//            cn
            self._popoverNode = Node.one('#J_DemeterPopover' + self._guid);
            self._contentNode = Node.one('#J_DemeterPopoverContent' + self._guid);
            if(config.height !== null) {
                self._popoverNode.height(config.height);
            }
            if(config.width !== null) {
                self._popoverNode.width(config.width);
            }
        },
        /**
         * 显示遮罩层
         * @private
         */
        _showMask: function(){
            var self = this;

            if(self.config.mask) {

            }
        },
        /**
         * 隐藏遮罩层
         * @private
         */
        _hideMask: function() {
            var self = this;

            if(self.config.mask) {

            }

        },
        setContent: function(content) {
            var self = this;

            self._content = content;
            if(self._contentNode !== null) {
                self._contentNode.html(content);
            }
        },
        setAlign: function(align) {
            var self = this;

            self._align = align;
//            self._setRealAlign(align);

        },
        _setRealAlign: function(realAlign) {
            var self = this;

            if(self._popoverNode !== null) {
                self._popoverNode.removeClass('dmt-popover-left dmt-popover-right dmt-popover-top dmt-popover-bottom');
                self._popoverNode.addClass('dmt-popover-' + realAlign);
            }
        },
        setTarget: function(target) {
            var self = this;

            self._targetNode = Node.one(target);
        },
        show: function() {
            var self = this;
            self._popoverNode.css(self._calOffset());
            self._popoverNode.show();
        },
        hide: function() {
            var self = this;

            self._popoverNode.hide();
        },
        destroy: function() {
            var self = this;

            self.remove();
        },
        remove: function() {
            var self = this;

            self._popoverNode.remove();
        },
        /**
         * 计算popover层绝对定位的偏移量。
         * @return Object {top:{int}, left:{int}}
         * @private
         */
        _calOffset: function(align) {
            var self = this;

            if(align == null) {
                align = self._align;
            }
            var offset = self._targetNode.offset();
            var target = self._targetNode;
            switch(align) {
                case 'left':
                    offset.left = offset.left - self._popoverNode.width() - self._arrowSize * 1.8;
                    offset.top = offset.top - Math.max(target.height() / 2, self._popoverNode.height() / 2);
                    break;
                case 'right':
                    offset.left = offset.left + target.width() + self._arrowSize ;
                    offset.top = offset.top - Math.max(target.height() / 2, self._popoverNode.height() / 2);
                    break;
                case 'top':
                    offset.top = offset.top - self._popoverNode.height()  - self._arrowSize * 1.5;
                    break;
                case 'bottom':
                    offset.top = offset.top + target.height() + 16;
                    break;
                // 默认为自动
                default:
                    // 左边可以显示
                    if(self._popoverNode.width() + self._arrowSize <= offset.left) {
                        self._realAlign = 'left';
                        return self._calOffset('left');
                    // 右边可以显示
                    } else if(self._popoverNode.width() + target.width() + offset.left + self._arrowSize * 2 <= Node.one('body').width()) {
                        self._realAlign = 'right';

                        return self._calOffset('right');
                    // 顶部可以显示
                    } else if(self._popoverNode.height() + self._arrowSize * 1.5 <= offset.top) {
                        self._realAlign = 'top';
                        return self._calOffset('top');
                    } else if(self._popoverNode.height() + self._arrowSize * 1.5 <= offset.top) {
                        self._realAlign = 'bottom';
                        return self._calOffset('bottom');
                    }


            }
            if(self._popoverNode !== null) {
                self._popoverNode.removeClass('dmt-popover-left dmt-popover-right dmt-popover-top dmt-popover-bottom');
                self._popoverNode.addClass('dmt-popover-' + align);
            }
            return offset;
        }
    });
    // 全局的confirm都公用一个popover对象
    var confirm = {
        popover:null,
        okBtn:null,
        cancelBtn:null,
        msgWrapper: null
    };
    Popover.confirm = function(target, message, okHandler, align, cancelHandler){
        // 定义确定按钮事件回调函数
        var _okHandler = function(){
            confirm.popover.hide();
            confirm.okBtn.detach('click');
            if(S.isFunction(okHandler)) {
                okHandler();
            }
        }
        // 定义取消按钮事件回调函数
        var _cancelHandler = function(){
            confirm.popover.hide();
            confirm.cancelBtn.detach('click');
            // 定义取消按钮事件回调函数
            if(S.isFunction(cancelHandler)){
                cancelHandler();
            }
        }
        if(confirm.popover === null) {
            var guid = S.guid();

            confirm.popover = new Popover({
                align:align,
                target:target,
                height:30,
                content:'<p style="margin:0;"><span  id="J_DemeterPopConfirmMsg' + guid + '">'+ message +'</span>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '<a class="btn btn-xsmall btn-danger" id="J_DemeterPopoverOK' + guid +'">确定</a>' +
                    '<a class="btn btn-xsmall" id="J_DemeterPopoverCancel' + guid +'">取消</a>' +
                    '</p>'
            });
            confirm.okBtn = Node.one('#J_DemeterPopoverOK' + guid);
            confirm.cancelBtn = Node.one('#J_DemeterPopoverCancel' + guid);
            confirm.msgWrapper = Node.one('#J_DemeterPopConfirmMsg' + guid);
            confirm.popover._popoverNode.children('.dmt-arrow').css({top: 4.5});
        } else {
            confirm.popover.setAlign(align);
            confirm.popover.setTarget(target);
            confirm.msgWrapper.html(message);
        }
        confirm.okBtn.detach('click');
        confirm.cancelBtn.detach('click');
        confirm.okBtn.on('click', _okHandler);
        confirm.cancelBtn.on('click', _cancelHandler);
        confirm.popover.show();

    };
    // 全局的prompt都公用一个popover对象
    var prompt = {
        popover:null,
        msgWrapper: null,
        form:null,
        input:null,
        closeBtn:null
    };
    Popover.prompt = function(target, message, handler, defaultValue, align){
        if(defaultValue === null) {
            defaultValue = '';
        }
        if(prompt.popover === null) {
            var guid = S.guid();

            prompt.popover = new Popover({
                align:align,
                target:target,
                height:40,
                content:'<form id="J_PromptForm' + guid +'">' +
                            '<label class="label" id="J_DemeterPromptMsg' + guid + '">' + message + '</label>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '<input type="text" class="input" id="J_DemeterPromptInput' + guid +'" />'+
                            '&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '<button class="btn btn-small btn-primary" id="J_DemeterPopoverOK' + guid +'">确定</button>' +
                            '<button class="btn btn-small" type="button" id="J_DemeterPopoverClose'+ guid +'">取消</button>' +
                        '</form>'
            });
            prompt.form = Node.one('#J_PromptForm' + guid);
            prompt.input = Node.one('#J_DemeterPromptInput' + guid);
            prompt.msgWrapper = Node.one('#J_DemeterPromptMsg' + guid);
            prompt.closeBtn = Node.one('#J_DemeterPopoverClose' + guid);
            prompt.closeBtn.on('click', function() {
                prompt.popover.hide();
            });
        } else {
            prompt.popover.setAlign(align);
            prompt.popover.setTarget(target);
            prompt.msgWrapper.html(message);
        }
        prompt.input.val(defaultValue);

        prompt.form.detach('submit');
        prompt.form.on('submit', function(e) {
            if(S.isFunction(handler)) {
                handler(prompt.input.val());
            }
            prompt.popover.hide();
            e.preventDefault();
        });
        prompt.popover.show();


    };
    return Popover;
}, {
    requires:['node', 'event', 'xtemplate']
});