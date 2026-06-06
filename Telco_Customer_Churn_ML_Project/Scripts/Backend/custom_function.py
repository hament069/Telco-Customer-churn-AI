import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin


def cat_to_num(df):
    x = df.copy()
    if 'customerID' in x.columns:
        x = x.drop(columns='customerID')
    if x['TotalCharges'].dtype == 'str':
        x['TotalCharges'] = pd.to_numeric(x['TotalCharges'],errors='coerce')
    return x



def get_new_num_names(transformer,input_features):
    return ['TotalCharges']


CLUSTER_PERSONA_MAP = {
    0: 'new risk / not loyal',
    1: 'Loyal premium',
    2:'Highly loyal budget'
}


class kmeanpersonapredict(BaseEstimator,TransformerMixin):
    def __init__(self,kmeans_model=None,persona_map=None):
        self.kmeans_model = kmeans_model
        self.persona_map = persona_map

    def fit(self,x,y=None):
        if self.kmeans_model is not None:
            self.kmeans_model.fit(x,y)
        self.is_fitted_ = True
        return self

    def transform(self,x):
        numeric_clusters =  self.kmeans_model.predict(x)
        return pd.Series(numeric_clusters).map(self.persona_map).to_numpy()

    def predict(self,x):
        return self.transform(x)
    
    