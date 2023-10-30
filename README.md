# Introduction

Welcome to the Football Coaching Mobile App repository! This app is built using React Native and provides features that are beneficial for football coaching.

## Why this application?

High school and college sports teams face significant barriers to accessing advanced real-time sports analytics tools. HUDL, a popular sports analytics platform, charges at least $1,000 per year for about 100 hours of game statistics, mostly for post-game analysis.
Traditional methods of gathering game data, such as manually tracking statistics or reviewing game footage, can be time-consuming, not comprehensive enough, and ineffective.

Enter AI Huddle: a smart-phone app !!! 

AI Huddle enables coaches to use their smartphones to record their verbal comments on each play and selected players during a game, as well as relevant video snippets for reviews at a later time. The recorded audio will be automatically transcribed using speech-to-text (STT) technologies; and the text will also be analyzed using natural language Processing (NLP) technologies to generate reports and stats in real-time. In addition to the automatically translated text, the coaches can manually edit/correct the comments before being processed by NLP.


## What's Inside

#### Components

Components are reusable parts of the app that make up the user interface (UI). Think of them as building blocks. Here's what I've created:

1. Box: The Box is a versatile container used in the UI to group other elements together. . It can hold and organize texts, images, or other components,ensuring a clean and organized layout.

2. Button: Buttons are interactive elements that users can tap or click. They perform specific actions within the app, like submitting a form or navigating to another screen.

3. Label: Labels are text elements that provide clear names or descriptions for UI elements. They're especially important for form inputs, ensuring users know what information is expected.

4. Profile Page: The Profile Page is a dedicated section where users can view and edit their personal information. It includes details like name, profile picture, and other relevant data.

5. Recording Button: This is a special button that lets users start or pause audio or video recordings. Its state changes to reflect whether a recording is in progress or not.

#### Navigators

Navigators control how users move between different parts of the app. We've got:

1. BottomTab: The BottomTab is a set of navigation options located at the bottom of the screen. By tapping on these tabs, users can easily switch between different sections of the app, making for a smooth and intuitive experience.

2. HistoryStack: The HistoryStack is a navigation system dedicated to the history section of the app. It allows users to delve into previous records, data, or actions, and navigate back and forth between related screens.

3. PlaybookStack: PlaybookStack offers navigational paths within the playbook section. This is where strategies, plays, and tactical discussions are stored, and users can move through them in a structured manner.

4. ProfileStack: Serving the profile section, the ProfileStack allows users to traverse various parts related to their personal details, preferences, and settings, ensuring a coherent and organized browsing experience.

5. RecordStack: The RecordStack is all about managing and navigating recordings. Whether users are starting a new recording, viewing past recordings, or editing them, this navigator keeps the process streamlined.

#### Screens

Screens are the individual pages or views that users interact with. We have:

1. History: This screen showcases past records, data, and actions of the team or individual. It's a place to reflect on previous achievements and events.

2. Login: The Login screen is the gateway for users to access the app using their credentials. By entering their username and password, they can securely access their data and the app's features.

![login page](https://github.com/shaunthom/Football_Analytics_Mobile_App/assets/134566032/1467c975-0484-4284-932a-7364cce5dce2)



3. Playbook: The Playbook screen is a strategic hub. Here, users can view, create, or modify plays, strategies, and game plans, ensuring they're prepared for any match or scenario.

4. Profile: On the Profile screen, users can view and edit their personal details. This includes information like their name, profile picture, contact details, and preferences.

5. Record: This is where users can create, view, and manage audio or video recordings. Whether they're capturing a play, feedback, or any other content, the Record screen makes it simple.

![record_page](https://github.com/shaunthom/Football_Analytics_Mobile_App/assets/134566032/620ca971-61ce-4530-8c55-0b7a74b22b5f)


6. Register: New users come to the Register screen to create an account. By providing necessary details and setting up a password, they can join the app community.

7. Roster: The Roster screen lists all team members or participants, along with their details. Users can add new members, edit existing details, or view profiles, ensuring the team's data is always up-to-date.

8. Statistics: The Statistics screen is a data-driven space. Here, users can view performance metrics, analyses, and insights, helping them make informed decisions and strategies.

9. Timeline: The Timeline screen presents events, actions, or milestones in a chronological order. It gives users a clear view of what's happened in the past, what's currently ongoing, and what's planned for the future.

![timeline page](https://github.com/shaunthom/Football_Analytics_Mobile_App/assets/134566032/9634eee5-25c5-4274-b49b-490b09a8cbc8)



Assets

These are the visual elements like pictures used in the app, which can be found in:

pngs: Various images for the app.

## File Hierarchy

For those interested in the technical details, here's how the files are organized:


Components: Football_Coaching_Mobile_App/frontend/src/components

Navigators: Football_Coaching_Mobile_App/frontend/src/navigators

Screens: Football_Coaching_Mobile_App/frontend/src/screens

Assets: Football_Coaching_Mobile_App/frontend/assets


