from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
import sys
sys.path.append(os.path.abspath(os.path.join('..','..')))
from config import ML_MODELS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
path1 = os.path.join(ML_MODELS,'Customer_churn_ML_model.pkl')
path2 = os.path.join(ML_MODELS,'customer_type_ml_pipeline.pkl')
churn_model = joblib.load(path1)
type_model = joblib.load(path2)


class Customer(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float


@app.get("/")
def home():
    return {"message": "API Running"}


@app.post("/predict")
def predict(customer: Customer):
    data_dict = customer.dict()
    input_df = pd.DataFrame([data_dict])
    churn_pred = churn_model.predict(input_df)
    type_pred = type_model.predict(input_df)

    return {
        "customer_type":str(type_pred[0]),
        "churn_prediction":"yes" if churn_pred[0] == 1 else "No"
    }
