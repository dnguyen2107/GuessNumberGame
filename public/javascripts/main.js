$(document).ready(function(){
    $("#request").click(function(){
        $.ajax({
            url:"/request",
            contentType: "application/json",
            success:function(data){
                $("#result").val(data.result);
        }});
    });
});