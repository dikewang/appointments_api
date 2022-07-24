const express = require('express');
const app = express();

app.use(express.json());

let doctors = [
    {
        first_name: 'Rick',
         last_name: 'Novak',
                id: 1
    },
    {
        first_name: 'Susan',
         last_name: 'Conner',
                id: 2
    },
    {
        first_name: 'Marie',
         last_name: 'Forbis',
                id: 3
    }
];

let appointments = [
    {
        doctor_first_name: 'Rick',
         doctor_last_name: 'Novak',
                doctor_id: 1,
       patient_first_name: 'Wade',
        patient_last_name: 'Riley',
                     date: '11032022',
                     time: '01:00pm',
                     kind: 'New Patient',
            appointment_id: 1
    },
    {
        doctor_first_name: 'Susan',
         doctor_last_name: 'Conner',
                doctor_id: 2,
       patient_first_name: 'Milton',
        patient_last_name: 'Lewis',
                     date: '11042022',
                     time: '02:00pm',
                     kind: 'New Patient',
           appointment_id: 2
    },
    {
        doctor_first_name: 'Marie',
         doctor_last_name: 'Forbis',
                doctor_id: 3,
       patient_first_name: 'Harvey',
        patient_last_name: 'Joshua',
                     date: '11052022',
                     time: '03:00pm',
                     kind: 'Follow-up',
           appointment_id: 3
    }
];

app.get('/', (req, res) => {
    res.send('appointments APIs');
});

app.get('/api/doctors', (req, res) => {
    res.send(doctors);
});

app.get('/api/appointments', (req, res) => {
    res.send(appointments);
});

app.get('/api/appointments/:doctorId/:date', (req, res) => {
    const filtered_appointments = appointments.filter(appointment => appointment.doctor_id === parseInt(req.params.doctorId) && appointment.date === req.params.date);
    if (filtered_appointments.length === 0) {
        res.status(404).send('The appointments based on the given doctorId was not found!');
        return;
    }
    res.send(filtered_appointments);
});

app.post('/api/appointments/', (req, res) => {
    const new_appointment = {
        doctor_first_name: req.body.doctor_first_name,
         doctor_last_name: req.body.doctor_last_name,
                doctor_id: req.body.doctor_id,
       patient_first_name: req.body.patient_first_name,
        patient_last_name: req.body.patient_last_name,
                     date: req.body.date,
                     time: req.body.time,
                     kind: req.body.kind,
           appointment_id: appointments.length + 1
    };

    const filtered_appointments = appointments.filter(appointment => appointment.doctor_id === new_appointment.doctor_id && appointment.date === new_appointment.date 
                                                        && appointment.time === new_appointment.time);

    if (filtered_appointments.length >= 3) {
        res.send("Exceed the maximum number of appointments allowed at the same time with a doctor!");
        return;
    }
    
    const minutes = parseInt(new_appointment.time.slice(3, 5));
    if (minutes % 15 !== 0) {
        res.send("The time is not in 15 min interval");
        return;
    }

    appointments.push(new_appointment);
    res.send(new_appointment);
});

app.delete('/api/appointments/:appointmentId', (req, res) => {
    const deleted_appointment = appointments.find(appointment => appointment.appointment_id === parseInt(req.params.appointmentId));
    if (!deleted_appointment) {
        res.status(404).send('The appointments based on the given appointmentId was not found!');
        return;
    }

    const index = appointments.indexOf(deleted_appointment);
    appointments.splice(index, 1);

    res.send(deleted_appointment);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`));
