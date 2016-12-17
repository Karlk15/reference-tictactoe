module.exports=function(injected){

    const io = require('socket.io-client');
    const RoutingContext = require('../../client/src/routing-context');
    const generateUUID = require('../../client/src/common/framework/uuid');

    var connectCount =0;

    function userAPI(){
        var waitingFor=[];
        var commandId=0;
        var gameInfo = {};
        var pos = 0;
        var side = 0;
        var routingContext = RoutingContext(inject({
            io,
            env:"test"
        }));

        connectCount++;
        const me = {
            expectUserAck:(cb)=>{
                waitingFor.push("expectUserAck");
                routingContext.socket.on('userAcknowledged', function(ackMessage){
                    expect(ackMessage.clientId).not.toBeUndefined();
                    waitingFor.pop();
                });
                return me;
            },

            sendChatMessage:(message)=>{
                var cmdId = generateUUID();
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"chatCommand", message });
                return me;
            },

            expectChatMessageReceived:(message)=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('chatMessageReceived', function(chatMessage){
                    expect(chatMessage.sender).not.toBeUndefined();
                    if(chatMessage.message===message){
                        waitingFor.pop();
                    }
                });
                return me;
            },

            cleanDatabase:()=>{
                var cmdId = commandId++;
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"cleanDatabase"});
                return me;
            },

            waitForCleanDatabase:()=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('databaseCleaned', function(chatMessage){
                    waitingFor.pop();
                });
                return me;
            },

            createGame:()=>{
                var cmdId = generateUUID();
                var gameId = generateUUID();
                gameInfo = {gameId:gameId, commandId:cmdId, side:"X", type:"CreateGame"};
                routingContext.commandRouter.routeMessage(gameInfo);
                return me;
            },

            expectGameCreated:()=>{
                waitingFor.push("expectGameCreated");
                routingContext.eventRouter.on('GameCreated', function(gameInfo){
                    waitingFor.pop();
                });
                return me;
            },

            joinGame:(gameId)=>{
                var cmdId = generateUUID();
                gameInfo = {gameId:gameId ,commandId:cmdId, side:"O", type:"JoinGame"};
                routingContext.commandRouter.routeMessage(gameInfo);
                return me;
            },

            expectGameJoined:()=>{
                waitingFor.push("expectGameJoined");
                routingContext.eventRouter.on('GameJoined', function(gameInfo){
                    waitingFor.pop();
                });
                return me;
            },

            getGame:()=>{
                return gameInfo;
            },

            placeMove:(x,y)=>{
                var cmdId = generateUUID();
                pos = (x*3+y);
                routingContext.commandRouter.routeMessage({gameId:gameInfo.gameId, commandId:cmdId, pos:pos, side:gameInfo.side, type:"PlaceMove"});
                return me;
            },

            expectMoveMade:()=>{
                waitingFor.push("expectMoveMade");
                routingContext.eventRouter.on('MovePlaced', function(gameInfo){
                    waitingFor.pop();
                });
                return me;
            },

            expectGameWon:()=>{
                waitingFor.push("expectGameWon");
                routingContext.eventRouter.on('GameWon', function(gameInfo){
                    waitingFor.pop();
                });
                return me;
            },

            then:(whenDoneWaiting)=>{
                function waitLonger(){
                    if(waitingFor.length>0){
                        setTimeout(waitLonger, 0);
                        return;
                    }
                    whenDoneWaiting();
                }
                waitLonger();
                return me;
            },
            disconnect:function(){
                routingContext.socket.disconnect();
            }

        };
        return me;

    }

    return userAPI;
};
