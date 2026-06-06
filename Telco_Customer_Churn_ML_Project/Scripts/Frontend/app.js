// FastAPI Backend URL
const API_URL = "https://telco-customer-churn-ai.onrender.com";

// Elements
const form = document.getElementById("predictionForm");
const results = document.getElementById("results");
const themeBtn = document.getElementById("themeToggle");

// ------------------------
// Dark Mode
// ------------------------

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML = "☀️ Light Mode";
    }
    else{
        themeBtn.innerHTML = "🌙 Dark Mode";
    }

});

// ------------------------
// Scroll To Form
// ------------------------

function scrollToForm(){

    document
        .getElementById("formSection")
        .scrollIntoView({
            behavior:"smooth"
        });

}

// ------------------------
// Form Submit
// ------------------------

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Loading Screen

    results.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Analyzing Customer Data...</p>
        </div>
    `;

    try{

        // Collect Form Data

        const data = {

            gender: document.getElementById("gender").value,

            SeniorCitizen: Number(
                document.getElementById("SeniorCitizen").value
            ),

            Partner: document.getElementById("Partner").value,

            Dependents: document.getElementById("Dependents").value,

            tenure: Number(
                document.getElementById("tenure").value
            ),

            PhoneService: document.getElementById("PhoneService").value,

            MultipleLines: document.getElementById("MultipleLines").value,

            InternetService: document.getElementById("InternetService").value,

            OnlineSecurity: document.getElementById("OnlineSecurity").value,

            OnlineBackup: document.getElementById("OnlineBackup").value,

            DeviceProtection: document.getElementById("DeviceProtection").value,

            TechSupport: document.getElementById("TechSupport").value,

            StreamingTV: document.getElementById("StreamingTV").value,

            StreamingMovies: document.getElementById("StreamingMovies").value,

            Contract: document.getElementById("Contract").value,

            PaperlessBilling: document.getElementById("PaperlessBilling").value,

            PaymentMethod: document.getElementById("PaymentMethod").value,

            MonthlyCharges: Number(
                document.getElementById("MonthlyCharges").value
            ),

            TotalCharges: Number(
                document.getElementById("TotalCharges").value
            )
        };

        // API Request

       const response = await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});

        if(!response.ok){

            throw new Error(
                "Backend Error"
            );

        }

        const result = await response.json();

        // --------------------------------
        // Risk Score Logic
        // --------------------------------

        let riskScore;

        if(
            result.churn_prediction
                .toLowerCase()
                .includes("yes")
        ){
            riskScore = 85;
        }
        else{
            riskScore = 15;
        }

        // --------------------------------
        // Segment Logic
        // --------------------------------

        let segment;
        let segmentClass;

        if(riskScore < 30){

            segment = "Loyal Customer";
            segmentClass = "success";

        }
        else if(riskScore < 60){

            segment = "Regular Customer";
            segmentClass = "warning";

        }
        else{

            segment = "At Risk Customer";
            segmentClass = "danger";

        }

        // --------------------------------
        // Churn Badge
        // --------------------------------

        let churnClass;

        if(
            result.churn_prediction
                .toLowerCase()
                .includes("yes")
        ){
            churnClass = "danger";
        }
        else{
            churnClass = "success";
        }

        // --------------------------------
        // Customer ID
        // --------------------------------

        const customerID =
            "TEL-" +
            Math.floor(
                100000 + Math.random() * 900000
            );

        // --------------------------------
        // Results
        // --------------------------------

        results.innerHTML = `

            <div class="result-item">

                <strong>Customer ID</strong>

                ${customerID}

            </div>

            <div class="result-item">

                <strong>Customer Type</strong>

                ${result.customer_type}

            </div>

            <div class="result-item">

                <strong>Churn Prediction</strong>

                <span class="badge ${churnClass}">
                    ${result.churn_prediction}
                </span>

            </div>

            <div class="result-item">

                <strong>Customer Risk Score</strong>

                ${riskScore}%

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width:${riskScore}%"
                    ></div>

                </div>

            </div>

            <div class="result-item">

                <strong>Customer Segment</strong>

                <span class="badge ${segmentClass}">
                    ${segment}
                </span>

            </div>

        `;

    }
    catch(error){

        console.error(error);

        results.innerHTML = `

            <div class="result-item">

                <strong>Error</strong>

                Unable to connect to backend.

            </div>

        `;

    }

});
window.addEventListener("load", () => {

    const splash =
        document.getElementById(
            "splash-screen"
        );

    setTimeout(() => {

        splash.classList.add(
            "fade-out"
        );

    }, 2500);

});
