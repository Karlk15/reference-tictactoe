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

        function winHorizontally(event) {

            for(var i = 0; i < 9;i+3){
                //console.log(Grid);
                if(Grid[i] == event.side && Grid[i+1] == event.side && Grid[i+2] == event.side){
                    return true
                }
                return false;
            }
        }

        function winVertically(event) {

            for(var i = 0; i < 3;i++){
                //console.log(Grid);
                if(Grid[i] == event.side && Grid[i+3] == event.side && Grid[i+6] == event.side){
                    return true
                }
                return false;
            }
        }

        function winDiagonally(event){

            if(Grid[0] == event.side && Grid[4] == event.side && Grid[8] == event.side){
                return true;
            }
            if(Grid[2] == event.side && Grid[4] == event.side && Grid[6] == event.side){
                return true;
            }

            return false;
        }

        function checkForWin(event){

            if(winHorizontally(event)|| winVertically(event)|| winDiagonally(event)){
                return true;
            }

            else return false;
        }

        function checkForDraw(event){

            for(var i = 0; i < 9; i++){
                if(Grid[i] != null ){
                    return true;
                }
                return false;
            }
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
            checkForWin:checkForWin,
            checkForDraw:checkForDraw,
            processEvents: processEvents
        }
    };
};
