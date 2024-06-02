---
slug: machine-learning/visualization-missing-values
title: "Machine Learning Visualization Missing Values"
authors: [me]
tags: [Machine Learning, Data Visualization, numpy, pandas, missingno]
image: ./ml-handling-missing-values.png
---

Sure, I can help you write an article based on the provided Jupyter notebook. Let me first review the contents of the notebook. I'll extract and analyze the code and markdown cells to structure the article appropriately.

I'll start by loading the notebook and examining its contents.

Based on the contents of the provided Jupyter notebook, here is a step-by-step guide on how to visualize missing data using different techniques in Python. Each section explains what is being done and why it is important, along with the corresponding code and outputs.

---

## Visualizing Missing Data: A Step-by-Step Guide

Handling missing data is crucial in data analysis and machine learning. Visualizing missing data helps to understand the extent and pattern of missingness, which can inform the choice of strategies for dealing with it. In this guide, we'll use Python and the `missingno` library to visualize missing data in a dataset.

### 1. Importing Libraries

First, we need to import the necessary libraries for data manipulation and visualization.

```python
import pandas as pd
import numpy as np
import missingno as msno
```

- **Pandas**: A powerful data manipulation library.
- **NumPy**: A fundamental package for numerical computations.
- **Missingno**: A library for visualizing missing data.

References:

- [Pandas Documentation](https://pandas.pydata.org/pandas-docs/stable/)
- [NumPy Documentation](https://numpy.org/doc/stable/)
- [Missingno Documentation](https://github.com/ResidentMario/missingno)

### 2. Loading the Data

We load the dataset into a Pandas DataFrame. For this example, we'll use a dataset that comes with the `missingno` library.

```python
df = msno.datasets.load_diabetes()
df.head()
```

Output:

```
   Age  Sex   BMI    BP   S1    S2    S3   S4   S5   S6  Y
0  0.038  0.050  0.061  0.021  0.044  0.039  0.021  0.043  0.041  0.055  151
1 -0.001 -0.044 -0.051 -0.026 -0.019 -0.068 -0.092 -0.030 -0.042 -0.002   75
2  0.085  0.050  0.045  0.021  0.020  0.005 -0.035  0.020  0.014  0.032  141
3 -0.001  0.050  0.045  0.021 -0.011 -0.036  0.014  0.038  0.008  0.011  206
4 -0.086 -0.044 -0.051 -0.079 -0.065 -0.061 -0.120 -0.046 -0.079 -0.017  135
```

### 3. Matrix Plot

The matrix plot visualizes missing data by representing data points with vertical bars. Each bar shows the presence (white) or absence (black) of data points.

```python
msno.matrix(df)
```

Output:
![Matrix Plot](matrix_plot.png)

**Why is it important?**
The matrix plot helps identify patterns in the missing data, such as whether missingness occurs at random or follows a specific pattern.

### 4. Bar Plot

The bar plot shows the number of non-missing (present) data points for each column.

```python
msno.bar(df)
```

Output:
![Bar Plot](bar_plot.png)

**Why is it important?**
The bar plot provides a quick overview of the completeness of each column, highlighting columns with a high proportion of missing data.

### 5. Heatmap

The heatmap shows the correlation of missingness between different columns. A high correlation indicates that the presence of missing data in one column is related to the presence of missing data in another column.

```python
msno.heatmap(df)
```

Output:
![Heatmap](heatmap.png)

**Why is it important?**
The heatmap helps identify relationships in missingness between columns, which can inform decisions on how to handle missing data, such as imputing missing values based on related columns.

### 6. Dendrogram

The dendrogram clusters columns based on the similarity of their missing data patterns.

```python
msno.dendrogram(df)
```

Output:
![Dendrogram](dendrogram.png)

**Why is it important?**
The dendrogram helps identify groups of columns with similar missing data patterns, which can be useful for imputation or for understanding the underlying structure of the data.

### 7. Geographic Missing Data Visualization (Example: San Francisco Building Permits)

To visualize missing data in a real-world dataset, let's use the San Francisco building permits dataset.

```python
sf_permits = pd.read_csv("../input/building-permit-applications-data/Building_Permits.csv")
```

#### 7.1 Matrix Plot for SF Permits Data

```python
msno.matrix(sf_permits)
```

Output:
![SF Matrix Plot](sf_matrix_plot.png)

#### 7.2 Bar Plot for SF Permits Data

```python
msno.bar(sf_permits)
```

Output:
![SF Bar Plot](sf_bar_plot.png)

#### 7.3 Heatmap for SF Permits Data

```python
msno.heatmap(sf_permits)
```

Output:
![SF Heatmap](sf_heatmap.png)

#### 7.4 Dendrogram for SF Permits Data

```python
msno.dendrogram(sf_permits)
```

Output:
![SF Dendrogram](sf_dendrogram.png)

**Conclusion**

Visualizing missing data is a crucial step in data preprocessing. It helps understand the extent and pattern of missingness, guiding the choice of strategies for handling missing data. By using tools like `missingno`, you can quickly and effectively visualize and analyze missing data in your datasets.

References:

- [Missingno Documentation](https://github.com/ResidentMario/missingno)
- [Pandas Documentation](https://pandas.pydata.org/pandas-docs/stable/)
- [NumPy Documentation](https://numpy.org/doc/stable/)

---

Feel free to add the corresponding images for the plots and customize the text as per your requirements.
