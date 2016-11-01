# UI Task - Develop an eStore Mockup

This is a front-end mockup for an online store where you can add products to cart and remove them if wanted.

This was developed as a part of job application. like to live version: https://moamenezzat.github.io/UI-Task/

The items for the main page's catalog are stored in "catalog.json" in Sources folder. Items are loaded by AJAX GET request after the DOM is ready.

The catalog have an option for adding quantities of items to cart. the default value is one and if it is set to zero or is empty validation message is displayed and order will not be placed.

On **Login/Signup** and **Admin** Pages the validation of the forms is handled by HTML5 validation and jQuery Validation plugin for browsers that don't support HTML5 validation.

In The **Admin** page you can view current Items and categories in the store as well as add new items and categories locally to the page "no back-end support".

To acces the **Admin** page from login page use:
>"admin" for username and password

Succefull submitting of forms on the website displays modal succes messages.

Here is the detailed Description of the requested task:
![Alt text](/Sources/Task Description.png?raw=true "Task Description")
