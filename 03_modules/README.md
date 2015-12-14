npm init which creates package.json
package.json: this brings together key information (metadata) of how the project works and how it's run/configured
as well as the following:

1. Gives you name of the app, description, author
2. Instructions for starting the app, scripts
3. Dependencies:
    - you need to install these dependencies. This is either 
    a) for development (mocha e.g. unit tests)
    b) for compilation to run the application (jquery)
4. Version to run
5. Main is the first file to run
7. Scripts: 
    - These just run tasks when you write the command npm and you add an associated key word (e.g. npm start) 
    - Can create custom commands e.g. wow then call 'npm run wow'
    - Can create commands that will run before your command by using the key term pre (e.g. prewow). Therefore when you 
    do 'npm run wow', it'll do the prewow script first and then npm wow
8. Keywords: Used in things like github npm.org to find more easily in searching