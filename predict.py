# analysis.py

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Load your dataset
data = pd.read_csv('NDB_ResearchGrants_NIH.csv')

# Prepare the data: We will predict 'Percentage to Female' based on 'Year'
X = data[['Year']]  # Independent variable (Year)
y = data['Percentage to Female']  # Dependent variable (Percentage to Female)

# Create and train the linear regression model
model = LinearRegression()
model.fit(X, y)

# Coefficients of the linear regression model
m = model.coef_[0]  # Slope (m)
b = model.intercept_  # Intercept (b)

# Solve for the year when the percentage reaches 50%
target_percentage = 50
year_to_50 = (target_percentage - b) / m

# Save the prediction output for 50%
prediction_50 = pd.DataFrame({'Year': [year_to_50], 'Predicted Percentage': [target_percentage]})
prediction_50.to_csv('prediction_to_50.csv', index=False)

# Predicting future values (for example, year 2025)
future_year = np.array([[2025]])  # Prediction for year 2025
prediction = model.predict(future_year)

# Save the prediction output to a CSV file
prediction_result = pd.DataFrame({'Year': [2025], 'Predicted Percentage': prediction})
prediction_result.to_csv('prediction_output.csv', index=False)

# Plotting the data and the regression line
plt.figure(figsize=(10, 6))
plt.scatter(X, y, color='blue', label='Data Points')
plt.plot(X, model.predict(X), color='red', label='Regression Line')
plt.scatter(future_year, prediction, color='green', label=f'Prediction for 2025: {prediction[0]:.2f}%')
plt.axvline(x=year_to_50, color='purple', linestyle='--', label=f'Prediction for 50%: {int(year_to_50)}')
plt.title('Female Percentage vs. Year')
plt.xlabel('Year')
plt.ylabel('Female Percentage')
plt.legend()
plt.savefig('prediction_plot.png')
plt.show()

# Display the result for when the percentage reaches 50%
print(f"The predicted year when the female percentage reaches 50% is: {int(year_to_50)}")
