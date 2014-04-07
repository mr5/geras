/**
 * Created by mr5 on 14-4-1.
 */
/*
 combined files :

 gallery/jquery-adapter/1.0/index

 */
/**
 * @author dxq<dxq613@gmail.com>, yiminghe@gmail.com
 * @module jquery-adapter
 **/
KISSY.add('demeter/ui/jquery-adapter',function (S, DOM, NodeList) {
    /**
     * @fileOverview 兼容kissy 和 jQuery 的适配器
     * @ignore
     */

    /**
     * @private
     * @class jQuery
     * 原生的jQuery对象或者使用kissy时适配出来的对象
     */
    var jQuery = window.jQuery || (function () {
        var deletedIds = [];

        var slice = deletedIds.slice;
        function excuteDuration(self, fn, speed, easing, callback) {
            var params = getDurationParams(speed, easing, callback);

            fn.call(self, params.duration, params.complete, params.easing);
        }

        function getDurationParams(speed, easing, callback) {

            if (S.isPlainObject(speed)) {
                var obj = speed;
                if (S.isNumber(obj.duration)) {
                    obj.duration = obj.duration / 1000;
                }
                return obj;
            }

            if (S.isNumber(speed)) {
                speed = speed / 1000;
            } else if (S.isString(speed)) {
                callback = easing;
                easing = speed;
                speed = undefined;
            } else if (S.isFunction(speed)) {
                callback = speed;
                speed = undefined;
            }

            if (S.isFunction(easing)) {
                callback = easing;
                easing = undefined;
            }
            return {
                duration: speed,
                complete: callback,
                easing: easing
            };
        }

        function getOffsetParent(element) {
            var doc = element.ownerDocument,
                body = doc.body,
                parent,
                positionStyle = DOM.css(element, 'position'),
                skipStatic = positionStyle == 'fixed' || positionStyle == 'absolute';

            if (!skipStatic) {
                return element.nodeName.toLowerCase() == 'html' ? null : element.parentNode;
            }

            for (parent = element.parentNode; parent && parent != body; parent = parent.parentNode) {
                positionStyle = DOM.css(parent, 'position');
                if (positionStyle != 'static') {
                    return parent;
                }
            }
            return null;
        }

        var NLP = NodeList.prototype,
            JqueryNodeList = function (selector, content) {
                if (!(this instanceof JqueryNodeList)) {
                    return new JqueryNodeList(selector, content);
                }
                //S.ready
                if (S.isFunction(selector)) {
                    return S.ready(selector);
                }
                if (S.isString(selector)) {
                    if (content) {
                        return new JqueryNodeList(content).find(selector);
                    }
                    return new JqueryNodeList(S.all(selector));
                }
                NodeList.call(this, selector);
            };

        S.extend(JqueryNodeList, NodeList);

        S.augment(JqueryNodeList, {
            bind: NLP.on,

            off: NLP.detach,

            trigger: NLP.fire,

            filter: function (selector) {
                if (!selector) {
                    return new JqueryNodeList();
                }
                var rst;
                if (S.isFunction(selector) || S.isString(selector)) {
                    return new JqueryNodeList(DOM.filter(this, filter));
                }
                S.each(this, function (node, index) {
                    if (node === selector) {
                        rst = node;
                        return false;
                    }
                });
                return new JqueryNodeList(rst);
            },
            //返回的结果不一致
            find: function (selector) {
                return new JqueryNodeList(this.all(selector));
            },
            //复写delegate，更改参数顺序
            delegate: function (selector, eventType, fn) {
                return JqueryNodeList.superclass.delegate.call(this, eventType, selector, fn);
            },
            //更改 便遍历函数的顺序
            //修改this,和对象
            each: function (fn) {
                return S.each.call(this, function (value, index) {
                    return fn.call(value, index, value);
                });
            },
            /**
             * kissy 未提供此方法
             */
            offsetParent: function () {
                return new JqueryNodeList(getOffsetParent(this[0]));
            },
            //参数顺序不一致
            animate: function (properties, speed, easing, callback) {
                var params = getDurationParams(speed, easing, callback);
                JqueryNodeList.superclass.animate.call(this, properties, params.duration, params.easing, params.complete);
            },
            /**
             * kissy 未提供此方法
             */
            position: function () {
                var _self = this,
                    offset = _self.offset(),
                    parent = _self.offsetParent();
                if (parent.length) {
                    var parentOffset = parent.offset();
                    offset.left -= parentOffset.left;
                    offset.top -= parentOffset.top;
                }
                return offset;
            }
        });

        //由于 kissy的动画单位和参数位置跟 jquery的不一致
        var durationMethods = ['fadeIn', 'fadeOut', 'fadeToggle', 'slideDown', 'slideUp', 'slideToggle', 'show', 'hide'];
        S.each(durationMethods, function (fnName) {
            JqueryNodeList.prototype[fnName] = function (speed, easing, callback) {
                excuteDuration(this, NLP[fnName], speed, easing, callback);
            };
        });

        //jquery上的很多DOM的方法在kissy的Node上不支持
        var domMethods = ['change', 'blur', 'focus', 'select'];
        S.each(domMethods, function (fnName) {
            JqueryNodeList.prototype[fnName] = function () {
                this.fire(fnName);
            }
        });

        //由于返回的对象的类型是S.Node，所以要更改类型
        var nodeMethods = ['children', 'parent', 'first', 'last', 'next', 'prev', 'siblings', 'closest'];
        S.each(nodeMethods, function (fnName) {
            JqueryNodeList.prototype[fnName] = function (selector) {
                return new JqueryNodeList(this[fnName](selector));
            }
        });

        S.mix(JqueryNodeList, S);

        S.mix(JqueryNodeList, {
            fn:JqueryNodeList.prototype,
            /**
             * 是否包含指定DOM
             */
            contains: function (container, contained) {
                return S.DOM.contains(container, contained);
            },
            /**
             * 实现$.extend
             * @return {Object} 结果
             */
            extend: function () {
                var args = S.makeArray(arguments),
                    deep = false,
                    obj;
                if (S.isBoolean(arguments[0])) {
                    deep = args.shift();
                }
                obj = args[0];
                if (obj) {
                    for (var i = 1; i < args.length; i++) {
                        S.mix(obj, args[i], undefined, undefined, deep);
                    }
                }
                return obj;
            },
            /**
             * kissy 的此方法跟 jQuery的接口不一致
             */
            each: function (elements, fn) {
                S.each(elements, function (value, index) {
                    return fn(index, value);
                });
            },
            /**
             * 返回结果不一致
             */
            inArray: function (elem, arr) {
                return S.indexOf(elem, arr);
            },
            /**
             * jQuery 的map函数将返回为 null 和 undefined的项不返回
             */
            map: function (arr, callback) {
                var rst = [];
                S.each(arr, function (item, index) {
                    var val = callback(item, index);
                    if (val != null) {
                        rst.push(val);
                    }
                });
                return rst;
            },
            proxy: function( fn, context ) {
                var args, proxy, tmp;

                if ( typeof context === "string" ) {
                    tmp = fn[ context ];
                    context = fn;
                    fn = tmp;
                }

                // Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                if ( !jQuery.isFunction( fn ) ) {
                    return undefined;
                }

                // Simulated bind
                args = slice.call( arguments, 2 );
                proxy = function() {
                    return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
                };

                // Set the guid of unique handler to the same of original handler, so it can be removed
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;

                return proxy;
            },
            click: function() {

            },
            parseJSON: S.JSON.parse
        })
        return JqueryNodeList;
    })();
    console.log(jQuery);
    return jQuery;

}, {
    requires: ['dom','node','core']
});