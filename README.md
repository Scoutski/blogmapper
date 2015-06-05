Blog Mapper
===========

### Contents:

1. Introduction and Background
2. Versions
3. User Guide
4. Testing
5. Related Resources

1. Introduction and Background:
-------------------------------
Thank you for coming to take a look at my Blog Mapper project!

This web application was designed and developed as part of General Assembly's (GA) Web Development Immersive (WDI) course as Project 1. More information about GA's WDI course can be found by visiting this [link](https://generalassemb.ly/education/web-development-immersive).

The requirements for this project were to create a fully interactive rails based website that made use of models, views, invalid data-handling, gems, a user login system, a minimum of three tables and the application deployed on to Heroku.

I actually started this project with this [initial concept](https://github.com/scoutski/everyagg), which was based on a map-based javascript application but I found that handling the data would require more time than I felt I could make a useful project with.

Similar to the last project, I wanted to ensure that I expose myself to additional technologies but there was definitely a stronger focus on familiarizing myself with the new content we covered in class (handling database requests and proper use of an MVC model). Some of the new technologies I used in this project were:

- The Google Maps API
- The Geocoder Gem
- The Gon Gem
- The Seed Dump Gem

2. Versions:
------------

v1.0: The first working version of this project was released on Thursday, 4 June 2015. The project was completely functional but a list of potential future functionality can be seen in the related resources section.

3. User Guide:
--------------

The app is powered with manually entered data, so unfortunately it can not update with new posts from the different food blogs that are listed. Each icon on the map represents a blog post from the specific blog that is represented in the marker image. To read the blog post related to each marker, select the marker on the map and the 'Original Post' link from the info window that pops up.

The application can be used to view posts and markers for restaurants but the functionality is increased if a user creates an account with the sign up link in the top right corner. By signing up, the user has access two two additional features and two additional pages:

- Follow Blogs: When the user selects a blog on the left hand side, they get the menu for that blog open and they can follow a blog which will update live on their click.
- Favorite Post: When the user selects a marker to view the information about the restaurant and post, they have the option to favorite a post and add individual posts to a new map view that only shows the posts they have favorited.

4. Testing:
----------

Much of the testing for this application was done during development and during the javascript refactor stage when trying to clean up logic and simplify functions. There are no known site-breaking bugs at the time of this publishing.

5. Related Resources:
---------------------

Please see any of the following links for more information about the components of this project and some of the related resources that were used and referenced in the creation of this project:

- [https://docs.google.com/spreadsheets/d/1Zh9hb4UE0sUh9058XSuEzCgMnagm7eqHhqK0ee4r9lo/edit#gid=0] Issue List