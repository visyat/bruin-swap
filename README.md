# Course Swapper

Idea: Forum to allow students to post classes that they intend to drop and to help coordinate class swaps with other students. 

To test out working queries, run the following commands: 

```
npm install
npm start
```
Access the website on ```localhost:3000/```

Active tests currently: 

```localhost:3000/classes``` - Returns a json of all entries in classes table

```localhost:3000/transactions``` - Returns a json of all entries in active_transactions table

```localhost:3000/transactions/:{id}``` - Returns json of all transactions posted by a specific user; replace {id} with the desired user's ID
