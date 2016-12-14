var should = require("should");
var _ = require("lodash");

var TictactoeState = require("./tictactoe-state")(inject({}));

var tictactoe = require("./tictactoe-handler")(inject({
    TictactoeState
}));

var createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

var joinEvent = {
    type: "GameJoined",
    user: {
        userName: "kalli"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe("create game command", function() {


    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it("should emit game created event", function(){

        given = [];
        when =
        {
            id:"123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:"X"
            }
        ];

    })
});


describe("join game command", function () {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it("should emit game joined event...", function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }
        ];
        when =
            {
                type: "JoinGame",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:"O"
            }
        ];
    });

    it("should emit FullGameJoinAttempted event when game full..implement this", function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:"O"
            }
        ];
        when =
           {
                type: "JoinGame",
                user: {
                    userName: "beggi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
           };
        then = [
           {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "beggi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
           }
        ];
      });
});


describe("Place move command", function() {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it("should emit MovePlaced on first game move...", function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:"O"
            }
        ];
        when =
           {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos:"2",
                side:"X"
           };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "2",
                side:"X"
            }
        ];
    });

    it("should emit IllegalMove when square is already occupied...", function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                   userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "2",
                side:"X"
            }
        ];
        when =
            {
                type: "PlaceMove",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "2",
                side:"O"
            };
        then = [
            {
                type: "IllegalMove",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "2"
            }
        ];
      });

    it("Should emit NotYourMove if attempting to make move out of turn...", function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "2",
                side:"X"
            }
        ];
        when =
           {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "1",
                side:"X"
           };
       then = [
           {
               type: "NotYourMove",
               user: {
                   userName: "TheGuy"
               },
               name: "TheFirstGame",
               timeStamp: "2014-12-02T11:29:29",
               side:"X"
           }
       ];
    });

    it("Player wins horizontally from left corner to right corner...", function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "0",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "4",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "1",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "kalli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "6",
                side:"O"
            },
        ];
        when =
           {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                pos: "2",
                side:"X"
           };
       then = [
           {
               type: "GameWon",
               user: {
                   userName: "TheGuy"
               },
               name: "TheFirstGame",
               timeStamp: "2014-12-02T11:29:29",
               side:"X"
           }
       ];
    });
});
