# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
npm install
```

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname
```

### Compiles and hot-reloads for development
```
npm start
```

## Overview


# API Documentation

## Models
### models.js
<p>placeholder for model documentation </p>
<p>ph for table (field, type, description) </p>

## Routes/Endpoints

### 2. primaryData.js
The primaryData routes and endpoints are used when the user tries to get entries of a client, get events associated with a single client, create clients and add them into the database, and update client's information.

#### **Setup**
<p>
Activate express by instantiating an instance and setting it to a variable. Then, create a router for this instance to handle requests.

Then, import the data models from the models schema which uses mongoose as middleware to keep the structure of the collection.

In the primary data schema, both the primaryData and eventData schemas are imported.
</p>

#### **2.1 Getting All Client Entries**
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

#### **2.2 Get 1 Client by ID**
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




#### **2.3 Get 1 Client by First Name and/or Last Name**
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

#### **2.4 Get Events by Client ID**
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

#### **2.6 Updating a Client's Information**
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

