/**
 * Created by PC11 on 2017/6/9.
 */
function Main(container,url) {
    $.ajax({
        url:url,
        async:false,
        cache:false,
        success:function(data){
            $(container).html(data);
        }
    })
}
