const io = require('socket.io-client');
const RoutingContext = require('../client/src/routing-context');
var UserAPI = require('./fluentapi/user-api');
var TestAPI = require('./fluentapi/test-api');

const userAPI = UserAPI(inject({
    io,
    RoutingContext
}));

const testAPI = TestAPI(inject({
    io,
    RoutingContext
}));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('Tictactoe load test', function(){


    beforeEach(function(done){
        var testapi = testAPI();
        testapi.waitForCleanDatabase().cleanDatabase().then(()=>{
            testapi.disconnect();
            done();
        });
    });

    const count = 100;
    const timelimit = 50000;

    it('should be able to play game to end ' + count + ' times within '+ timelimit +'ms',function(done){

        var startMillis = new Date().getTime();

        var userA;
        var userB;
        var users=[];

        for(var i=0; i<count; i++){

            userA = userAPI("User#" + i);
            userB = userAPI("User#" + i);
            users.push(userA);
            users.push(userB);

            userA.createGame().then(()=> {
                    userB.joinGame(userA.getGame().gameId).then(function () {
                        userA.placeMove(0, 0).then(()=> {
                            userB.placeMove(1, 0).then(()=> {
                                userA.placeMove(1, 1).then(()=> {
                                    userB.placeMove(0, 2).then(()=> {
                                        userA.placeMove(2, 2)
                                    })
                                })
                            });
                        })
                    })
                }
            );
        }

        userA = userAPI("Final userA");
        userB = userAPI("Final userB");
        userA.expectGameCreated().createGame().then(()=> {
                userB.expectGameJoined().joinGame(userA.getGame().gameId).then(function () {
                    userA.expectMoveMade().placeMove(0, 0).then(()=> {
                        userA.expectMoveMade();
                        userB.expectMoveMade().placeMove(1, 0).then(()=> {
                            userB.expectMoveMade(); // By other user
                            userA.expectMoveMade().placeMove(1, 1).then(()=> {
                                userA.expectMoveMade(); // By other user
                                userB.expectMoveMade().placeMove(0, 2).then(()=> {
                                    userB.expectMoveMade(); // By other user
                                    userA.expectMoveMade().placeMove(2, 2)
                                        .expectGameWon().then(function(){
                                            userA.disconnect();
                                            userB.disconnect();
                                            _.each(users, function(usr){
                                                usr.disconnect();
                                            });

                                            var endMillis = new Date().getTime();
                                            var duration = endMillis - startMillis;
                                            if(duration > timelimit){
                                                done.fail(duration + " exceeds limit " + timelimit);
                                            } else {
                                                done();

                                            }
                                        });
                                })
                            })
                        });
                    })
                })
            }
        );
    });
});
