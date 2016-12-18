1. Jenkins URL and username and password and Game URL (AWS) information:
	- https://myschool.ru.is/myschool/?Page=LMS&ID=16&fagID=29478&View=52&ViewMode=2&Tab=&Act=11&verkID=65220


## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- Docker build
	- __npmCleanInstall.sh__ 
		used in:
		- TicTacToe_CommitStage 
		- TicTacToe_Loadtest 
		- TicTacToe_Acceptance_test
		- Cleans environment from npm and Installs npm for root and client
	- __pack.sh__ 
		- build new image
		- push in newest image
	- __runner.sh__
		- connects micratedb 
		- runs node run.js
- Docker compose
	- __docker-compose-and-run.sh__
		 - taking down, cleaning and starting docker-compose up with nodemon
- AWS Provisioning 
	- __provisioning.sh__
		-  unfinished 
- Other scripts
	- __cleanImages.sh__
		-  used to clean images

## Testing & logic

Outline what tests you created.

- UnitTests, server logic TDD (Git commit log) ? 

	__Create game command__

	✔ should emit game created event

	__Join game command__

	 ✔ should emit game joined event...
	 
	 ✔ should emit FullGameJoinAttempted event when game full..implement this

	__Place move command__

	✔ should emit MovePlaced on first game move...
	
	✔ should emit IllegalMove when square is already occupied...
	
	✔ Should emit NotYourMove if attempting to make move out of turn...
	
	✔ Player wins horizontally from left corner to right corner...
	
	✔ Should emit game won vertically from left corner down...
	
	✔ Should emit game won on Left corner cross down to right corner...
	
	✔ Should emit game won right corner cross down to left corner...
	
	✔ Should not emit game draw if won on last move...
	
	✔ Should emit game draw when neither wins...

- API Acceptance test - fluent API?

	__User chat API__
	
	✔ should get user session information on connect
	
	✔ should receive chat message back after sending chat command

	__Tictactoe API__
	
  	✔ should be able to play game to end

- Load test loop?

	__User chat load test__
	
	✔ should connect and send 200  user messages within 15000ms
	
	__Tictactoe load test__
	
 	✔ should be able to play game to end 100 times within 30000ms
	 
- UI TDD?  __Unfinished__
	 
- Is the game playable? __No__


## Data migration

Did you create a data migration.

- Migration up and down __Yes__


## Jenkins

Do you have the following Jobs and what happens in each Job:

- Commit Stage
__Yes__
	- __Sets up environment__
	- __builds__
	- __runs unittest__
- Acceptance Stage
 __Yes__
	 - __Runs api tests__
- Capacity Stage
 __Yes__
	 - __Runs Load tests__
- Other



Did you use any of the following features in Jenkins?

- Schedule or commit hooks
	- __Webhook__
- Pipeline
	- __Yes__
- Jenkins file
	- __No__
- Test reports
	- __YES__
- Other



## Monitoring

Did you do any monitoring?

- URL to monitoring tool. Must be open or include username and pass.
	-__No__


## Other

Anything else you did to improve you deployment pipeline of the project itself?
	- __No__
