$(document).ready(function () {
    let topics = ["corgi", "labrador", "poodle", "puggle", "chihuahua", "dachshund", "beagle", "dalmatian"]


    // render the buttons
    for (let i = 0; i < topics.length; i++) {


        let b = $("<button>");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#button-bank").append(b);
    }


    // event listener for each button to hit api

    $("button").on("click", function () {

        let topic = $(this).attr("data-name");
        console.log(topic);

        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=vPwOjTEYArQIh2upLByo1EwzZjSPyuOy&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            let gifArr = response.data

            $("#gif-div").empty();

            for (let i = 0; i < gifArr.length; i++) {


                let gifLink = gifArr[i].images.fixed_height_still.url;
                let animatedLink = gifArr[i].images.fixed_height.url;
                let gif = $("<img class='gifImage' state='still'>");
                gif.attr("src", gifLink);

                let rating = gifArr[i].rating;

                $("#gif-div").append(gif);
                $("#gif-div").append("<p>Rating: " + rating + "</p>");


                $(document).on("click", ".gifImage", function () {
                    if ($(this).attr("state") === "still") {
                        $(this).attr("src", animatedLink);
                        $(this).attr("state", "animated");
                    }
                    else {
                        $(this).attr("src");
                        $(this).attr("state", "still");
                    }
                });
            }
        });

    });

    // add input field to generate new buttons

    // event listener for created images


});