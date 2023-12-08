class Trainer {
    constructor(name, experience, expertise, skills, imageFileName) {
        this.name = name;
        this.experience = experience;
        this.expertise = expertise;
        this.skills = skills;
        this.imageFileName = `images/${imageFileName}`;
    }

    get details() {
        return `${this.name}\nExperience: ${this.experience}\nExpertise: ${this.expertise}\nSkills: ${this.skills}`;
    }

    getTrainerItem() {
        const trainerItem = document.createElement("div");
        trainerItem.classList.add("trainer");

        const trainerContainer = document.createElement("div");
        trainerContainer.classList.add("trainer-container");
        trainerItem.appendChild(trainerContainer);

        const trainerImage = document.createElement("div");
        trainerImage.style.backgroundImage = `url(${this.imageFileName})`;
        trainerImage.classList.add("trainer-image");
        trainerContainer.appendChild(trainerImage);

        const trainerDetails = document.createElement("div");
        trainerDetails.classList.add("trainer-details");
        trainerDetails.textContent = this.details;
        trainerContainer.appendChild(trainerDetails);

        return trainerItem;
    }
}

const showTrainers = () => {
    const trainerList = document.getElementById("trainer-list");
    const trainers = [];

    trainers.push(new Trainer("John", "5 years", "Strength Training", "Weightlifting", "john.jpg"));
    trainers.push(new Trainer("Hannah", "3 years", "Cardio", "Running, Cycling", "hannah.jpeg"));
    trainers.push(new Trainer("Jamie", "4 years", "Yoga", "Flexibility, Balance", "jamie.jpeg"));
    trainers.push(new Trainer("Jacobi", "6 years", "HIIT", "High-Intensity Workouts", "jacobi.jpg"));
    trainers.push(new Trainer("Dante", "7 years", "CrossFit", "Functional Training", "dante.jpg"));
    trainers.push(new Trainer("Sam", "2 years", "Martial Arts", "Kickboxing", "sam.jpeg"));

    trainers.forEach(trainer => {
        trainerList.appendChild(trainer.getTrainerItem());
    });
};

window.onload = () => {
    showTrainers();
};