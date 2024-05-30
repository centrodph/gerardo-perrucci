---
slug: machine-learning/iloc-cheatsheet
title: "Machine Learning Pandas iloc Cheatsheet"
authors: [me]
tags: [Machine Learning, Data Preprocessing, iloc, pandas]
image: ./ml-pandas-iloc.png
---

# Pandas `iloc` Cheatsheet for Machine Learning

The `iloc` indexer in pandas is a powerful tool for data selection, slicing, and manipulation, essential for preparing datasets for machine learning tasks. Here's a comprehensive guide to help you master `iloc`.

## Table of Contents

1. **Introduction to `iloc`**
2. **Basic Usage**
   - Selecting Rows
   - Selecting Columns
3. **Advanced Indexing**
   - Slicing Rows and Columns
   - Selecting Specific Rows and Columns
4. **Conditional Selection**
5. **Modifying Data**
6. **Practical Machine Learning Examples**
   - Splitting Data into Features and Target
   - Handling Missing Data
   - Data Normalization
7. **Oficial documentation**
8. **Tutorial Videos**

## 1. Introduction to `iloc`

The `iloc` indexer is used for integer-location based indexing for selection by position. It is one of the primary indexers for Pandas data structures.

```python
import pandas as pd

# Sample DataFrame
data = {
    'A': [1, 2, 3, 4],
    'B': [5, 6, 7, 8],
    'C': [9, 10, 11, 12],
    'D': [13, 14, 15, 16]
}
df = pd.DataFrame(data)
print(df)

```

       A  B   C   D
    0  1  5   9  13
    1  2  6  10  14
    2  3  7  11  15
    3  4  8  12  16

## 2. Basic Usage

### Selecting Rows

To select rows using `iloc`, you specify the row index.

```python
# Select the first row
print(df.iloc[0])


```

    A     1
    B     5
    C     9
    D    13
    Name: 0, dtype: int64

```python
# Select the first three rows
print(df.iloc[:3])
```

       A  B   C   D
    0  1  5   9  13
    1  2  6  10  14
    2  3  7  11  15

### Selecting Columns

To select columns, you specify the column index.

```python
# Select the first column
print(df.iloc[:, 0])

```

    0    1
    1    2
    2    3
    3    4
    Name: A, dtype: int64

```python
# Select the first two columns
print(df.iloc[:, :2])
```

       A  B
    0  1  5
    1  2  6
    2  3  7
    3  4  8

## 3. Advanced Indexing

### Slicing Rows and Columns

You can slice both rows and columns simultaneously.

```python
# Select the first two rows and the first two columns
print(df.iloc[:2, :2])
```

       A  B
    0  1  5
    1  2  6

### Selecting Specific Rows and Columns

Specify exact row and column indices.

```python
# Select the first and third rows and the second and fourth columns
print(df.iloc[[0, 2], [1, 3]])
```

       B   D
    0  5  13
    2  7  15

## 4. Conditional Selection

Using `iloc` in combination with conditions.

```python
# Example DataFrame
df_cond = pd.DataFrame({
    'A': [1, 2, 3, 4, 5],
    'B': [10, 20, 30, 40, 50],
    'C': [100, 200, 300, 400, 500]
})

# Condition to select rows where column 'A' values are greater than 2
print(df_cond[df_cond['A'] > 2].iloc[:, [0, 2]])  # Select columns 'A' and 'C'
```

       A    C
    2  3  300
    3  4  400
    4  5  500

## 5. Modifying Data

You can use `iloc` to modify specific parts of the DataFrame.

```python
# Set the value of the first cell to 0
df.iloc[0, 0] = 0
print(df)

# Set the values of the first column to 0
df.iloc[:, 0] = 0
print(df)
```

       A  B   C   D
    0  0  5   9  13
    1  2  6  10  14
    2  3  7  11  15
    3  4  8  12  16
       A  B   C   D
    0  0  5   9  13
    1  0  6  10  14
    2  0  7  11  15
    3  0  8  12  16

## 6. Practical Machine Learning Examples

### Splitting Data into Features and Target

Separating features (X) and target (y) is a common task.

```python
# Sample DataFrame with a target column
df_ml = pd.DataFrame({
    'Feature1': [1, 2, 3, 4, 5],
    'Feature2': [10, 20, 30, 40, 50],
    'Target': [0, 1, 0, 1, 0]
})

# Features (all rows, all columns except the last one)
X = df_ml.iloc[:, :-1]

# Target (all rows, last column)
y = df_ml.iloc[:, -1]

print("Features:\n", X)
print("Target:\n", y)
```

    Features:
        Feature1  Feature2
    0         1        10
    1         2        20
    2         3        30
    3         4        40
    4         5        50
    Target:
     0    0
    1    1
    2    0
    3    1
    4    0
    Name: Target, dtype: int64

### Handling Missing Data

Using `iloc` to handle missing data by selecting specific parts of the DataFrame.

```python
# Sample DataFrame with missing values
df_missing = pd.DataFrame({
    'A': [1, 2, None, 4],
    'B': [5, None, 7, 8],
    'C': [None, 10, 11, 12]
})

# Fill missing values in the first two columns with 0
df_missing.iloc[:, :2] = df_missing.iloc[:, :2].fillna(0)
print(df_missing)
```

         A    B     C
    0  1.0  5.0   NaN
    1  2.0  0.0  10.0
    2  0.0  7.0  11.0
    3  4.0  8.0  12.0

### Data Normalization

Using `iloc` to normalize data.

```python
from sklearn.preprocessing import MinMaxScaler

# Sample DataFrame for normalization
df_norm = pd.DataFrame({
    'Feature1': [1, 2, 3, 4, 5],
    'Feature2': [10, 20, 30, 40, 50]
})

scaler = MinMaxScaler()

# Normalize the first two columns
df_norm.iloc[:, :2] = scaler.fit_transform(df_norm.iloc[:, :2])
print(df_norm)
```

       Feature1  Feature2
    0      0.00      0.00
    1      0.25      0.25
    2      0.50      0.50
    3      0.75      0.75
    4      1.00      1.00

Certainly! Here are some references to official documentation and YouTube videos that can help you learn more about using the `iloc` indexer in pandas for machine learning:

## Official Documentation

1. **Pandas Documentation on Indexing and Selecting Data:**

   - [Pandas Official Documentation - Indexing and Selecting Data](https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html)
   - This section of the pandas documentation provides comprehensive details on various indexing methods, including `iloc`.

2. **Pandas API Reference for `iloc`:**
   - [Pandas API Reference - iloc](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.iloc.html)
   - This page contains detailed information about the `iloc` property and its usage.

## Tutorial Videos

1. **Corey Schafer - Python Pandas DataFrame Tutorial:**

   - [Selecting Rows and Columns from a Pandas DataFrame](https://www.youtube.com/watch?v=ZyhVh-qRZPA&list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS&ab_channel=CoreySchafer)
   - This playlist covers various methods to select rows and columns in pandas DataFrames, including the use of `iloc`.

2. **Data School - How do I select a subset of a DataFrame:**

   - [Data School - Pandas iloc](https://www.youtube.com/watch?v=xvpNA7bC8cs)
   - Data School provides an in-depth tutorial on selecting subsets of DataFrames using `iloc`.

3. **Getting Started with Data Analysis:**

   - [Pandas DataFrames in Python](https://www.youtube.com/watch?v=ZyhVh-qRZPA)
   - This video explains the basics of pandas DataFrames and covers various indexing techniques including `iloc`.

4. **Pandas Tutorial:**
   - [Pandas Tutorial (Data Analysis with Python)](https://www.youtube.com/watch?v=vmEHCJofslg)
   - A comprehensive tutorial on pandas covering many aspects including data selection and manipulation using `iloc`.

These resources should provide you with a strong foundation for understanding and utilizing `iloc` in pandas for your machine learning projects.

## Conclusion

The `iloc` indexer is a versatile and powerful tool for data manipulation in pandas, especially useful in the preprocessing stages of machine learning. Mastering `iloc` allows for efficient and precise data selection and modification, essential for building robust machine learning models.
