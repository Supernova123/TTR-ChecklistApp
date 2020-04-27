//Helper.JS adds helper functions

//Handles errors
const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#flippyMessage").animate({width:'toggle'},350);
};

//Hides Flippy error message
const redirect = (response) => {
    $("#flippyMessage").animate({width:'hide'},350);
    window.location = response.redirect;
};

//Sends data to AJAX
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};

//Adds toons from Mongo if necessary
const ToonList = function(props) {

        //Empty Toon check
        if(props.toons.length === 0) {
            return (
                <h3 className="emptyToon">No Toons Yet</h3>
            );
        }

            if(props.toons.length >= 7) {
            handleError("ToonTip: You can only have up to 6 toons!");
            console.log("Toon.js ToonList -> Max number of toons called")
            toons.push[6];
            }

            //Displays created toons
            const toonNodes=props.toons.map(function(toon) {
                return (
                    <div key={toon._id} className="toon">
                        <h3 className="toonName"> Name: {toon.name}</h3>
                        <h3 className="toonSpecies"> Species: {toon.species}</h3>
                        <h3 className="toonColor"> Color: {toon.color}</h3>
                        <h3 className="toonHouse"> House: {toon.house}</h3>
                    </div>
                );
            });

            //Returns toon list
            return (
            <div className="toonList">
                {toonNodes}
            </div>
    )
};

//Loads toon from the server
const loadToonsFromServer = () => {
    sendAjax('GET', '/getToons', null, (data) => {
        ReactDOM.render(
            <ToonList toons={data.toons} />, document.querySelector("#toons")
        );
    });
}