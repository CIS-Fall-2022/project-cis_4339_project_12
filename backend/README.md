# TODO:

- Create delete endpoints for all collections
- Create CRUD endpoints for the organization collection

# Overview - CIS4339 Data Platform Project (Backend)
On the backend, [Mongoose ODM](https://www.mongodb.com/developer/languages/javascript/mongoose-versus-nodejs-driver/) is used as a schema validation layer in order to allow documents to have the same structure for a particular collection.[Express](http://expressjs.com/en/guide/using-middleware.html) serves as the middleware between the MongoDB database and the API built using [NodeJS](https://nodejs.org/en/docs/).

## Contents
- [Backend Functionality](#Backend-Functionality)
- [API Start Up](#api-start-up)
- [API Documentation](#api-documentation)
  - [Primary Data Routes](#1-primary-dataclients)
  - [Organization Data Routes](#2-organizations)

## Backend Functionality
- Able to read, create, update and delete client data
- Able to read, create, update and delete event data
- Able to create,read,update and delete organization data

## API Start up
```
npm install
```
Setup a .env file with the following variables, e.g.:
```
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname
```
Then use
```
npm start
```

# API Documentation

## 1. Primary Data/Clients
The primaryData routes and endpoints are used when the user tries to get entries of a client, get events associated with a single client, create clients and add them into the database, and update client's information.

#### **1.1 Getting All Client Entries**
Returns details of all clients.

```
GET http://localhost:3000/primaryData
```

Client Object contains:

<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Required?</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>_id</code></td>
<td>string</td>
<td>required</td>
<td>The unique identifier of the client</td>
</tr>
<tr>
<td><code>firstName</code></td>
<td>string</td>
<td>required</td>
<td>First name of the client</td>
</tr>
<tr>
<td><code>middleName</code></td>
<td>string</td>
<td>not required</td>
<td>Middle name of the client</td>
</tr>
<tr>
<td><code>lastName</code></td>
<td>string</td>
<td>required</td>
<td>Last name of the client</td>
</tr>
<tr>
<td><code>email</code></td>
<td>string</td>
<td>not required</td>
<td>Email address of the client</td>
</tr>
<tr>
<td><code>phoneNumbers</code></td>
<td>Object</td>
<td>required</td>
<td>Contains 2 Strings one to hold the primary phone number of the cilent, and the other to hold an alternate phone number of the client</td>
</tr>
<tr>
<td><code>address</code></td>
<td>Object</td>
<td>city required</td>
<td>Contains 5 Strings to hold the client's line 1 adress, line 2 adress, city, country, and zip respectively</td>
</tr>
</tbody>
</table>

Possible Errors:

<table>
<thead>
<tr>
<th>Error code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>405 Unknown</td>
<td>The request cannot access the database to find data</td>
</tr>
</tbody>
</table>

#### **1.2 Get 1 Client by ID**
Returns all details of the specified clients provided a valid client ID as URL token.

```
GET http://localhost:3000/primaryData/id/:id
```

Parameter list:

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required?</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>_id</code></td>
<td>string</td>
<td>required</td>
<td>The unique identifier of the client</td>
</tr>
</tbody>
</table>

Possible Errors:
<!-- https://github.com/Medium/medium-api-docs#2-authentication -->

<table>
<thead>
<tr>
<th>Error code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>400 Bad Request</td>
<td>Required fields not specified</td>
</tr>
<tr>
<td>401 Unauthorized</td>
<td>The ID is invalid</td>
</tr>
<tr>
<td>405 Unknown</td>
<td>The request cannot access the database to find data</td>
</tr>
</tbody>
</table>

Return Client Object Contains:
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>firstName</code></td>
<td>string</td>
<td>First name of the client</td>
</tr>
<tr>
<td><code>lastName</code></td>
<td>string</td>
<td>Last name of the client</td>
</tr>
<tr>
<td><code>phoneNumbers</code></td>
<td>Object</td>
<td>Contains the primary phone number of the cilent</td>
</tr>
<tr>
<td><code>address</code></td>
<td>Object</td>
<td>Contains client's city</td>
</tr>
</tbody>
</table>




#### **1.3 Get 1 Client by First Name and/or Last Name**
Returns all details of the specified clients provided a first name or lastname or both first and last name. The query uses a filter to search through the results. There may be multiple client objects that meet the requirements of a given first and last name. 

```
GET http://localhost:3000/primaryData/search
```

Parameter list:

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required?</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>firstName</code></td>
<td>string</td>
<td>not required</td>
<td>the first name of a client</td>
</tr>
<tr>
<td><code>lastName</code></td>
<td>string</td>
<td>not required</td>
<td>the last name of a client</td>
</tr>
<tr>
<td><code>searchBy</code></td>
<td>string</td>
<td>required</td>
<td>the filter used to search through the database, can be 'name' or 'number'</td>
</tr>
</tbody>
</table>

Possible Errors:
<!-- https://github.com/Medium/medium-api-docs#2-authentication -->

<table>
<thead>
<tr>
<th>Error code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>400 Bad Request</td>
<td>Required fields not specified</td>
</tr>
<tr>
<td>405 Unknown</td>
<td>The request cannot access the database to find data</td>
</tr>
</tbody>
</table>

Return Client Object Contains:
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>firstName</code></td>
<td>string</td>
<td>First name of the client</td>
</tr>
<tr>
<td><code>lastName</code></td>
<td>string</td>
<td>Last name of the client</td>
</tr>
<tr>
<td><code>phoneNumbers</code></td>
<td>Object</td>
<td>Contains the primary phone number of the cilent</td>
</tr>
<tr>
<td><code>address</code></td>
<td>Object</td>
<td>Contains client's city</td>
</tr>
</tbody>
</table>

#### **1.4 Get Events by Client ID**
Returns details of each event that the client is involved with.

```
GET http://localhost:3000/primaryData/events/:id
```

Parameter list:

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required?</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>_id</code></td>
<td>string</td>
<td>required</td>
<td>The unique identifier of the client</td>
</tr>
</tbody>
</table>

Possible Errors:
<!-- https://github.com/Medium/medium-api-docs#2-authentication -->

<table>
<thead>
<tr>
<th>Error code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>400 Bad Request</td>
<td>Required fields not specified</td>
</tr>
<tr>
<td>401 Unauthorized</td>
<td>The ID is invalid</td>
</tr>
<tr>
<td>405 Unknown</td>
<td>The request cannot access the database to find data</td>
</tr>
</tbody>
</table>

Return Event Object Contains:
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>eventName</code></td>
<td>string</td>
<td>Name of event</td>
</tr>
<tr>
<td><code>date</code></td>
<td>Date</td>
<td>Date of the Event</td>
</tr>
<tr>
<td><code>address</code></td>
<td>Object</td>
<td>Address of the event using address line 1 String</td>
</tr>
</tbody>
</table>
<!-- 
Phone numbers is not within an array anymore -->
#### **2.5 Creating a Client**
Creates a client using a POST request or the client intake form.

```
POST http://localhost:3000/primaryData/
```

Example Request:

```
POST / HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "_id": "96fb0b80-2d4d-11ed-8dbb-afee4c00c4cb",
  "firstName": "Pablo",
  "lastName": "Escobang",
  "phoneNumbers": ["7135558787", "8325554545"],
  "address": {
    "city": "Houston"
}
```


Possible Errors:
<!-- https://github.com/Medium/medium-api-docs#2-authentication -->

<table>
<thead>
<tr>
<th>Error code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>400 Bad Request</td>
<td>Required fields not specified</td>
</tr>
<tr>
<td>405 Unknown</td>
<td>The request cannot access the database to find data</td>
</tr>
</tbody>
</table>

#### **1.6 Updating a Client's Information**
Updates a client's informatio using a PUT request based on the client's ID.

```
PUT http://localhost:3000/primaryData/:id
```

Here, the id is the client's ID whose information will be updated.

Example Request:

```
PUT / HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "_id": "96fb0b80-2d4d-11ed-8dbb-afee4c00c4cb",
  "firstName": "Pablito",
  "lastName": "Escobongo",
  "phoneNumbers": ["7135555555", "8325556666"],
  "address": {
    "city": "Dallas"
}
```

Response will be identical with the addition of the follwing field:
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>_id</td>
<td>String</td>
<td>Client ID that is associated to the update request
</tr>
</tbody>
</table>



Possible Errors:
<!-- https://github.com/Medium/medium-api-docs#2-authentication -->

<table>
<thead>
<tr>
<th>Error code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>400 Bad Request</td>
<td>Required fields not specified</td>
</tr>
<tr>
<td>401 Unauthorized</td>
<td>The ID is invalid</td>
</tr>
<tr>
<td>405 Unknown</td>
<td>The request cannot access the database to find data</td>
</tr>
</tbody>
</table>


NOTE: All GET, POST, and PUT requests will be handled by the router.

### eventsData.js
<p>placehodler for eventsData.js documentation</p>
<p>ph for table (field, type, description) 
</p>
<p>Creating an event with primaryData</p>

## 2. Organizations
#### NB. These routes/endpoints are only accessible via API and will not be a front-end feature.<br><br>
### 2.1 Getting all organizations from organizationData collection

### Method - GET

````
GET http://localhost:{PORT}/organizationData
````

Example Request:
```
TO BE ADDED
```
Example Response:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "_id": "BOL",
  "organizationDesc": "Saving lives"
}
```
### 2.2 Updating specific organization from organizationData collection
### Method - PUT

````
PUT http://localhost:{PORT}/organizationData
````
Example Request:
```
TO BE ADDED
```
Example Response:
```
TO BE ADDED
```
### 2.3 Creating new organization within organizationData collection
### Method - POST
```
POST http://localhost:{PORT}/organizationData
```
Example Request:
```
TO BE ADDED
```
Example Response:
```
TO BE ADDED
```
### 2.4 Deleting specific organization within organizationData collection
### Method - DELETE
```
DELETE http://localhost:{PORT}/organizationData
```
Example Request:
```
TO BE ADDED
```
Example Response:
```
TO BE ADDED
```
