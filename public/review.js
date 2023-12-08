const getReviews = async() => {
    try {
        return (await fetch("/api/reviews")).json();
    } catch (error) {
        console.log(error);
    }
};

const showReviews = async() => {
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
};

window.onload = () => {
    showReviews();
};