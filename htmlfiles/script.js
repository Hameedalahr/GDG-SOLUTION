document.addEventListener("DOMContentLoaded", () => {
    const doctorSelect = document.getElementById("doctor");
    const timeSlotSelect = document.getElementById("timeSlot");
    const appointmentForm = document.getElementById("appointmentForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const appointmentsList = document.getElementById("appointmentsList");

    const doctors = [
        { name: "Dr. Alice Smith", specialty: "Cardiologist" },
        { name: "Dr. Bob Johnson", specialty: "Dermatologist" }
    ];

    const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

    // Populate doctor options
    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor.name;
        option.textContent = `${doctor.name} (${doctor.specialty})`;
        doctorSelect.appendChild(option);
    });

    // Populate time slot options
    timeSlots.forEach(slot => {
        const option = document.createElement("option");
        option.value = slot;
        option.textContent = slot;
        timeSlotSelect.appendChild(option);
    });

    // Handle form submission
    appointmentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const doctor = doctorSelect.value;
        const timeSlot = timeSlotSelect.value;
        const patientName = document.getElementById("patientName").value;
        const contact = document.getElementById("contact").value;

        if (!doctor || !timeSlot || !patientName || !contact) {
            confirmationMessage.textContent = "Please fill out all fields.";
            return;
        }

        // Check for double booking
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        if (appointments.some(app => app.doctor === doctor && app.timeSlot === timeSlot)) {
            confirmationMessage.textContent = "This time slot is already booked. Please choose another.";
            return;
        }

        // Save appointment
        const appointment = { doctor, timeSlot, patientName, contact };
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        // Display confirmation
        confirmationMessage.textContent = "Appointment booked successfully!";
        appointmentForm.reset();

        // Update appointments list
        updateAppointmentsList();
    });

    function updateAppointmentsList() {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointmentsList.innerHTML = "";
        appointments.forEach(app => {
            const li = document.createElement("li");
            li.textContent = `${app.patientName} has an appointment with ${app.doctor} at ${app.timeSlot}`;
            appointmentsList.appendChild(li);
        });
    }

    // Initial update of appointments list
    updateAppointmentsList();
});
