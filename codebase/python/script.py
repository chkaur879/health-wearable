import pandas as pd
import sys
import joblib

# Loading the trained model from the .pkl file
with open('../models/pycaret_pipeline.pkl', 'rb') as f:
    model = joblib.load(f)

# Defining a function that takes in the user input, runs it through the model, and returns the analysis
def generate_analysis(totalSteps, totalDistance, veryActiveDist, veryActiveMins, moderateActiveDist, fairlyActiveMins, lightActiveDist, lightlyActiveMins):
    #print(model)
    data = pd.DataFrame({'total_steps': [totalSteps], 'total_distance': [totalDistance], 'very_active_distance': [veryActiveDist], 'very_active_minutes': [veryActiveMins], 'moderately_active_distance': [moderateActiveDist], 'fairly_active_minutes': [fairlyActiveMins], 'light_active_distance': [lightActiveDist], 'lightly_active_minutes': [lightlyActiveMins]})
    prediction = model.predict(data)
    print(round(prediction[0]))
    return prediction[0]

if __name__=="__main__":
    generate_analysis(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[8])