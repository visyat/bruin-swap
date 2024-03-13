# BruinSwap

Idea: Forum to allow students to post classes that they intend to drop and to help coordinate class swaps with other students.

## Setup

In the `express-server` directory, place the following keys in a file named `.env` to connect to our Amazon RDS instance and email server:
```
POSTGRES_HOST="cs35l-course-swaps.czme8i86mreh.us-east-2.rds.amazonaws.com"
POSTGRES_ADMIN_USER="postgres"
POSTGRES_PASSWORD="comsci35lpassword"
POSTGRES_DB_NAME="courseswaps"
POSTGRES_PORT="5432"
MAIL_SERVICE=gmail
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_ADDRESS=vishalyathish01@gmail.com
MAIL_PASSWORD="gdbe ksxx lrho ruhi"
```

In the `client` directory, place the following in a file named `.env.local` to allow the browser to connect to the server:
```
NEXT_PUBLIC_API_URI="http://localhost:3000"
```

## Demo/Features
TBD

## References
