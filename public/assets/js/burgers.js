
$(function () {
    $(".change-devour").on("click", function (event) {
        var id = $(this).data("id");
        var eatBurger = $(this).data("eatBurger");

        var newEatenBurg = {
            devoured: true
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenBurg
        }).then(
            function () {
                console.log("burger devoured", eatBurger);
                location.reload();
            }
            );
    });

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burg").val().trim(),
            devoured: $("[name=eatBurger]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("cooked up a new burger");
                location.reload();
            }
            );
    });
});
