![](assets/neighbster-logo.png)
# Neighbster-API
###### Allowing users to upload their unused tools and share them with one another.

## Current Version
  * Our current version of Neighbster-API is a backend application with routes allowing for one to Create, Read, Update, and Destroy information. The API includes models for Users, Profiles, Tools, and Transactions between users.

## Future Versions
  * Moving forward Neighbster will have a front end and eventually be integrated with social media allowing users to share tools with their friends. Future versions will also include item allowances for things other than tools.

## API Structure
  ### Bearer Authorization
  * For all routes except api/signup and api/signin, bearer authorization is required for all POST, PUT, and DELETE requests.

  * Bearer authorization requires headers, with a Key of Authorization and a Value of "Bearer [users token]".


# Routes

## api/signup

### POST
  * Creating User: In the request one should provide a Username, Password, and Email. One must create a user in order to sign in to the API.

        Example: {"username": "dFarmer", "password": "somePassword", "email":"exampleuser@example.com" }

        The API will then return a token which will be needed for bearer authorization.

## api/signin

### GET
  * Sign In: In order to sign in once a user has been created Authorization is required from the user. This is provided in the form of the users "Username" and "Password".

  * Username and password should be provided through basic authorization.

  * API will respond with a token.

## api/tools

### POST
  * Creating Tools: With this route a user can create a tool for others to see and check out. This route uses bearer authorization to make sure that there is a user associated with the creating of the tool. If you have not made a user account at this point, it is required to create one.

  * Tool must be uploaded with form-data.

  * Fields for POST:  
    (REQUIRED)  
    -toolName  
    -toolDescription  
    -category  
    -image file (image of the tool)  

    (OPTIONAL)  
    -toolInstructions  
    -serialNumber  

  * API Response (Tool Object)  


    {
      “ownerId”: “5966a828a18bb30011fed7b4”,
      “serialNumber”: 1234,
      “toolName”: “‘test-tool’“,
      “toolDescription”: “‘test-description’“,
      “toolInstructions”: “‘test-instructions’“,
      “picURI”: “https://neighbster.s3.amazonaws.com/60488115d033872c26421ee744ed5e44.jpeg (22kB)“,
      “category”: “‘auto’“,
      "_id": “5967b6b161dad90011822f6a”,
      “isCheckedOut”: false
    };



### GET
  * Viewing Tools: Any visitor to the site will be able to view created tools without authorization, however it will be read only unless one has a user account with the site.  

  * User will need to add the toolId to the end of the URL as follows:

        Example: http://neighbster.herokuapp.com/tools/5967b6b161dad90011822f6a

        API will return a Tool object.


### PUT
  * Updating Tools: Only the user that posted the tool is able to update the tool in any way due to bearer authorization. It is simply a matter of including the desired property to change in JSON format and passing it into a PUT request.

  * Fields for PUT:  
    -At least one field from the tool properties is required (SEE Fields for POST above)  

    -A user can update as many fields as desired, not limited to one.

        Example:

        User makes PUT request to   http://neighbster.herokuapp.com/api/tools/5967b6b161dad90011822f6a

        {“serialNumber”:“5678"}

        API will respond with updated Tool object

        {
          “_id”: “5967b6b161dad90011822f6a”,
          “ownerId”: “5966a828a18bb30011fed7b4",
          “serialNumber”: 5678,
          “toolName”: “‘test-tool’“,
          “toolDescription”: “‘test-description’“,
          “toolInstructions”: “‘test-instructions’“,
          “picURI”: “https://neighbster.s3.amazonaws.com/60488115d033872c26421ee744ed5e44.jpeg“,
          “category”: “‘auto’“,
          “__v”: 0,
          “isCheckedOut”: false
        }

### DELETE
  * Deleting Tools: Again, only the user that posted the tool is able to delete the tool due to bearer authorization.

  * To delete a tool the user must pass in the toolId

        Example:

        User makes DELETE request to   http://neighbster.herokuapp.com/api/tools/5967b6b161dad90011822f6a

        API will delete Tool object from database and respond with a 204 status code.


## api/profile

### POST
  * Creating a Profile: creating a profile requires that one is a user. The profile will be linked to the user and have additional information about them.

  * Fields for POST:  
    (REQUIRED)  
    -address  
    -phone  
    -realName  
    (OPTIONAL)  
    -picURI (link to profile picture)  

  * API Response (Profile Object)  

        {
        "__v": 0,
        "address": "123 Main St  Seattle WA 98001",
        "phone": "(206) 123-4567",
        "realName": "Derek Farmer",
        "picURI": "https://neighbster.s3-us-west-2.amazonaws.com/f1e34c7bdf2091d7b16dfd2e178d77c0.png",
        "userId": "5967d6cefafd9a001155b10e",
        "_id": "5967e4ff671afb00116787d4"
        }

### GET
  * Viewing Profiles: Any visitor to the site will be able to view created profiles, however it will be read only unless the user is the owner of the profile.

  * User will need to add the profileId to the end of the URL as follows:

        Example: http://neighbster.herokuapp.com/profile/5967e4ff671afb00116787d4

        API will return a Profile Object

### PUT
  * Updating Profiles: This requires one to be the user associated with the profile due to the bearer authorization. It is simply a matter of including the desired property to change in JSON format and passing it into a PUT request.

  * Fields for PUT:  
    -At least one field from the profile properties is required (SEE Fields for POST above)  

    -A user can update as many fields as desired, not limited to one.  

        Example:

        User makes PUT request to   http://neighbster.herokuapp.com/api/profile/5967e4ff671afb00116787d4

        {“realName”:“Josh Farber"}

        API will respond with updated Profile object

        {
        "__v": 0,
        "address": "123 Main St  Seattle WA 98001",
        "phone": "(206) 123-4567",
        "realName": "Josh Farber",
        "picURI": "https://neighbster.s3-us-west-2.amazonaws.com/f1e34c7bdf2091d7b16dfd2e178d77c0.png",
        "userId": "5967d6cefafd9a001155b10e",
        "_id": "5967e4ff671afb00116787d4"
        }

### DELETE
  * Deleting Profiles: Again, only the user that created the profile is able to delete the profile due to bearer authorization.

  * To delete a profile the user must pass in the profileId

        Example:

        User makes DELETE request to http://neighbster.herokuapp.com/api/profile/5967e4ff671afb00116787d4

        API will delete Profile object from database and respond with a 204 status code.


## api/transactions

### POST
  *Creating a Transaction: a user creates a transaction (however from a front end standpoint this would happen through clicking a button that says checkout tool)

  *Fields for POST:  
  (REQUIRED)  
  -borrowerId(this is the user._id for the borrower)  
  -toolId(this is the tool._id for the tool being borrowed)  
  -startDate  
  -endDate  

  *API Response Transaction Object  

    {  
    "__v": 0,
    "borrowerId": "5967d6cefafd9a001155b10e",  
    "toolId": "5967e0f0671afb00116787d2",  
    "startDate": "2017-07-13T21:56:22.599Z",  
    "endDate": "2017-07-13T21:56:22.599Z",  
    "transactionDate": "2017-07-13T21:56:22.599Z",  
    "_id": "5967ed33671afb00116787d6"  
    }

### GET
  *Viewing Transactions: viewing transactions will be so that a user can see the transaction history of a tool that they would like to borrow. This will be read only for all users.

  *User will need to add the transactionId to the end of the URL as follows:

    Example: http://neighbster.herokuapp.com/transaction/5967ed33671afb00116787d6

    API will return a Transaction Object

### PUT
  *Updating Transactions: transactions are not changed manually by a user in any way, rather they keep a record of transaction dates for administrative purposes (on the part of both the user and the Admin of the site)

  -At least one field from the profile properties is required (SEE Fields for POST above)  

  -A user can update as many fields as desired, not limited to one.  

    Example:

    User makes PUT request to   http://neighbster.herokuapp.com/api/transactions/5967ed33671afb00116787d6

    {"endDate": "2017-17-13T21:56:22.599Z"}

    API will respond with updated Profile object

    {
    "__v": 0,
    "borrowerId": "5967d6cefafd9a001155b10e",
    "toolId": "5967e0f0671afb00116787d2",
    "startDate": "2017-07-13T21:56:22.599Z",
    "endDate": "2017-17-13T21:56:22.599Z",
    "transactionDate": "2017-07-13T21:56:22.599Z",
    "_id": "5967ed33671afb00116787d6"
    }







# About Us

## Saul Greene
  My name is Saul Greene, I am a full stack Java Developer who with interest in the front end and design aspect of web development. I love to see visual products of my work and cannot wait to make a front end to this API!

## Matthew Parker  
  Hi, I'm Matthew! I'm a writer, specializing in fantasy fiction and JavaScript (sometimes the same thing). I like working on creative applications that improve peoples' lives, if even in little ways. I hope you enjoy our API!

## Derek Farmer
  Derek is a graduate of Seattle University’s School of Theology and Ministry. He spent a year in Rome studying at the Pontifical University of St. Thomas Aquinas. Later, Derek was an intelligence officer in the US Navy, stationed globally aboard the USS Monterey (CG-61). He was Field Director for Mike McGinn’s 2009 campaign for Mayor of Seattle and spent two years working for at City Hall in constituent relations. He managed the Food and Faith Initiative for Tilth Alliance, which seeks to help faith communities build vegetable gardens on their properties.
