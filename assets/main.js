//(document).ready(function () {
    var apiKey = 'O79uHFxPyOBEFC8wBfYKuCXxvNPbeIao';
    //make array to hold the gif buttons

    var players = ["Lebron James", "Dan Marino", "Serena Williams", "Aaron Rodgers", "Mia Hamm", "Allyson Felix"];

    //create a function to add the values to the page as it's clicked

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        //everytime you add, clear to popuplate new

        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {


            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);


            $(areaToAddTo).append(a);

        }
    }

    //function to display the images from my giphy api
    //
    $(document).on("click", ".player-button", function () {

        $("#images").empty();

        $(".player-button").removeClass("active");
        $(this).addClass("active");

       

        var type = $(this).attr("data-type")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey +"&limit=7";

        //ajax call

        $.ajax({

            url: queryURL,
            method: "GET"


        })
            .then(function (response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    var playerDiv = $("<div class=\"player-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var playerImage = $("<img>");
                    playerImage.attr("src", still);
                    playerImage.attr("data-still", still);
                    playerImage.attr("data-animate", animated);
                    playerImage.attr("data-state", "still");

                    playerImage.addClass("player-image");

                    playerDiv.append(p);
                    playerDiv.append(playerImage);

                    $("#images").append(playerDiv);

                };



            });


    });

    //Set doc attributes from still to animate
    $(document).on("click", ".player-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        }
        else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");


        }



    });

    $("#add-player").on("click", function (event) {

        event.preventDefault();
        var newplayer = $("input").eq(0).val();

        if (newplayer.length > 2) {
            players.push(newplayer)
        }
        populateButtons(players, "player-button", "#player-buttons");

    });

    populateButtons(players, "player-button", "#player-buttons");


