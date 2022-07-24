# appointments_api instruction

## Environment Set Up:
### step 1: install nvm and npm
  https://heynode.com/tutorial/install-nodejs-locally-nvm/
### step 2: use node version 16.16.0
```
nvm use 16.16.0
```
### step 3: install express
```
npm install express --save-dev
```
### step 4: install nodemon 
```
npm install -g nodemon
```
### step 5: set up environment variable PORT=4000
```
export PORT=4000
```
### step 6: install postman for demo and test

## Demo:
### step 1: 
```
git clone https://github.com/dikewang/appointments_api.git
```
### step 2:
```
nodemon index.js
```
### step 3: open postman and test different cases
  #### case 1: get all current doctors:
    GET http://localhost:4000/api/doctors/
  #### case 2: get all current appointments:
    GET http://localhost:4000/api/appointments/
  #### case 3: get a list of all appointments for a particular doctor and particular day:
    GET http://localhost:4000/api/appointments/[DOCTOR_ID]/[DATE]
    example: GET http://localhost:4000/api/appointments/1/11032022
  #### case 4: Deleting an existing appointment from doctor's calendar:
    DELETE http://localhost:4000/api/appointments/[APPOINTMENT_ID]
    example: DELETE http://localhost:4000/api/appointments/2
  #### case 5: Add a new appointment to a doctor's calendar:
    POST http://localhost:4000/api/appointments/
    
    example VALID request body in JSON(can post the same appointment multiple times to test maximum 3 appointments 
    can be scheduled at the same time for a doctor): 
    {
      "doctor_first_name": "Rick",
       "doctor_last_name": "Novak",
              "doctor_id": 1,
     "patient_first_name": "Tom",
      "patient_last_name": "Liu",
                   "date": "11032022",
                   "time": "01:15pm",
                   "kind": "New Patient"
    } 
    
    
    example request body with INVALID interval in JSON: 
    {
      "doctor_first_name": "Rick",
       "doctor_last_name": "Novak",
              "doctor_id": 1,
     "patient_first_name": "Tom",
      "patient_last_name": "Liu",
                   "date": "11032022",
                   "time": "01:13pm",
                   "kind": "New Patient"
    } 
