---
slug: machine-learning/learning-handling-missing-values
title: "Machine Learning Handling Missing Values"
authors: [me]
tags: [Machine Learning, Data Preprocessing, numpy, pandas]
image: ./ml-handling-missing-values.png
---

# Handling Missing Values in Machine Learning with Python

Handling missing values is a crucial step in preparing data for machine learning. This tutorial provides examples of how to manage missing values using Python, focusing on the Pandas library. We'll import the necessary libraries, read the data, and explore various methods to handle missing values.

![Machine Learning Handling Missing Values](./ml-handling-missing-values.png)

You can check the full code in the [Jupyter Notebook](https://github.com/centrodph/ml/blob/main/data-processing/Machine%20Learning%20Handling%20Missing%20Values.ipynb)

### Importing Libraries

We begin by importing the necessary libraries for our data manipulation and analysis tasks.

```python
import numpy as np
import pandas as pd
```

- **NumPy**: A fundamental package for scientific computing in Python. It provides support for arrays, matrices, and numerous mathematical functions.
- **Pandas**: A powerful data manipulation and analysis library that provides data structures and functions needed to work with structured data seamlessly.

References:

- [NumPy Documentation](https://numpy.org/doc/stable/)
- [Pandas Documentation](https://pandas.pydata.org/pandas-docs/stable/)

### Reading the Data

We read the CSV file containing the NFL play-by-play data.

```python
data = pd.read_csv("./NFLPlayByPlay2009-2017_v4.csv")
```

You can download the dataset from the [Kaggle website](https://www.kaggle.com/code/alexisbcook/handling-missing-values/data?select=NFL+Play+by+Play+2009-2017+%28v4%29.csv)

During the import, a warning indicates that some columns have mixed data types. This can be addressed by specifying the `dtype` option or setting `low_memory=False`.

Output:

```
/tmp/ipykernel_23803/1150844578.py:1: DtypeWarning: Columns (25,51) have mixed types. Specify dtype option on import or set low_memory=False.
  data = pd.read_csv("./NFLPlayByPlay2009-2017_v4.csv")
```

References:

- [Pandas read_csv Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)

### Inspecting the Data

To get an overview of the data format, we inspect the first few rows of the dataframe.

```python
data.head()
```

Output:

```
         Date      GameID  Drive  qtr  down   time  TimeUnder  TimeSecs  PlayTimeDiff  SideofField  ...  yacEPA  Home_WP_pre  Away_WP_pre  Home_WP_post  Away_WP_post  Win_Prob       WPA  airWPA  yacWPA  Season
0  2009-09-10  2009091000      1    1   NaN  15:00         15     3600           0.0          TEN  ...     NaN     0.485675     0.514325     0.546433     0.453567  0.485675  0.060758     NaN     NaN    2009
1  2009-09-10  2009091000      1    1   1.0  14:53         15     3593           7.0          PIT  ...  1.146076     0.546433     0.453567     0.551088     0.448912  0.546433  0.004655 -0.032244  0.036899    2009
2  2009-09-10  2009091000      1    1   2.0  14:16         15     3556          37.0          PIT  ...     NaN     0.551088     0.448912     0.510793     0.489207  0.551088 -0.040295     NaN     NaN    2009
3  2009-09-10  2009091000      1    1   3.0  13:35         14     3515          41.0          PIT  ... -5.031425     0.510793     0.489207     0.461217     0.538783  0.510793 -0.049576  0.106663 -0.156239    2009
4  2009-09-10  2009091000      1    1   4.0  13:27         14     3507           8.0          PIT  ...     NaN     0.461217     0.538783     0.558929     0.441071  0.461217  0.097712     NaN     NaN    2009
```

### Counting Missing Values

We calculate the number of missing values in each column.

```python
missing_values_per_column = data.isnull().sum()
missing_values_per_column[0:10] # taking the first ten columns
```

Output:

```
Date                0
GameID              0
Drive               0
qtr                 0
down            61154
time              224
TimeUnder           0
TimeSecs          224
PlayTimeDiff      444
SideofField       528
dtype: int64
```

### Total Missing Values

To understand the proportion of missing data, we calculate the total number of cells and the percentage of missing values.

```python
total_cells = np.product(data.shape)
total_missing = missing_values_per_column.sum()

print('total_missing', total_missing)
print('total_cells', total_cells)
print('percentage missing', (total_missing / total_cells) * 100)
```

Output:

```
total_missing 11505187
total_cells 41584176
percentage missing 27.66722370547874
```

### Counting Non-Missing Values

We can also count the non-missing values in each column.

```python
data[:].count()
```

Output:

```
Date        407688
GameID      407688
Drive       407688
qtr         407688
down        346534
             ...
Win_Prob    382679
WPA         402147
airWPA      159187
yacWPA      158926
Season      407688
Length: 102, dtype: int64
```

### Removing Rows with Missing Values

While not recommended, one way to handle missing values is to remove rows that contain them.

```python
removed_rows_empty_data = data.dropna()
print(removed_rows_empty_data)
```

Output:

```
Empty DataFrame
Columns: [Date, GameID, Drive, qtr, down, time, TimeUnder, TimeSecs, PlayTimeDiff, SideofField, yrdln, yrdline100, ydstogo, ydsnet, GoalToGo, FirstDown, posteam, DefensiveTeam, desc, PlayAttempted, Yards.Gained, sp, Touchdown, ExPointResult, TwoPointConv, DefTwoPoint, Safety, Onsidekick, PuntResult, PlayType, Passer, Passer_ID, PassAttempt, PassOutcome, PassLength, AirYards, YardsAfterCatch, QBHit, PassLocation, InterceptionThrown, Interceptor, Rusher, Rusher_ID, RushAttempt, RunLocation, RunGap, Receiver, Receiver_ID, Reception, ReturnResult, Returner, BlockingPlayer, Tackler1, Tackler2, FieldGoalResult, FieldGoalDistance, Fumble, RecFumbTeam, RecFumbPlayer, Sack, Challenge.Replay, ChalReplayResult, Accepted.Penalty, PenalizedTeam, PenaltyType, PenalizedPlayer, Penalty.Yards, PosTeamScore, DefTeamScore, ScoreDiff, AbsScoreDiff, HomeTeam, AwayTeam, Timeout_Indicator, Timeout_Team, posteam_timeouts_pre, HomeTimeouts_Remaining_Pre, AwayTimeouts_Remaining_Pre, HomeTimeouts_Remaining_Post, AwayTimeouts_Remaining_Post, No_Score_Prob, Opp_Field_Goal_Prob, Opp_Safety_Prob, Opp_Touchdown_Prob, Field_Goal_Prob, Safety_Prob, Touchdown_Prob, ExPoint_Prob, TwoPoint_Prob, ExpPts, EPA, airEPA, yacEPA, Home_WP_pre, Away_WP_pre, Home_WP_post, Away_WP_post, Win_Prob, WPA, airWPA, yacWPA, ...]
Index: []
[0 rows x 102 columns]
```

### Removing Columns with Missing Values

A more common approach is to remove columns that contain missing values.

```python
removed_columns_empty_data = data.dropna(axis=1)
print(removed_columns_empty_data)
```

Output:

```
            Date      GameID  Drive  qtr  TimeUnder  ydstogo  ydsnet  PlayAttempted  Yards.Gained  sp  ...  AwayTeam  Timeout_Indicator  posteam_timeouts_pre HomeTimeouts_Remaining_Pre  AwayTimeouts_Remaining_Pre  HomeTimeouts_Remaining_Post  AwayTimeouts_Remaining_Post  ExPoint_Prob  TwoPoint_Prob  Season
0      2009-09-10  2009091000      1    1         15        0       0               1            39   0  ...       TEN                  0                        3                          3                          3                            3                            3           0.0            0.0    2009
1      2009-09-10  2009091000      1    1         15       10       5

 1             5   0  ...       TEN                  0                        3                          3                          3                            3                            3           0.0            0.0    2009
2      2009-09-10  2009091000      1    1         15        5       2               1            -3   0  ...       TEN                  0                        3                          3                          3                            3                            3           0.0            0.0    2009
3      2009-09-10  2009091000      1    1         14        8       2               1             0   0  ...       TEN                  0                        3                          3                          3                            3                            3           0.0            0.0    2009
4      2009-09-10  2009091000      1    1         14        8       2               1             0   0  ...       TEN                  0                        3                          3                          3                            3                            3           0.0            0.0    2009
...           ...         ...    ...  ...        ...      ...     ...             ...           ...  ..  ...       ...                ...                      ...                        ...                          ...                          ...                          ...           ...            ...     ...
407683 2017-12-31  2017123101     29    4          1        0      -4               1             0   0  ...       CIN                  1                        0                          3                          0                            2                            0           0.0            0.0    2017
407684 2017-12-31  2017123101     29    4          1       14      -4               1             0   0  ...       CIN                  0                        2                          2                          0                            2                            0           0.0            0.0    2017
407685 2017-12-31  2017123101     29    4          1       14       9               1            13   0  ...       CIN                  0                        2                          2                          0                            2                            0           0.0            0.0    2017
407686 2017-12-31  2017123101     30    4          1       10      -1               1            -1   0  ...       CIN                  0                        0                          2                          0                            2                            0           0.0            0.0    2017
407687 2017-12-31  2017123101     30    4          0        0      -1               1             0   0  ...       CIN                  0                        0                          2                          0                            2                            0           0.0            0.0    2017
[407688 rows x 37 columns]
```

We then calculate the impact of this operation by comparing the number of columns before and after.

```python
print("original columns: %d \n" % data.shape[1])
print("cleaned columns: %d \n" % removed_columns_empty_data.shape[1])
```

Output:

```
original columns: 102
cleaned columns: 37
```

### Subsetting the Data

To focus on a smaller portion of the dataset, we can create a subset.

```python
subset_nfl_data = data.loc[:, 'EPA':'Season'].head()
subset_nfl_data
```

Output:

```
         EPA    airEPA    yacEPA  Home_WP_pre  Away_WP_pre  Home_WP_post  Away_WP_post  Win_Prob       WPA    airWPA    yacWPA  Season
0  2.014474       NaN       NaN     0.485675     0.514325     0.546433     0.453567  0.485675  0.060758       NaN       NaN    2009
1  0.077907 -1.068169  1.146076     0.546433     0.453567     0.551088     0.448912  0.546433  0.004655 -0.032244  0.036899    2009
2 -1.402760       NaN       NaN     0.551088     0.448912     0.510793     0.489207  0.551088 -0.040295       NaN       NaN    2009
3 -1.712583  3.318841 -5.031425     0.510793     0.489207     0.461217     0.538783  0.510793 -0.049576  0.106663 -0.156239    2009
4  2.097796       NaN       NaN     0.461217     0.538783     0.558929     0.441071  0.461217  0.097712       NaN       NaN    2009
```

### Basic Filling of Missing Values

A straightforward method for handling missing values is to fill them with a specific value, such as zero.

```python
filled_basic_data = data.fillna(0)
filled_basic_data.head()
```

Output:

```
         Date      GameID  Drive  qtr  down   time  TimeUnder  TimeSecs  PlayTimeDiff  SideofField  ...    yacEPA  Home_WP_pre  Away_WP_pre  Home_WP_post  Away_WP_post  Win_Prob       WPA    airWPA    yacWPA  Season
0  2009-09-10  2009091000      1    1   0.0  15:00         15     3600           0.0          TEN  ...  0.000000     0.485675     0.514325     0.546433     0.453567  0.485675  0.060758  0.000000  0.000000    2009
1  2009-09-10  2009091000      1    1   1.0  14:53         15     3593           7.0          PIT  ...  1.146076     0.546433     0.453567     0.551088     0.448912  0.546433  0.004655 -0.032244  0.036899    2009
2  2009-09-10  2009091000      1    1   2.0  14:16         15     3556          37.0          PIT  ...  0.000000     0.551088     0.448912     0.510793     0.489207  0.551088 -0.040295  0.000000  0.000000    2009
3  2009-09-10  2009091000      1    1   3.0  13:35         14     3515          41.0          PIT  ... -5.031425     0.510793     0.489207     0.461217     0.538783  0.510793 -0.049576  0.106663 -0.156239    2009
4  2009-09-10  2009091000      1    1   4.0  13:27         14     3507           8.0          PIT  ...  0.000000     0.461217     0.538783     0.558929     0.441071  0.461217  0.097712  0.000000  0.000000    2009
```

### Column-Based Filling

Another approach is to fill missing values based on the next valid observation in the column.

```python
column_based_fill = data.bfill(axis=0).fillna(0)
column_based_fill.head()
```

Output:

```
         Date      GameID  Drive  qtr  down   time  TimeUnder  TimeSecs  PlayTimeDiff  SideofField  ...    yacEPA  Home_WP_pre  Away_WP_pre  Home_WP_post  Away_WP_post  Win_Prob       WPA    airWPA    yacWPA  Season
0  2009-09-10  2009091000      1    1   1.0  15:00         15     3600           0.0          TEN  ...  1.146076     0.485675     0.514325     0.546433

 0.453567  0.485675  0.060758 -0.032244  0.036899    2009
1  2009-09-10  2009091000      1    1   1.0  14:53         15     3593           7.0          PIT  ...  1.146076     0.546433     0.453567     0.551088      0.448912  0.546433  0.004655 -0.032244  0.036899    2009
2  2009-09-10  2009091000      1    1   2.0  14:16         15     3556          37.0          PIT  ... -5.031425     0.551088     0.448912     0.510793      0.489207  0.551088 -0.040295  0.106663 -0.156239    2009
3  2009-09-10  2009091000      1    1   3.0  13:35         14     3515          41.0          PIT  ... -5.031425     0.510793     0.489207     0.461217      0.538783  0.510793 -0.049576  0.106663 -0.156239    2009
4  2009-09-10  2009091000      1    1   4.0  13:27         14     3507           8.0          PIT  ...  0.163935     0.461217     0.538783     0.558929      0.441071  0.461217  0.097712 -0.010456  0.006029    2009
```

References:

- [Pandas Handling Missing Data](https://pandas.pydata.org/pandas-docs/stable/user_guide/missing_data.html)

These steps provide a comprehensive guide to identifying and handling missing values in a dataset, ensuring the data is ready for analysis and modeling. Each method has its pros and cons, and the choice of method depends on the specific context and requirements of your analysis.

## Extra exercise from kaggle

**This notebook is an exercise in the [Data Cleaning](https://www.kaggle.com/learn/data-cleaning) course. You can reference the tutorial at [this link](https://www.kaggle.com/alexisbcook/handling-missing-values).**

---

In this exercise, you'll apply what you learned in the **Handling missing values** tutorial.

# 1) Take a first look at the data

Run the next code cell to load in the libraries and dataset you'll use to complete the exercise.

```python
# modules we'll use
import pandas as pd
import numpy as np

# read in all our data
sf_permits = pd.read_csv("./Building_Permits.csv")

# set seed for reproducibility
np.random.seed(0)
```

    /tmp/ipykernel_33/3534875831.py:6: DtypeWarning: Columns (22,32) have mixed types. Specify dtype option on import or set low_memory=False.
      sf_permits = pd.read_csv("../input/building-permit-applications-data/Building_Permits.csv")

You can download the dataset from the [Kaggle website](https://www.kaggle.com/code/centrodph/exercise-handling-missing-values).

Use the code cell below to print the first five rows of the `sf_permits` DataFrame.

```python
# TODO: Your code here!
sf_permits.head()
```

<div>
<table>
  <thead>
    <tr>
      <th></th>
      <th>Permit Number</th>
      <th>Permit Type</th>
      <th>Permit Type Definition</th>
      <th>Permit Creation Date</th>
      <th>Block</th>
      <th>Lot</th>
      <th>Street Number</th>
      <th>Street Number Suffix</th>
      <th>Street Name</th>
      <th>Street Suffix</th>
      <th>...</th>
      <th>Existing Construction Type</th>
      <th>Existing Construction Type Description</th>
      <th>Proposed Construction Type</th>
      <th>Proposed Construction Type Description</th>
      <th>Site Permit</th>
      <th>Supervisor District</th>
      <th>Neighborhoods - Analysis Boundaries</th>
      <th>Zipcode</th>
      <th>Location</th>
      <th>Record ID</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>201505065519</td>
      <td>4</td>
      <td>sign - erect</td>
      <td>05/06/2015</td>
      <td>0326</td>
      <td>023</td>
      <td>140</td>
      <td>NaN</td>
      <td>Ellis</td>
      <td>St</td>
      <td>...</td>
      <td>3.0</td>
      <td>constr type 3</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>Tenderloin</td>
      <td>94102.0</td>
      <td>(37.785719256680785, -122.40852313194863)</td>
      <td>1380611233945</td>
    </tr>
    <tr>
      <th>1</th>
      <td>201604195146</td>
      <td>4</td>
      <td>sign - erect</td>
      <td>04/19/2016</td>
      <td>0306</td>
      <td>007</td>
      <td>440</td>
      <td>NaN</td>
      <td>Geary</td>
      <td>St</td>
      <td>...</td>
      <td>3.0</td>
      <td>constr type 3</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>Tenderloin</td>
      <td>94102.0</td>
      <td>(37.78733980600732, -122.41063199757738)</td>
      <td>1420164406718</td>
    </tr>
    <tr>
      <th>2</th>
      <td>201605278609</td>
      <td>3</td>
      <td>additions alterations or repairs</td>
      <td>05/27/2016</td>
      <td>0595</td>
      <td>203</td>
      <td>1647</td>
      <td>NaN</td>
      <td>Pacific</td>
      <td>Av</td>
      <td>...</td>
      <td>1.0</td>
      <td>constr type 1</td>
      <td>1.0</td>
      <td>constr type 1</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>Russian Hill</td>
      <td>94109.0</td>
      <td>(37.7946573324287, -122.42232562979227)</td>
      <td>1424856504716</td>
    </tr>
    <tr>
      <th>3</th>
      <td>201611072166</td>
      <td>8</td>
      <td>otc alterations permit</td>
      <td>11/07/2016</td>
      <td>0156</td>
      <td>011</td>
      <td>1230</td>
      <td>NaN</td>
      <td>Pacific</td>
      <td>Av</td>
      <td>...</td>
      <td>5.0</td>
      <td>wood frame (5)</td>
      <td>5.0</td>
      <td>wood frame (5)</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>Nob Hill</td>
      <td>94109.0</td>
      <td>(37.79595867909168, -122.41557405519474)</td>
      <td>1443574295566</td>
    </tr>
    <tr>
      <th>4</th>
      <td>201611283529</td>
      <td>6</td>
      <td>demolitions</td>
      <td>11/28/2016</td>
      <td>0342</td>
      <td>001</td>
      <td>950</td>
      <td>NaN</td>
      <td>Market</td>
      <td>St</td>
      <td>...</td>
      <td>3.0</td>
      <td>constr type 3</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>6.0</td>
      <td>Tenderloin</td>
      <td>94102.0</td>
      <td>(37.78315261897309, -122.40950883997789)</td>
      <td>144548169992</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 43 columns</p>
</div>

<span >Correct:</span>

The first five rows of the data does show that several columns have missing values. You can see this in the "Street Number Suffix", "Proposed Construction Type" and "Site Permit" columns, among others.

# 2) How many missing data points do we have?

What percentage of the values in the dataset are missing? Your answer should be a number between 0 and 100. (If 1/4 of the values in the dataset are missing, the answer is 25.)

```python
# TODO: Your code here!
total_cells = np.product(sf_permits.shape)
missing_values_count = sf_permits.isnull().sum();

total_missing_cells = missing_values_count.sum();

# print("shape", sf_permits.shape)
print('total cells', total_cells)
# print('total missing per column', missing_values_count)
print('total missing cells', total_missing_cells)

percent_missing = (total_missing_cells / total_cells) * 100

print('percent missing', percent_missing)

```

    total cells 8552700
    total missing cells 2245941
    percent missing 26.26002315058403

<span >Correct</span>

# 3) Figure out why the data is missing

Look at the columns **"Street Number Suffix"** and **"Zipcode"** from the [San Francisco Building Permits dataset](https://www.kaggle.com/aparnashastry/building-permit-applications-data). Both of these contain missing values.

- Which, if either, are missing because they don't exist?
- Which, if either, are missing because they weren't recorded?

Once you have an answer, run the code cell below.

<span >Correct:</span>

If a value in the "Street Number Suffix" column is missing, it is likely because it does not exist. If a value in the "Zipcode" column is missing, it was not recorded.

# 4) Drop missing values: rows

If you removed all of the rows of `sf_permits` with missing values, how many rows are left?

**Note**: Do not change the value of `sf_permits` when checking this.

```python
# TODO: Your code here!
total_rows = sf_permits.shape[0]
total_rows_after_drop= sf_permits.dropna().shape[0]

print(total_rows)
print(total_rows_after_drop) # no rows
```

    198900
    0

<span >Correct:</span>

There are no rows remaining in the dataset!

# 5) Drop missing values: columns

Now try removing all the columns with empty values.

- Create a new DataFrame called `sf_permits_with_na_dropped` that has all of the columns with empty values removed.
- How many columns were removed from the original `sf_permits` DataFrame? Use this number to set the value of the `dropped_columns` variable below.

```
sf_permits_with_na_dropped = sf_permits.dropna(axis=1)

dropped_columns = sf_permits.shape[1] - sf_permits_with_na_dropped.shape[1]
```

# 6) Fill in missing values automatically

Try replacing all the NaN's in the `sf_permits` data with the one that comes directly after it and then replacing any remaining NaN's with 0. Set the result to a new DataFrame `sf_permits_with_na_imputed`.

```
sf_permits_with_na_imputed = sf_permits.bfill(axis=0).fillna(0)
```

# More practice

- Check out [this noteboook](https://www.kaggle.com/alexisbcook/missing-values) on handling missing values using scikit-learn's imputer.
- Look back at the "Zipcode" column in the `sf_permits` dataset, which has some missing values. How would you go about figuring out what the actual zipcode of each address should be? (You might try using another dataset. You can search for datasets about San Fransisco on the [Datasets listing](https://www.kaggle.com/datasets).)
