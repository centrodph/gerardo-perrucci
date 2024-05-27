---
slug: machine-learning/machine-learning-process
title: "Machine Learning: Feature Scaling"
authors: [me]
tags: [Machine Learning, Data Preprocessing, Feature Scaling]
---

# Feature Scaling in Machine Learning: Keeping Your Data on the Same Page

Imagine you're a teacher and your students are working on a group project. One student is a math whiz, another excels at writing, and a third is a history buff. If you grade each section based on the individual's absolute strengths, the math whiz would dominate the score, even if the writing and history were excellent. This is similar to what can happen in machine learning with features (data points) on vastly different scales.

**Feature scaling** is a data pre-processing technique that addresses this issue. It essentially standardizes the range of features in your dataset, ensuring all features contribute equally during model training. Let's delve deeper into why and how this works.

### Why Scale?

- **Fair Play for All Features:** Features with larger values can overshadow those with smaller ones, even if the smaller ones hold valuable information. Scaling creates a level playing field.
- **Distance Matters:** Many machine learning algorithms rely on calculating distances between data points. Feature scaling ensures these distances accurately reflect the underlying relationships.
- **Faster & More Efficient Learning:** By putting features on a similar scale, the learning algorithm can converge (find an optimal solution) faster and more efficiently.

### Normalization vs. Standardization: Two Sides of the Scaling Coin

Normalization and standardization are two common feature scaling techniques, and the terms are sometimes used interchangeably. However, there's a subtle difference:

- **Normalization:** This technique scales features to a specific range, typically between 0 and 1 (Min-Max Scaling) or -1 and 1. It's useful when you know the data distribution or want to bound values within a specific range.

  - Formula:
    ```
    X_scaled = (X - min(X)) / (max(X) - min(X))
    ```
    Here,
    _ X_scaled is the normalized feature
    _ X is the original feature value
    _ min(X) is the minimum value in the feature
    _ max(X) is the maximum value in the feature

- **Standardization:** This technique transforms features to have a mean of 0 and a standard deviation of 1 (Z-score normalization). It assumes a Gaussian (bell-shaped) distribution for the data and emphasizes outliers more than normalization.

  - Formula:
    ```
    X_scaled = (X - mean(X)) / std(X)
    ```
    Here,
    _ X_scaled is the standardized feature
    _ X is the original feature value
    _ mean(X) is the average of all values in the feature
    _ std(X) is the standard deviation of the feature

**Choosing the Right Technique:**

The best technique depends on your data and the specific algorithm you're using. Here's a general guideline:

- Use Min-Max scaling if the data distribution is unknown or outliers are not a concern.
- Use standardization (Z-score) if the data is assumed to be Gaussian distributed or you want to emphasize the impact of outliers.

**Examples:**

Imagine a dataset with two features: house price (in millions) and distance from a school (in meters). Without scaling, the massive price range would overpower the distance information. Scaling levels the field, allowing the model to learn from both features effectively.

**Further Learning:**

- [Feature Scaling and Why Does Machine Learning Need It](https://towardsdatascience.com/what-is-feature-scaling-why-is-it-important-in-machine-learning-2854ae877048)
- [Feature Engineering: Scaling, Normalization, and Standardization](https://www.geeksforgeeks.org/ml-feature-scaling-part-2/)
- [Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)

Remember, feature scaling is a crucial step in building robust and accurate machine learning models. By ensuring all features are on the same page, you can empower your models to learn from your data more effectively.

**Choosing the Right Technique:**

The best technique depends on your data and the specific algorithm you're using. Here's a general guideline:

- Use `normalization` scaling if the data distribution is unknown or outliers are not a concern.
- Use `standardization` (Z-score) if the data is assumed to be Gaussian distributed or you want to emphasize the impact of outliers.

I hope this addition clarifies the concepts of normalization and standardization with their respective formulas!
