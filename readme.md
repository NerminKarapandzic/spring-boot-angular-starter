Spring-boot-Angular-starter
All the things that any next project will need

Having tried different BaaS services recently I came to a conclusion I don't like to use them, I prefer to code my own thing and understand fully how everything in my software works. But I also came to a conclusion that I don't like repeating the same code for every new project.

This repository is the solution to all my problems. It contains all the stuff that any (or most at least) project needs and is a great starting point for new projects.

Below is a list of features I plan to add to this starter template:

Users authentication, authorization, password resets, verification (email), using Spring Security as an app level security mechanism
Email sending. Configurable email providers. Ability to send single or bulk emails.
Configurable storage options with different adapters, for start there will be local and wassabi(s3) adapters, you can add your own based on provided interface.
Application metrics and http traces in an admin dashboard, configuration options to control the retention period and storage type
Application logs via Grafana and Loki or Logstash and Elasticsearch, haven't yet decided
Angular client app that accompases all the previously mentioned features (Tailwind + DaisyUI)
docker-compose that makes everything run together
Tomcat ssl configuration
Nginx reverse proxy (maybe, depends on how hard will it be to make the frontend run on tomcat)
IN PROGRESS...