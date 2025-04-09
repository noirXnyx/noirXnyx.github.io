---
layout: page
title: Comparative Machine Learning Approaches For Predicting Scale Score Averages (Capstone)
description: 
img: assets/img/12.jpg
importance: 1
category: school projects
related_publications: false
---

In my capstone, I aimed to answer this research question - How do traditional regression models compare to tree-based models in predicting school
level Scale Score Averages based on predictive accuracy and model performance metrics?

Hypothesis
- Null Hypothesis (H₀): There is no significant difference in predictive accuracy between tree
based models and traditional regression models in predicting school-level Scale Score Averages. 
- Alternative Hypothesis (H₁): Tree-based models demonstrate significantly higher predictive 
accuracy than traditional regression models in predicting school-level Scale Score Averages. 

Models used in this study
- Tree-based models: Decision Tree Regressor, XGBoost
- Traditional regression models: Ridge Regression, Lasso Regression

I divided the script/code to three. All of these were done in Jupyter Lab. Language is Python.
- Data Preparation and Processing
- Building and hypertuning the machine learning models
- Data analysis which included statistical results, tests, and visuals

If you want to view the complete code I used, kindly click the 
{% raw %}
```html
For data preparation and processing, I started with importing the packages. 
    import pandas as pd
    import matplotlib.pyplot as plt
    import seaborn as sns
    import re
    import kagglehub
    import os
    from IPython.display import display
    import numpy as np
    import joblib
    import time
    
In my previous projects, I developed Python scripts to programmatically validate and analyze CSV datasets,
which I also utilized in this study.
```
{% endraw %}

Sample link: <a href="https://www.example.com">Click here</a>


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---


You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}.
Say you wanted to write a bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
