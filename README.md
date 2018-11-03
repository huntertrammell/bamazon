# Bamazon CLI app

This is a CLI app built with node and uses mySQL to host the database functions. When you load the app it will display some hard-coded items with information on stock, price, and ID number. This is pulled straight from the database and will update each time depending on what you have done in the previous session. I used the columnify npm package to handle sidplaying content in columns on the command line. Other than that i used inquirer to handle prompts and chalk to handle some text design. 

**To Begin:**

After you clone this repository you will need to copy the contents of the bamazon_.sql file into mySQL and start the server. Confirm that the port in the customer.js file matches the port used on your server. 

Once your server is setup you will need to create a .env file that contains the following:

    #mySQL server
    
    password=[YOUR PASSWORD]
    
after this is setup all you should need to do is initialize and install the application and dependencies in the package.json file.

Open GIT bash and run the customer.js file to purchase any of the items I randomly selected.

I am working on completing the manager.js file. this will provide the user the ability to add items to the database, view sales, and view inventory levels. I will update the read-me and repository once this has been completed.

Enjoy!
