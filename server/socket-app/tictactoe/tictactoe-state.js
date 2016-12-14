var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var GameFull = false;
        var Grid = new Array(9);
        var PlayerTurns = "X";
        var NotYourMove = false;

        function processEvent(event) {

            if(event.type == "GameJoined")
            {
                GameFull = true;
            }

            if(event.type == "MovePlaced")
            {
                Grid[event.pos] = event.side;
                togglePlayer();
            }
        }

        function wonHorizontally(event) {

            Grid[event.pos] = event.side;
            
            if(Grid[0] == "X" && Grid[1] == "X" && Grid[2] == "X"){
                return true;
            }
            return false;
        }

        function notYourMove(event) {

            if(event.side != PlayerTurns) {
                 return true;
            }
            else{
                 return false;
            }
        }

        function togglePlayer () {
            if(PlayerTurns == "X"){
                PlayerTurns = "O";
                return;
            }
            PlayerTurns = "X";
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return GameFull;
        }

        function occupiedPos(pos) {
            return Grid[pos] != null;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            notYourMove:notYourMove,
            occupiedPos:occupiedPos,
            wonHorizontally:wonHorizontally,
            processEvents: processEvents
        }
    };
};
