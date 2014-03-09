/**
 * Created by Mr5 on 14-3-8.
 */
KISSY.ready(function(){
    KISSY.use('uri,node', function(S, Uri, Node){
        // 设置顶部菜单高亮
        var current_page_url = document.location.href;
        current_page_url = current_page_url.substr(current_page_url.indexOf('tests/') + 6);
        var active = current_page_url.substring(0, current_page_url.indexOf('.html'));
        if(active != null) {
            Node.one('#J_nav_' + active).addClass('active');
        }

        // 代码高亮渲染
        Node.all('pre').addClass('prettyprint');
        prettyPrint();
    });
});