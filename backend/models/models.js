const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        primaryPhone: {
            type: String,
            required: true
        },
        secondaryPhone: {
            type: String
        }
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    organization_id: {
        type: String,
        required: true
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    eventName: {
        type: String,
        required: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }],
    organization_id: {
        type: String,
        required: true
    }
}, {
    collection: 'eventData'
});

//TODO: Revise this schema creation
//THOUGHTS: Is this schema even needed? How will new organizations be created?
let organizationDataSchema = new Schema({
    // _id is type string to faciliate 3 letter IDs like BOL, CFC etc
    _id:{ type: String},
    organizationName: {
        type: String
    },
    organizationDesc: {
        type: String
    }
},{
    collection: 'organizationData'
});

// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const orgdata = mongoose.model('organizationData', organizationDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, orgdata };
