# Neighbster-API
Neighbster-API's purpose is to allow users to upload their unused tools and share them with one another.

## Current Version

## Future Versions

## API Structure



# Routes

## api/signup

### POST
  * Creating User: In the request one should provide a Username, Password, and Email. One must create a user in order to sign in to the API.
  * Example: {"username": "dFarmer", "password": "somePassword", "email":"exampleuser@example.com" }

## api/signin

### GET
  * Sign In: In order to sign in once a user has been created Authorization is required from the user. This is provided in the form of the users "Username" and "Password".

## api/tools

### POST
  * Posting Tools: With this route a user can create a tool for others to see and check out. This route uses bearer authorization to make sure that there is a user associated with the creating of the tool. If you have not made a user account at this point, it is required to create.
  * Fields for POST:
    -(REQUIRED)
    -toolName
    -toolDescription
    -category

    -(OPTIONAL)
    -toolInstructions
    -serialNumber
    -picURI (link to chosen user picture)

    INSERT INPUT AND OUTPUT EXAMPLES....

### GET
  * Viewing Tools: Any visitor to the site will be able to view created tools, however it will be read only unless one has a user account with the site.

### PUT
  * Updating Tools: Only the user that posted the tool is able to update the tool in any way due to bearer authorization. It is simply a matter of including the desired property to change in JSON format and passing it into a PUT request.
  * Fields for PUT:
    -At least one field from the tool properties is required (SEE Fields for POST above)
    -A user can update as many fields as desired, not limited to one.

    INSERT INPUT AND OUTPUT EXAMPLES....

### DELETE
  * Deleting Tools: Again, only the user that posted the tool is able to delete the tool due to bearer authorization. 


## api/profiles

### POST

### GET

### PUT

### DELETE



## api/transactions

### POST

### GET

### PUT
