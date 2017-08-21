$(document).ready(function () {
    var newBurger = $("#newBurger");

    getBurgers()

    $(document).on("submit", "#add_burger", handleBurgerSubmit);

    function handleBurgerSubmit(event) {
        event.preventDefault();
        if (!newBurger.val().trim().trim()) {
            return;
        }
        addBurgerToDB({
            burger_name: newBurger.val().trim(),
            devoured: false
        });
        this.reset();
    }

    function addBurgerToDB(burgerData) {
        $.post("/api/burger", burgerData)
            .then(getBurgers);
    }

    function getBurgers() {
        $.get("/api/burger", function (data) {
            $("#allBurgers").empty();
            $("#eatenBurgers").empty();
            for (var i = 0; i < data.length; i++) {
                if (data[i].devoured === true) {
                    $("#eatenBurgers").append("<ul>" + data[i].burger_name + "</ul>");
                } else {
                    $("#allBurgers").append("<li id='" + i + "'>" + data[i].burger_name + '  <button id="' + i + '" class="btn eatBurger">Eat it!</button>' + "</li>");
                }
            }
        });
    }

    $('#eat_burger').on('click', 'button.eatBurger', eatBurger);

    function eatBurger(event) {
        // $("#" + $(this).context.id).empty();
        $.ajax({
            method: "PUT",
            url: "/api/burger",
            data: {id:parseInt($(this).context.id) + 1}
          }).done(getBurgers);
    }
});