
##  Technologies Used:

*React / Redux / Express / MongoDB / NodeJS* 

## How to Launch?
*from the root directory, open a terminal for each:*

Backend :  `cd .\backend\` +  `npm start`
Frontend :  `cd .\frontend\` +  `npm start`


## How to Setup?

*Set up the back:*

Connect your database with your cluster link in  `/config/db.js`

Create a `.env` file with these data:

PORT= `your port number localhost` such as `5000`
CLIENT_URL= `your client URL` such as `(http://localhost:3000/)`
DB_USER_PASS=  `your cluster link including your email and password from MongoDB`
TOKEN_SECRET= `your secret random key` such as `990bf68e6adf1be5f1671bba3bec692056922454`

*Set up the front:*

Create a `.env` file under `./frontend` with these data:
REACT_APP_API_URL= `your api URL` such as `(http://localhost:5000/)`

----------

https://docs.google.com/presentation/d/1xUPv8CGinhIq21wOPhCRrGGHPXjOZRJVyTcR5dGlrkM/edit?usp=sharing
