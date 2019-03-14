$(document).ready(function () {
    let topics = ["corgi", "labrador", "poodle", "puggle", "chihuahua", "dachshund", "beagle", "dalmatian"]

    function renderButtons() {

        $("#button-bank").empty();

        for (let i = 0; i < topics.length; i++) {

            let b = $("<button>");
            b.attr("class", "topic-button");
            b.attr("data-name", topics[i]);
            b.text(topics[i]);
            $("#button-bank").append(b);
        }
    }

    renderButtons();

    function loadGifs() {

        let topic = $(this).attr("data-name");

        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=vPwOjTEYArQIh2upLByo1EwzZjSPyuOy&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            let gifArr = response.data

            $("#gif-div").empty();

            for (let i = 0; i < gifArr.length; i++) {

                let gifLink = gifArr[i].images.fixed_height_still.url;
                let animatedLink = gifArr[i].images.fixed_height.url;
                let gif = $("<img class='gifImage' id='gif' state='still'>");
                gif.attr("src", gifLink);

                let rating = gifArr[i].rating;

                $("#gif-div").append(gif);
                $("#gif-div").append("<p><span id='rating'>Rating: " + rating + "</span></p>");

                gif.on("click", function () {
                    if ($(this).attr("state") === "still") {
                        $(this).attr("src", animatedLink);
                        $(this).attr("state", "animated");
                    }
                    else {
                        $(this).attr("src", gifLink);
                        $(this).attr("state", "still");
                    }
                });
            }
        });
    };

    $("#add-button").on("click", function (event) {
        event.preventDefault();

        let usrInput = $("#topic-input").val().trim();

        topics.push(usrInput);

        renderButtons();

        $("#topic-input").val("");
    });

    $(document).on("click", ".topic-button", loadGifs);

});