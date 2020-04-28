//Checklist.JS allows the user to check off where they are in game

const handleChecklist = (e) => {
    e.preventDefault();
    
    //Login error messages
    $('#flippyMessage').animate({width:'hide'}, 350);
    
    //Check session token
    console.log($("input[name=_csrf]").val());
    
    return false;
};

//Loads in About Window
const ChecklistWindow = (props) => {
    return (
        
//        <h1>What is TTR Checklist?</h1>
//        <h3>TTR Checklist is a companion application to Toontown Rewritten, a fanmade server for Disney's popular MMORPG Toontown Online. It allows a player to keep track of their in-game toon's progress, preventing the player from remembering everything</h3>
//        <h2>What is Toontown Online?</h2>
//        <h3>Toontown Online was a Massive Multiplayer Online Role-Playing Game created by Disney in 2003. It consisted of players entering the world of Mickey Mouse and friend as anthropromorphic characters known as "Toons." Together, everyone fights invading business-themed robots known as "Cogs" with slapstick comedy gags, including classics like cream pies, banana peels, and seltzer bottles, in order to take back Toontown!</h3>
//        <h2>Newsletter</h2>
//        <h3>Want to sign up for our Newsletter for updates on our application? Sign up down below! Don't worry, you'll be teleported back to the Login page once you're added to our system!</h3>
        <form id="emailForm"
            name="emailForm"
            onSubmit={handleAbout}
            action="/about"
            method="POST"
            className="mainForm"
            >
            
            <label htmlFor="email">Email: </label>
            <input id="user" type="text" name="email" placeholder="email"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Add Email" />
        
        </form>
    );
};

//Adds toons from Mongo if necessary
const Checklist = function(props) {
    
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
