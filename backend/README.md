# POSTMAN Documentation (Most Current)
Link here: https://documenter.getpostman.com/view/19779849/2s83zfQkVv

# Overview - CIS4339 Data Platform Project (Backend)
On the backend, [Mongoose ODM](https://www.mongodb.com/developer/languages/javascript/mongoose-versus-nodejs-driver/) is used as a schema validation layer in order to allow documents to have the same structure for a particular collection.[Express](http://expressjs.com/en/guide/using-middleware.html) serves as the middleware between the MongoDB database and the API built using [NodeJS](https://nodejs.org/en/docs/).

## Contents
- [Backend Functionality](#Backend-Functionality)
- [API Start Up](#api-start-up)
- [API Documentation](#api-documentation)
  - [Primary Data Routes](#1-primary-dataclients)
  - [Event Data Routes](#2-event-data)
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
Returns details of last ten (10) most recently updated/added clients.

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

#### **1.5 Creating a Client**
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
  "firstName": "Pablo",
  "lastName": "Escobang", 
  "phoneNumbers": {
        "primaryPhone": "7135558787",
        "secondaryPhone": "8325554545"        
    },
  "address": {
    "city": "Houston"
}
```

#### **1.6 Updating a Client's Information**
Updates a client's information using a PUT request based on the client's ID.

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
  "firstName": "Pablito",
  "lastName": "Escobongo",
  "phoneNumbers": {
    "primaryPhone": "7135555555", 
    "secondaryPhone": "8325556666"
    },
  "address": {
    "city": "Dallas"
}
```

Response will be identical with the change using the follwing field for matching:
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
<td>Client ID that is associated to the update request</td>
</tr>
</tbody>
</table>

#### **1.7 Deleting a Client's Information**
Deletes a client's information using a DELETE request based on the client's ID.

```
DELETE http://localhost:3000/primaryData/:id
```

Here, the id is the client's ID whose information will be deleted.

NOTE: All GET, POST, PUT, and DELETE requests will be handled by the router.

## **2. Event Data**
The eventData endpoints and routes will be used for all the information regarding events. Furthermore, the routes will also allow the creation of new events, update events information if needed, how many attendees are there for an event, and get entries of all the events.

#### **2.1 Getting all Event entries**
This will return details of all the events that are taking place. 

```
GET http://localhost:3000/eventData
```
Event Data object contains: 

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
<td>The unique identifier of event</td>
</tr>
<tr>
<td><code>eventName</code></td>
<td>string</td>
<td>required</td>
<td>The name of the event</td>
</tr>
<tr>
<td><code>Date</code></td>
<td>Date</td>
<td>required</td>
<td>When the event will take place</td>
</tr>
<tr>
<td><code>Event Address</code></td>
<td>Object</td>
<td>required</td>
<td>Contains 5 Strings to hold the client's line 1 adress, line 2 adress, city, country, and zip respectively</td>
</tr>
<tr>
<td><code>Description</code></td>
<td>string</td>
<td>not required</td>
<td>Description of the event </td>
</tr>
</tbody>
</table>

#### **2.2 Getting an event by Event Name or Date**
Retrieve an event using the event name or date parameters. 

```
GET http://localhost:3000/eventData/search/ 

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
<td><code>eventName</code></td>
<td>string</td>
<td>required</td>
<td>The name of the event</td>
</tr>
<tr>
<td><code>Date</code></td>
<td>Date</td>
<td>required</td>
<td>When the event will take place</td>
</tr>
</tbody>
</table>

Return event Object Contains:
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
<td>Name of the event</td>
</tr>
<tr>
<td><code>Date</code></td>
<td>Date</td>
<td>Date of the event that will take place</td>
</tr>
<td><code>Address</code></td>
<td>Object</td>
<td>Contains the address strings of the event</td>

</tbody>
</table>



#### **2.3 Get event by event ID**
Returns details of specified event.

```
GET http://localhost:3000/eventData/id/:id"
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
<td>The unique identifier of the event</td>
</tr>
</tbody>
</table>

#### **2.4 Attendee count for events of last two months**
Get all event attendee count for events in last two months
```
GET http://localhost:3000/attendees
```
Example Response:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
    {
        "_id": "cac37b60-2be4-11ed-aa14-1124461477ba",
        "eventName": "Food Drive Event",
        "totalAttendees": 2
    },
    {
        "_id": "633cde5e6be140127d95d257",
        "eventName": "Food Drive Event 2",
        "totalAttendees": 4
    }
]
```


### **2.5 Create a new event**
Create using a POST request or the client intake form.
New event can be created using a POST request which will have frontend called 'Create Event'. This will be linked with the OrganizationData _id to show which organizations is holding the event.
```
POST http://localhost:3000/eventData/
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
  "eventName": "Cancer Awareness",
  "Services": "Family Support",
  "address": {
    "line1": "123 memorial drive"
    "city":"Houston"
    "zip": "77712"
  "organization_id":"(organization id)"
}
```

#### **2.6 Updating Event Information**
To update an event information, PUT request will be utilized by using the event ID.
```
PUT http://localhost:3000/eventData/:id
```

Here, the id is the event's ID whose information will be updated.

Example Request:

```
PUT / HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "_id": "96fb0b80-2d4d-11ed-8dbb-afee4c00c4cb",
  "eventName": "Cancer Awareness",
  "Services": "Family Support",
  "address": {
    "line1": "123 memorial drive"
    "city":"Austin"
    "zip": "87712"
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
<td>Client ID that is associated to the update request</td>
</tr>
</tbody>
</table>

#### **2.7 Adding attendee to event**
This endpoint allows for an attendee to be added to an event
```
PUT http://localhost:3000/eventData/attendee/:id
```
Example Request:
```
PUT / HTTP/1.1 200 ok
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "attendee": {attendeeID}
}
```
With the following query/parameters:
````
?id = {eventID}
````
Example Response:
```
Attendee has been added successfully.
```
#### **2.8 Deleting Event Information**
Deletes a event information using a DELETE request based on the event ID.

```
DELETE http://localhost:3000/eventData/:id
```
#### **2.9 Delete attendee from event**
This endpoint allows an anttendee to be deleted from an event when the id is provided
```
DELETE http://localhost:3000/eventData/attendee/:id
```


## 3. **Organizations**
#### NB. These routes/endpoints are only accessible via API and will not be a front-end feature.<br><br>
### 3.1 Getting all organizations from organizationData collection

### Endpoint - GET Method
````
GET http://localhost:3000/organizationData
````
Example Response:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
  _id: "BOL",
	organizationName: "Bread Of Life",
	organizationDesc: "Saving The Community"
  },
  {
    _id: "CFC",
	organizationName: "Community Family Centers",
	organizationDesc: "Developing A Bright Future"
  }
]
```

Where an organization object is:
| Field             | Type     | Description                |
| ---------------   |----------|- |
| `_id`             | string   | Unique organization ID     |
| `organizationName`| string   | Name of Organization       |
| `organizationDesc`| string   | Decription of organization |

<br>
<br>

### **3.2 Updating specific organization from organizationData collection**
### Endpoint - PUT Method
````
PUT http://localhost:3000/organizationData/:id
````
Send a PUT request to update a specific organization's data

Example Request:
```
PUT / HTTP/1.1 200 ok
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "organizationDesc":"Saving The Lives",
  "organizationName": "Bread of Life"
}
```
With the following query/parameters:
````
?id = BOL
````
Example Response:
```
BOL has been updated successfully.
```
Possible errors:

| Error code           | Description                                                                           |
| ---------------------|---------------------------------------------------------------------------------------|
| 400 Bad Request     | No organization ID (`_id`) was included in the request |                         |

<br>
<br>

### **3.3 Creating new organization within organizationData collection**
### Method - POST
```
POST http://localhost:3000/organizationData
```
Example Request:
```
POST / HTTP/1.1 200 ok
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
    "_id":"BOL",
    "organizationName": "Bread of Life"
}
```
Where an organization object is:
| Field             | Type     | Description                |
| ---------------   |----------|- |
| `_id`             | string   | Unique organization ID     |
| `organizationName`| string   | Name of Organization       |
| `organizationDesc`| string   | Decription of organization |

Example Response:
```
BOL has been added successfully.
```

Possible errors:

| Error code           | Description                                                                           |
| ---------------------|---------------------------------------------------------------------------------------|
| 400 Bad Request     | No organization ID (`_id`) was included in the request |

<br>
<br>

### **3.4 Deleting specific organization within organizationData collection**
### Method - DELETE
```
DELETE http://localhost:3000/organizationData/:id
```
With the following query/parameters:
````
?id = BOL
````
Example Response:
```
BOL has been deleted successfully.
```
Possible errors:

| Error code           | Description                                                                           |
| ---------------------|---------------------------------------------------------------------------------------|
| 400 Bad Request     | No organization ID (`_id`) was included in the request |
```
