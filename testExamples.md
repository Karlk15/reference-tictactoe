# 1 Create game command

##should emit game created event
- __Given__ that game has not been created
- __When__ Create Game command entered
- __Then__ GameCreated

# 2 Join game command

##should emit game joined event
- __Given__ that GameCreated
- __When__ Join Game command entered
- __Then__ player joins game

##should emit FullGameJoinAttempted when game full
- __Given__ that GameCreated and GameJoined
- __When__ Join Game command entered
- __Then__ [Game is full message]

# 3 Place move command

##should emit MovePlaced on first game move
- __Given__ that GameCreated and GameJoined
- __When__ [ Placed(0,2,X) ]
- __Then__ [ Placed(0,2,X) ]

##should emit IllegalMove when square is already occupied
- __Given__ that GameCreated and GameJoined, [ Placed(0,2,X) ]
- __When__ [ Place(0,2,O) ]
- __Then__ [Invalid Move message]

##Should emit NotYourMove if attempting to make move out of turn
- __Given__ that GameCreated and GameJoined, [ Placed(0,0,X), Placed(1,2,O) ]
- __When__ [ Place(2,0,O) ]
- __Then__ [NotYourMove message] shows up

##Player wins horizontally from left corner to right corner
- __Given__ that GameCreated and GameJoined, [ Placed(0,0,X),Placed(1,1,O), Placed(0,1,X),Placed(2,0,O) ]
- __When__ [ Place(0,2,X) ]
- __Then__ [ X Won ]

##Should emit game won vertically from left corner down
- __Given__ that GameCreated and GameJoined, [ Placed(0,0,X),Placed(1,1,O), Placed(1,0,X),Placed(0,2,O) ]
- __When__ [ Place(2,0,X) ]
- __Then__ [ X Won ]

##Should emit game won on Left corner cross down to right corner
- __Given__ that GameCreated and GameJoined, [ Placed(0,0,X), Placed(2,1,O), Placed(2,2,X), Placed(2,0,O) ]
- __When__ [ Place(1,1,X) ]
- __Then__ [ X Won ]

##Should emit game won right corner cross down to left corner
- __Given__ that GameCreated and GameJoined, [ Placed(0,2,X), Placed(2,2,O), Placed(2,0,X), Placed(0,0,O) ]
- __When__ [ Place(1,1,X)]
- __Then__ [ X Won]

##Should not emit game draw if won on last move
- __Given__  that GameCreated and GameJoined,

             [ Placed(0,0,X), Placed(0,1,O), Placed(0,2,X),

               Placed(1,0,O), Placed(1,1,X), Placed(1,2,X),

               Placed(2,0,O), Placed(2,1,X),]

- __When__ [ Place(1,2,X)]
- __Then__ [X Won]

##Should emit game draw when neither wins
- __Given__   that GameCreated and GameJoined,

             [ Placed(0,0,O), Placed(0,1,X), Placed(0,2,X),

               Placed(1,0,X), Placed(1,1,X), Placed(1,2,O),

               Placed(2,0,O), Placed(2,1,O),]
- __When__ [ Place(2,2,X)]
- __Then__ [Draw message] shows up
