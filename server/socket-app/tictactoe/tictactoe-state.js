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

            Grid[event.pos] = event.side;

            for(var i = 0; i < 9;i+3){
                //console.log(Grid);
                if(Grid[i] == PlayerTurns && Grid[i+1] == PlayerTurns && Grid[i+2] == PlayerTurns){
                    return true
                }
                return false;
            }
            /*
            if(Grid[0] == "X" && Grid[1] == "X" && Grid[2] == "X"){
                return true;
            }
            return false;
            */
        }

        function winVertically(event) {

            Grid[event.pos] = event.side;

            for(var i = 0; i < 3;i++){
                //console.log(Grid);
                if(Grid[i] == PlayerTurns && Grid[i+3] == PlayerTurns && Grid[i+6] == PlayerTurns){
                    return true
                }
                return false;
            }
            /*
            if(Grid[0] == "X" && Grid[3] == "X" && Grid[6] == "X"){
                return true;
            }
            return false;
            */
        }

        function winDiagonally(event){

            Grid[event.pos] = event.side;
            //console.log(Grid);
            if(Grid[0] == PlayerTurns && Grid[4] == PlayerTurns && Grid[8] == PlayerTurns){
                return true;
            }
            if(Grid[2] == PlayerTurns && Grid[4] == PlayerTurns && Grid[6] == PlayerTurns){
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

          Grid[event.pos] = event.side;

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
