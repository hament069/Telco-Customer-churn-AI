import os

# base root
BASE_ROOT = os.path.dirname(os.path.abspath(__file__))


# create folders
DATASETS = os.path.join(BASE_ROOT,"Datasets")
os.makedirs(DATASETS,exist_ok=True)

SCRIPTS = os.path.join(BASE_ROOT,"Scripts")
os.makedirs(SCRIPTS,exist_ok=True)

FRONTEND = os.path.join(SCRIPTS,"Frontend")
os.makedirs(FRONTEND,exist_ok=True)
BACKEND = os.path.join(SCRIPTS,"Backend")
os.makedirs(BACKEND,exist_ok=True)

ML_MODELS = os.path.join(BASE_ROOT,"ML_Pipelines")
os.makedirs(ML_MODELS,exist_ok=True)

NOTEBOOKS = os.path.join(BASE_ROOT,"Notebooks")
os.makedirs(NOTEBOOKS,exist_ok=True)

DATABASE_PATH = r"C:\Users\hamen\OneDrive\Desktop\ml_project\Telco_Customer_Churn_ML_Project\Datasets\Telco_Customer_Database"
