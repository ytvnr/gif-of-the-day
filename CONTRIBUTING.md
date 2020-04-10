# Contributing to Gif Of The Day

  * [GitHubFlow](#githubflow)
  * [Question and Problems](#question-and-problems)
  * [Issues and Bugs](#issues-and-bugs)
  * [Development Setup](#development-setup)
    + [Configuring your Firebase project](#configuring-your-firebase-project)
      - [Database structure](#database-structure)
        * [Collection authorizedDomains](#collection-authorizeddomains)
        * [Collection organizations](#collection-organizations)
        * [Collection teams](#collection-teams)
        * [Collection themes](#collection-themes)
        * [Collection usersMetadata](#collection-usersmetadata)
    + [Installing Dependencies](#installing-dependencies)
    + [Building Gif of the Day](#building-gif-of-the-day)
      - [Running the app](#running-the-app)
  * [Pull Request Submission Guidelines](#pull-request-submission-guidelines)
    + [CI/CD](#ci-cd)
    + [After your pull request is merged](#after-your-pull-request-is-merged)
  * [Commits](#commits)
    + [Examples of good pratices](#examples-of-good-pratices)

## GitHubFlow

We use GitHubFlow as branch management in Git. This is a [cheatsheet](https://guides.github.com/introduction/flow/)

We have just a difference: the deployment in production is done when merging on master. 
So if it breaks production, we have to do a new PR to fix it.

## Question and Problems

## Issues and Bugs

If you find an issue in the project you can submit an issue to our bug tracker. Or even better you can submit a Pull Request with a fix.

The issue manager from GitHub will allow you to choose between:

- Bug Report: You have encountered a bug and want it to be fixed.

- Feature Request: You desire to see a new feature in the app

- Custom issue template: Something else!

## Development Setup

This document describes how to set up your development environment to build and test Gif of the Day

### Configuring your Firebase project

Create a firebase project with the [Firebase console](https://console.firebase.google.com/)

- Create a "Cloud Firestore" database. Rules will be override by [firestore.rules](../firestore.rules).

- Activate "Google" as sign-in provider. You can also use "Mail/Password"

Create a .env.local file by copying .env file at root folder and set firebase environment variables. You can get all these variables from the firebase console's homepage by clicking
"Add an application" and selecting the web icon.

#### Database structure

Here is the description of the database structure. Create these collections if you want to use the app.

##### Collection authorizedDomains

The list of authorized domain for sign-in by email authentication.

ℹ️ You **have to** populate manually this collection. There is no domain authorization management feature in the app.

Each document is structured like this:

| attribute | type | example |
| :---: |:---:| :---:|
| domain | string | "gmail.com" |

##### Collection organizations

The list of organizations. As a user, you need to belong to an organization to be able to use the application.
A field in usersMetadata is available to do this (🚧 manually for the moment 🚧)

ℹ️ You **have to** populate manually this collection.

Each document is structured like this:

| attribute | type | example |
| :---: |:---:| :---:|
| name | string | "GifOfTheDay Inc" |

##### Collection teams

The list of the teams. As a user, you can join a team and select a Gif for the day you want.

ℹ️ You **have to** populate manually this collection. There is no team creation feature in the app.

Each document is structured like this:

| attribute | type | example | comment |
| :---: |:---:| :---:| :---:|
| avatar | string | "💪 💀" | |
| name | string | "💪 Strong Skulls 💀" | |
| organization | reference | /organizations/5dikjenJj9kJH2 | Reference to the organization owning this team. We base on this field to get the list of teams for an organization |

##### Collection themes

The list of themes. A theme is related to a team for a date.

ℹ️ You don't have to populate manually this collection. It can be done using the app.

Each document is structured like this:

| attribute | type | example | comment |
| :---: |:---:| :---:| :---:|
| date | timestamp | March, 30 2020 11:11:11AM | Use `Date` object in js |
| team | reference | /teams/5dikjenJj9kJH2 | Reference to the team document |
| theme | string | "Pandas" |  |

##### Collection usersMetadata

The list of usersMetadata. 

⚠️ Please note the id of a document is the user id ⚠️.

ℹ️ You don't have to populate manually this collection.

Each document is structured like this:

| attribute | type | example | comment |
| :---: |:---:| :---:| :---:|
| assignedTeamId | string | "5dikjenJj9kJH2" | |
| organization | string | "5dikjenJj9kJH2" | The organization id to which user belong. It has to be set manually by an admin to the user use the app.|

### Installing Dependencies

Before you can build Gif of the Day, you must install and configure the following dependencies on your machine:

- [Git](http://git-scm.com/): The [Github Guide to Installing Git](https://help.github.com/en/github/getting-started-with-github/set-up-git) is a good source of information.

- [Node.js v10.x (LTS)](http://nodejs.org).

  We recommend using [nvm](https://github.com/creationix/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows))
  to manage and install Node.js, which makes it easy to change the version of Node.js per project.
  
### Building Gif of the Day

To build Gif of the Day, you clone the source code repository and use the maven script to launch it:

```shell
# Clone the Github repository (or fork it!):
git clone git@github.com:ytvnr/gif-of-the-day.git

# Go to the front directory:
cd front
npm install
```

#### Running the app

Run the following command to launch the app.

```shell
    npm start
```

## Pull Request Submission Guidelines

Before you submit your pull request consider the following guidelines:

- Create the development environment

- Make your changes in a new git branch:

  ```shell
  git checkout -b fix/my-fix-branch master
  ```

- Create your patch, commit, **with appropriate test cases**.

- Commit your changes using a descriptive commit message that follows our [commit message conventions][developers.commits].

- Push your branch to GitHub:

  ```shell
  git push origin fix/my-fix-branch
  ```

- In GitHub, send a pull request to `gif-of-the-day:master`. This will trigger the GitHub Actions integration.

    - When opening a PR, please use the provided PR Template.
      
    - First of all, update the badge with the related issue:
      
      Here is an example with issue #29 (with a red color): 
      
      `![GitHub issue/pull request detail](https://img.shields.io/github/issues/detail/title/ytvnr/gif-of-the-day/29?style=for-the-badge)`
      
      Here is a documentation with available colors: https://shields.io/
      
    - Then, provide a description of how you resolved the issue
      
      Add screenshot if needed (UI changes)
      
      AND DON'T FORGET TO ADD A FUN GIF !

- If you find that the GitHub Actions integration has failed, look into the logs on GitHub Actions if your changes caused test failures, etc.

- If we suggest changes then:
  - Make the required updates.
  - Commit your changes to your branch.
  - Push the changes to your GitHub repository (this will update your Pull Request).

That's it! Thank you for your contribution!

### CI-CD

We're using GitHub actions for automated stuff.

You can find the scripts [here](../.github/workflows)

- **PR Labeler / pr-labeler**: Auto label your PR depending on branch name. It make it easy to manage PRs

     ```yml
      Feature 🎉: ['feature/*', 'feat/*']
      Bug 🐜: ['bug/*', 'bugfix/*']
      Documentation 📒: ['docs/*', 'documentation/*']
      Technical task 👨🏻‍🔧: ['chore/*', 'tech/*']
      Nice to have 🦞: 'nice/*'
      ```
- **Build before merge / Build**: Check that the project build correctly before merging to master. **Required check**
- **Build and Deploy / Deploy**: When merged on master, build and deploy automatically on firebase environment

### After your pull request is merged

You can safetly delete your branch and checkout the master branch:

```shell
  git fetch
  git checkout master -f
  git branch -D fix/my-fix-branch
```

## Commits

We follow the [conventional commits][conventional.commits] rules. It provides an easy sets of rules for creating an explicit commit history.
We encourage to use fun emojis in messages! 😻🦾🧑‍💻 (You may use [girmoji](https://gitmoji.carloscuesta.me/))

The commit is structured as follows:

```shell
    <type>[optional scope]: <description>

    [optional body]

    [optional footer]
```

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. fix:
2. feat:
3. chore:
4. docs:
5. style:
6. refactor:
7. perf:
8. test:

List of accepted [scopes](.github/semantic.yml)

### Examples of good pratices

- Commit message with no body:

  ```shell
  feat: display theme in homepage
  ```

- Commit message with scope and no body:

  ```shell
  feat(front): display theme in homepage
  ```

[developers.commits]: CONTRIBUTING.md#commits
[conventional.commits]: https://www.conventionalcommits.org/en/
