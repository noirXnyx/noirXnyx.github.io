---
layout: page
title: Projects
permalink: /projects/
description: |
  <span style='font-size: 1.15rem; text-align: justify; display: block'> This page showcases projects that have been committed and deployed on GitHub, each with a brief explanation and a link to the corresponding repository. Some projects are not yet committed or deployed due to various reasons such as ongoing revisions, data privacy considerations, or deployment constraints. The page is actively being updated to reflect current progress. </span><br>
  <span style='font-size: 1.15rem; text-align: justify; display: block'> All processes on this webpage are deployed using PyCharm and GitHub. To get the most out of each project, I recommend exploring them on a laptop or desktop computer.</span><br>
  <span style='font-size: 1.15rem; text-align: justify; display: block'> I want my projects to continue to evolve into better versions, so if you have any suggestions, corrections, or ideas, feel free to send me an email — I’d genuinely appreciate your thoughts and would love to chat! </span><br>


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
