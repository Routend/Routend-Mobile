# Routend
---

<img src="https://s3-us-west-1.amazonaws.com/routend/Screenshots/Login.png" width="305">

## Description
Routend is a lifestyle application that keeps track of your daily route and activities. Setup places to track, such as the gym or work and get statistics based off of how long and how often you do a certain activity daily. View your statistics and see visualizations through graphs and charts. Get matched with people with similar interests in your area. Find potential friends that go to the same places and do similar activities. Locations are also suggested based off users with similar interests.

## Table of Contents

1. [Usage](#usage)
1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Installing Dependencies](#installing-dependencies)
1. [Tech Stack](#tech-stack)
1. [Directory Layout](#directory-layout)
1. [Contributing](#contributing)
1. [Licensing](#license)

## Usage

Home Screen/Track a Location:
![home_screen_track](https://s3-us-west-1.amazonaws.com/routend/GitHub/HomeTotal.jpg)

Stats Screen/Social Screen:
![stats_social](https://s3-us-west-1.amazonaws.com/routend/GitHub/StatswithMatch.jpg)

Social User/Location Details:
![social_details](https://s3-us-west-1.amazonaws.com/routend/GitHub/MatchDetails.jpg)

Friends/Message List/Private Messaging:
![friends_messages](https://s3-us-west-1.amazonaws.com/routend/GitHub/MessageTotal.jpg)

Settings:
![settings_one](https://s3-us-west-1.amazonaws.com/routend/GitHub/Settings1.jpg)
<img src="https://s3-us-west-1.amazonaws.com/routend/GitHub/Settings2.jpg" width="610">

## Getting started

### Prerequisites

### Installing Dependencies

#### 1. Clone the latest version

  Start by cloning the latest version of the Routend/Routend-Mobile and on your local machine by running:

  ```sh
  $ git clone https://github.com/Routend/Routend-Mobile.git
  $ cd Routend-Mobile
  ```

#### 2. Install Dependencies
  From within the root directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 3. Run the application

  1. You must install React Native dependencies and Xcode to run this application.

  ```sh
  $ brew install node
  $ brew install watchman
  $ npm install -g react-native-cli
  ```

  2. In a new terminal window run the following command to start the application:

  ```sh
  $ react-native run-ios
  ```

  After compiling, an iOS simulator will run and you will have access the application.

## Tech Stack

##### Front End:
- React Native
- Redux
- Socket-IO-Client
- D3
- AWS3

##### Back End:
- Node
- Express
- MySQL
- MongoDB
- Socket.io

##### Testing:
- Mocha
- Chai

## Directory Layout
```
├── app                               # Main application folder
│   ├── actions                       # Redux creators
│   │   ├── actions.js                # Action functions/API's
│   │   ├── index.js                  # Actions combined
│   │   └── types.js                  # Action types
│   ├── assets                        # Application assets
│   │   ├── Routend10.jpg             # Login background
│   │   ├── RoutendNav.png            # Homescreen logo
│   │   ├── Signup.jpg                # Signup background
│   │   └── map-marker.png            # Custom map marker
│   ├── containers                    # Containers
│   │   ├── AppContainer.js           # Main application container
│   ├── navigation                    # Application Navigation
│   │   ├── RootNavigation.js         # Application Navigation/Tab system
│   │   └── Router.js                 # Routing Paths
│   ├── reducers                      # Redux reducers
│   │   ├── index.js                  # Reducers combined
│   │   └── reducers.js               # Reducer functions
│   ├── screens                       # All Application Components
│   │   ├── HelpCenter.js             # Help Center
│   │   ├── HomeScreen.js             # Home Screen
│   │   ├── LocationDetails.js        # Location Details
│   │   ├── LogScreen.js              # Statistic Logs
│   │   ├── LoginScreen.js            # Login Screen
│   │   ├── MatchDetails.js           # Matched User Details
│   │   ├── MatchScreen.js            # User and location matches
│   │   ├── Messages.js               # Message List
│   │   ├── NotificationSettings.js   # Notification Settings
│   │   ├── PrivacyPolicy.js          # Privacy Policy
│   │   ├── PrivateMessage.js         # Private Messages
│   │   ├── ProfileSettings.js        # Profile Settings
│   │   ├── ReportProblems.js         # Report Problems
│   │   ├── SettingsScreen.js         # Settings Screen
│   │   ├── SignupScreen.js           # Signup Screen
│   │   ├── SocialScreen.js           # Friends List
│   │   ├── StatsScreen.js            # D3 Graphs
│   │   ├── TrackLocation.js          # Add a tracked location
│   │   ├── js                        # D3 Data
│   │   │   ├── art                   # React ART library
│   │   │   │   └── AnimShape.js      # Animated chart pieces
│   │   │   ├── charts                # D3 chart components
│   │   │   │   ├── AreaSpline.js     # Yearly spline chart
│   │   │   │   └── Pie.js            # D3 pie chart
│   │   │   └── theme                 # D3 color scheme
│   │   │       └── index.js          # D3 hex colors
│   │   └── resources                 # D3 resource folder
│   │       └── data.js               # D3 data
│   └── stylesheets                   # All component stylesheets
│       ├── DetailStyles.js           # Match details styles
│       ├── GraphStyles.js            # D3 graph styles
│       ├── HomeStyles.js             # Home screen styles
│       ├── LocationStyles.js         # Location styles
│       ├── LogStyles.js              # Stats page styles
│       ├── MatchStyles.js            # Match screen styles
│       ├── MessageStyles.js          # Message List styles
│       ├── ProfileStyles.js          # Profile styles
│       ├── SignInStyles.js           # Sign in styles
│       ├── SignUpStyles.js           # Sign up styles
│       ├── SocialStyles.js           # Friend list styles
│       └── TrackingStyles.js         # Track a location styles
└── index.ios.js                      # Main Component with Redux
```

## Contributing

  1. Fork the repo.
  2. Clone it to your local computer
  3. Cut a namespaced feature branch from master and name it appropriately
  4. Make commits and prefix each commit with the type of work you were doing
  5. BEFORE PUSHING UP YOUR CHANGES, rebase upstream changes into your branch, fix any potential conflicts, and then push to your fork.
  6. Submit a pull request directly to the master
  7. Someone else will perform code review to keep codebase clean
  8. Fix any errors or issues raised by the reviewer and push the fixes as a single new commit
  9. Repeat until the pull request is merged.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines in detail.

## License

M.I.T