/**
 * Created by Mr5 on 14-3-8.
 */
KISSY.ready(function(){
    KISSY.use('uri,node', function(S, Uri, Node){
        var current_page_url = document.location.href;
        current_page_url = current_page_url.substr(current_page_url.indexOf('tests/') + 6);
        var active = current_page_url.substring(0, current_page_url.indexOf('.html'));
//        var query = new Uri.Query(queryStr);
//        var active = query.get('active');
        if(active != null) {
            Node.one('#J_nav_' + active).addClass('active');
        }
    });
});