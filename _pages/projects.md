---
layout: page
title: Projects
permalink: /projects/
description: |
  <span style='font-size: 1.15rem; text-align: justify; display: block'> This page showcases projects I’ve created, including those that have been committed and deployed on GitHub. Each project comes with a brief explanation and, where applicable, a link to the corresponding repository. Some projects are not yet committed or publicly deployed due to ongoing revisions, data privacy considerations, or other constraints. The page is actively being updated to reflect my current progress. </span><br>
  <span style='font-size: 1.15rem; text-align: justify; display: block'> All processes on this webpage are developed and managed using PyCharm and GitHub. For the best experience, I recommend exploring these projects on a laptop or desktop computer. </span><br>
  <span style='font-size: 1.15rem; text-align: justify; display: block'> I’m always working to improve and expand my projects. If you have any suggestions, corrections, or ideas, feel free to send me an email — I’d truly value your input and would love to connect! </span><br>


nav: true
nav_order: 3
display_categories: [school projects, personal projects]

horizontal: true
---

<!-- pages/projects.md -->
<div class="projects">
  {% if site.enable_project_categories and page.display_categories %}
    <!-- Display categorized projects -->
    {% for category in page.display_categories %}
      <a id="{{ category | slugify }}" href=".#{{ category | slugify }}">
        {% if category == "school projects" or category == "personal projects" %}
          <h2 class="category" style="color: #0000FF;font-style: italic;font-size: 1.25rem;">{{ category }}</h2>
        {% else %}
          <h2 class="category">{{ category }}</h2>
        {% endif %}
      </a>
      {% assign categorized_projects = site.projects | where: "category", category %}
      {% assign sorted_projects = categorized_projects | sort: "importance" %}
      <!-- Generate cards for each project -->
      {% if page.horizontal %}
        <div class="container">
          <div class="row row-cols-1 row-cols-md-2">
            {% for project in sorted_projects %}
              {% include projects_horizontal.liquid %}
            {% endfor %}
          </div>
        </div>
      {% else %}
        <div class="row row-cols-1 row-cols-md-3">
          {% for project in sorted_projects %}
            {% include projects.liquid %}
          {% endfor %}
        </div>
      {% endif %}
    {% endfor %}
  {% else %}
    <!-- Display projects without categories -->
    {% assign sorted_projects = site.projects | sort: "importance" %}
    <!-- Generate cards for each project -->
    {% if page.horizontal %}
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2">
          {% for project in sorted_projects %}
            {% include projects_horizontal.liquid %}
          {% endfor %}
        </div>
      </div>
    {% else %}
      <div class="row row-cols-1 row-cols-md-3">
        {% for project in sorted_projects %}
          {% include projects.liquid %}
        {% endfor %}
      </div>
    {% endif %}
  {% endif %}
</div>
