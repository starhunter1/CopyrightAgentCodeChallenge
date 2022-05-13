# code-challenge
A code challenge used to assess developers knowledge and skills

### Scenario
A developer has tried to do a task that you must now take over and complete.

The task has been extended with additional requirements after the developer left.

OBS: The API mock must be used and it must not be changed.

### Requirements
- It must be possible to run the program and get back the colors green, blue and red in HEX format.
- It must be possible to define the colors using their names like red, blue and green.
- It must be possible to define the order the colors are returned.

### New additional requirements
- The program must support the colors white and black.
- The program must be able to return the RGB values.
- It must be possible to run the program asynchronously getting all the colors at the same time
- It must be possible to run the program synchronously getting one color a time

# Solution

### Prerequisites
- Node >= v16
- The solution requires to install npm packages (just for spice)

### Execute npm scripts for each requirement
- It must be possible to run the program and get back the colors green, blue and red in HEX format.\
`npm run req1`

- It must be possible to define the colors using their names like red, blue and green.\
`npm run req2`

- It must be possible to define the order the colors are returned.\
`npm run req3`

- The program must support the colors white and black.\
`npm run req4`

- The program must be able to return the RGB values.\
`npm run req5`

- It must be possible to run the program asynchronously getting all the colors at the same time\
`npm run req6`

- It must be possible to run the program synchronously getting one color a time\
`npm run req7`

- Error handling\
`npm run req8`


### Command arguments

`--colors`
- default: 'green,red,blue'
- description: a commaseperated list of colors by name in order for output
- valid values: 'green,red,blue,white,black'

`--output`
- default: HEX
- description: the output format 
- valid values: HEX or RGB

`--sync`
- default: false
- description: flag to enable synchronously fetching colors one a time
- valid values: boolean