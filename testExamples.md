# 1 Create game command

##Create a game
- __Given__ that game has not been created
- __When__ Create Game command entered
- __Then__ new game is created

# 2 Join game command

##Join a game
- __Given__ that game exists
- __When__ Join Game command entered
- __Then__ player joins game

##Attempted to join full game
- __Given__ that game is full
- __When__ Join Game command entered
- __Then__ [Game is full message]

# 3 Place move command

##MovePlaced on first game move
- __Given__ that the board is empty
- __When__ [ Placed(0,2,X) ]
- __Then__ [ Place(0,2,X) ] is set as X and now Occupied

##Occupied place in move
- __Given__ [ Placed(0,0,X)
- __When__ [ Place(0,0,X)]
- __Then__ [Invalid Move message] shows up

## attempting to make move out of turn
- __Given__ that it is player 2 turn
- __When__ player 1 tries to make a move
- __Then__ [NotYourMove message] shows up

##Player wins horizontally from left corner to right corner
- __Given__ [ Placed(0,0,X), Placed(0,1,X) ]
- __When__ [ Place(0,2,X) ]
- __Then__ [ X Won ]

##Player wins vertically from left corner down
- __Given__ [ Placed(0,0,X), Placed(1,0,X) ]
- __When__ [ Place(2,0,X) ]
- __Then__ [ X Won ]

##Player wins Left corner cross down to right corner
- __Given__ [ Placed(0,0,X), Placed(1,1,X) ]
- __When__ [ Place(2,2,X) ]
- __Then__ [ X Won ]

##Player wins right corner cross down to left corner
- __Given__ [ Placed(0,2,X), Placed(1,1,X) ]
- __When__ [ Place(2,1,X)]
- __Then__ [ X Won]

##Not a draw if last move was a winning move
- __Given__ X|O|X
            O|X|X
            O|O|
- __When__ [ Place(1,2,X)]
- __Then__ [X Won]

##Draw on last move
- __Given__ O|X|X
            X|X|O
            O|O|
- __When__ [ Place(2,2,X)]
- __Then__ [Draw message] shows up
