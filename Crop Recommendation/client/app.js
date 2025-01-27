function capitalize(str) {
    if (!str || typeof str !== "string") {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

document.getElementById("crop-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nitrogen = document.getElementById("nitrogen").value;
    const phosphorus = document.getElementById("phosphorus").value;
    const potassium = document.getElementById("potassium").value;
    const temperature = document.getElementById("temperature").value;
    const humidity = document.getElementById("humidity").value;
    const ph = document.getElementById("ph").value;
    const rainfall = document.getElementById("rainfall").value;

    const formData = new FormData();
    formData.append("nitrogen", nitrogen);
    formData.append("phosphorus", phosphorus);
    formData.append("potassium", potassium);
    formData.append("temperature", temperature);
    formData.append("humidity", humidity);
    formData.append("ph", ph);
    formData.append("rainfall", rainfall);

    try {
        const response = await fetch("http://127.0.0.1:5000/rec_crop", {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        document.getElementById("result").textContent = capitalize(`${result.recommended_crop}`);
    } catch (error) {
        document.getElementById("result").textContent = 
        "Error occurred while fetching the recommended crop.";
    console.error("Error:", error);
}
});