//Toon.JS allows the user to create toons

//Handles Toon Creation AJAX calls
const handleToon = (e) => {
    e.preventDefault();
    
    //Error message checking
    $("#flippyMessage").animate({width:'hide'},350);
    
    if($("#toonName").val() == '' || $("#toonSpecies").val() == '' || $("#toonColor").val() ==''){
        handleError("ToonTip: All fields are required!");
        console.log("Toon.js handleToon -> Empty field called")
        return false;
    }
    
    //Sends AJAX to server
    sendAjax('POST', $("#toonForm").attr("action"), $("#toonForm").serialize(), function() {
        loadToonsFromServer();
    });
    
    return false;
};

//Creates the form to allow the user to add a toon
const ToonForm = (props) => {
    return (
    <form 
        id="toonForm"
        onSubmit={handleToon}
        name="toonForm"
        action="/toons"
        method="POST"
        className="toonForm"
        >
            
            <label htmlFor="name">Name: </label>
            <input id="toonName" type="text" name="name" placeHolder="Toon Name"/>
            <label htmlFor="species">Species: </label>
            <input id="toonSpecies" type="text" name="species" placeholder="Toon Species"/>
            <label htmlFor="color">Color: </label>
            <input id="toonColor" type="text" name="color" placeholder="Toon Color"/>
            <label htmlFor="house">House: </label>
            <select className="select-option" id="toonHouse" name="house">
                <option selected="selected" value="red">Red</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="pink">Pink</option>
                <option value="yellow">Yellow</option>
            </select>

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeToonSubmit" type="submit" value="Make Toon" />
    </form>
    );
};


//Adds toons from Mongo if necessary
const ToonList = function(props) {
    
    //Empty Toon check
    if(props.toons.length === 0) {
        return (
            <h3 className="emptyToon">No Toons Yet</h3>
        );
    }
    
//        if(props.toons.length >= 7) {
//        handleError("ToonTip: You can only have up to 6 toons!");
//        console.log("Toon.js ToonList -> Max number of toons called")
//        toons.remove(6);
//        console.log(props.toons.length);
//        }
    
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

//Renders DOM according to toon creations
const setup = function(csrf) {
    ReactDOM.render(
        <ToonForm csrf={csrf} />, document.querySelector("#makeToon")
    );
    
    ReactDOM.render(
        <ToonList toons={[]} />, document.querySelector("#toons")
    );
    
    loadToonsFromServer();
};

//Gets session token
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

//Gets token upon server load
$(document).ready(function() {
    getToken();
});
