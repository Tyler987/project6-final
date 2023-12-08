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

        const h3 = document.createElement("h3");
        h3.innerHTML = review.name;
        section.append(h3);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const p = document.createElement("p");
        p.innerHTML = review.description;
        a.append(p);

        a.onclick = (e) => {
            e.preventDefault();
            displayDetails(review);
        };
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

const displayDetails = (review) => {
    const reviewDetails = document.getElementById("review-details");
    reviewDetails.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerHTML = review.name;
    reviewDetails.append(h3);

    const dLink = document.createElement("a");
    dLink.innerHTML = "&#x2715;";
    reviewDetails.append(dLink);
    dLink.id = "delete-link";

    const p = document.createElement("p");
    reviewDetails.append(p);
    p.innerHTML = review.description;

    dLink.onclick = (e) => {
        e.preventDefault();
        deleteReview(review);
    };
};

const deleteReview = async (review) => {
    let response = await fetch(`/api/reviews/${review._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });

    if (response.status != 200) {
        console.log("error deleting");
        return;
    }

    let result = await response.json();
    showReviews();
    document.getElementById("review-details").innerHTML = "";
};

const addReview = (e) => {
    e.preventDefault();
    const form = document.getElementById("add-review-form");
    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        description: formData.get("description"),
    };

    fetch("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((review) => {
            showReviews();
            resetForm(form);
        })
        .catch((error) => console.error("Error posting data:", error));
};

const resetForm = (form) => {
    form.reset();
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