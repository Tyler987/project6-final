const getReviews = async () => {
    try {
        return (await fetch("/api/reviews")).json();
    } catch (error) {
        console.log(error);
    }
};

const showReviews = async () => {
    let reviews = await getReviews();
    let reviewsDiv = document.getElementById("review-list");
    reviewsDiv.innerHTML = "";
    reviews.forEach((review) => {
        const section = document.createElement("section");
        section.classList.add("review");
        reviewsDiv.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = workout.name;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayDetails(review);
        };
    });
};

const displayDetails = (review) => {
    const reviewDetails = document.getElementById("review-details");
    reviewDetails.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerHTML = review.name;
    reviewDetails.append(h3);

    const dLink = document.createElement("a");
    dLink.innerHTML = "	&#x2715;";
    reviewDetails.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    reviewDetails.append(eLink);
    eLink.id = "edit-link";

    const p = document.createElement("p");
    reviewDetails.append(p);
    p.innerHTML = review.description;

    const ul = document.createElement("ul");
    reviewDetails.append(ul);
    console.log(review.complaints);
    review.complaints.forEach((complaint) => {
        const li = document.createElement("li");
        ul.append(li);
        li.innerHTML = complaint;
    });

    eLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("add-edit-title").innerHTML = "Edit Workout";
    };

    dLink.onclick = (e) => {
        e.preventDefault();
        deleteReview(review);
    };

    populateEditForm(review);
};
const deleteReview = async(review) => {
    let response = await fetch(`/api/reviews/${review._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });

    if (response.status != 200) {
        console.log("error deleting");
        return;
    }

    let result = await response.json();
    showReviews();
    document.getElementById("review-details").innerHTML = "";
    resetForm();
}
const populateEditForm = (review) => {
    const form = document.getElementById("add-edit-review-form");
    form._id.value = review._id;
    form.name.value = review.name;
    form.description.value = review.description;
    // populateExercises(workout.exercises);
    populateComplaint(review);

};
const populateComplaint = (review) => {
    const section = document.getElementById("complaint-boxes");
    review.complaints.forEach((complaint) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = complaint;
        section.append(input);
    });
};
const addEditReview = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-edit-review-form");
    const formData = new FormData(form);
    // formData.delete("img");
    let response;

    formData.append("complaints", getComplaints());
    // let response;
    if (form._id.value == -1) {
        formData.delete("_id");

        response = await fetch("/api/reviews", {
            method: "POST",
            body: formData
        });
    }
    else {

        console.log(...formData);

        response = await fetch(`/api/reviews/${form._id.value}`, {
            method: "PUT",
            body: formData
        });
    }

    if (response.status != 200) {
        console.log("Error posting data");
        return;
    }

    review = await response.json();

    if (form._id.value != -1) {
        displayDetails(review);
    }

    document.querySelector(".dialog").classList.add("transparent");
    resetForm();
    showReviews();
};

const getComplaints = () => {
    const inputs = document.querySelectorAll("#complaint-boxes input");
    let complaints = [];

    inputs.forEach((input) => {
        complaints.push(input.value);
    });

    return complaints;
};

const resetForm = () => {
    const form = document.getElementById("add-edit-review-form");
    form.reset();
    form._id = "-1";
    document.getElementById("complaint-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Add Review";
    resetForm();
};

const addReview = (e) => {
    // e.preventDefault();
    // const exerciseBoxes = document.getElementById("exercise-boxes");
    // const input = document.createElement("input");
    // input.type = "text";
    // exerciseBoxes.append(input);
    e.preventDefault();
    const section = document.getElementById("complaint-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
};

window.onload = () => {
    showReviews();
    document.getElementById("add-edit-review-form").onsubmit = addEditReview;
    document.getElementById("add-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-complaint").onclick = addComplaint;
};