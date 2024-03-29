// +----------------------------------------------------------------------
// | Author: Mr.5 <u@mr-5.cn>
// +----------------------------------------------------------------------
// + Datetime: 13-7-2 下午10:34
// +----------------------------------------------------------------------
// + Util类
// +----------------------------------------------------------------------
KISSY.add('demeter/Util',function(S){
    return {
        /**
         * 获取当前时间戳
         * @returns {number}
         */
        current_unixtime:function(){
            return Math.round(new Date().getTime()/1000);
        },
        objectLength:function(obj) {
            var length = 0;
            for(var i in obj) {
                length++;
            }
            return length;
        }
    }
});