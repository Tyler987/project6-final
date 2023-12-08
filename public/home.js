const submitForm = (e) => {
    e.preventDefault();
    document.getElementById("results").classList.remove("hidden");

    const form = document.getElementById("form-trial");
    const firstName = form.elements["first-name"].value;
    // const lastName = form.elements["last-name"].value;
    const phoneNumber = form.elements["phone-number"].value;
    // const email = form.elements["email"].value;
    // const experience = getRadioValue("experience");
    // const goals = form.elements["goals"].value;
    // const termsChecked = form.elements["terms"].checked;

    console.log("First Name: " + firstName);
    // console.log("Last Name: " + lastName);
    console.log("Phone Number: " + phoneNumber);
    // console.log("Email: " + email);
    // console.log("Experience Level: " + experience);
    // console.log("Goals: " + goals);
    // console.log("Terms Accepted: " + termsChecked);
};

const getRadioValue = (RadioName) => {
    let radios = document.getElementsByName(RadioName);

    for (let i in radios) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return "";
};

document.getElementById("form-trial").onsubmit = submitForm;
