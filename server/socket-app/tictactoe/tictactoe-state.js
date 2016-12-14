var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var GameFull = false;
        var Grid = new Array(9);
        var PlayerTurns = 'X';
        var NotYourMove = false;

        function processEvent(event) {

            if(event.type == "GameJoined")
            {
                GameFull = true;
            }

            if(event.type == "MovePlaced")
            {
                Grid[event.pos] = event.side;
                console.log(Grid);
                tooglePlayer();
            }
        }

        function notYourMove (side){

            if(side != PlayerTurns){
                 return true;
            }
            else{
                 return false;
            }
        }

        function tooglePlayer (){
            if(PlayerTurns = 'X'){
                PlayerTurns = 'O';
                return;
            }
            PlayerTurns = 'X';
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return GameFull;
        }

        function occupiedPos(pos){
            return Grid[pos] != null;
        }

        processEvents(history);

        return {
            notYourMove:notYourMove,
            occupiedPos:occupiedPos,
            gameFull:gameFull,
            processEvents: processEvents
        }
    };
};
