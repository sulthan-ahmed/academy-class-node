
$("a.delete").click(function(e) {

    $.ajax({
        url: "/blogs/"+ e.target.getAttribute("data-id"),
        type: "delete"
    })
        .then(function(data) {
            location.reload();
        }, function(jqXHR, status, reason) {
            alert("Server error "+jqXHR.status+" "+status+" "+reason);
        });

});


$("form#newBlog").submit(function(e) {

    e.preventDefault();

    var data = {
        title: $("input[name='title']").val(),
        message: $("textarea[name='message']").val()
    };

    $.ajax({
        url:"/blogs",
        type:"post",
        data: data
    })
        .then(function(data) {
            location.reload();
        }, function(jqXHR, status, reason){
            alert("Server error "+jqXHR.status+" "+status+" "+reason);
        });

});