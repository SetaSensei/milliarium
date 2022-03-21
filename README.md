
# Milliarium
## What is Milliarium ?

Milliarium is the name of a stone in the Roman provinces showing the distance between towns.

The project offers a way for DM to track their player's advancement through milestones & xp.

## Why this project ?

When DMing Curse of Strahd for multiple groups, I found an interesting way to drive the leveling up process with [this guide](https://www.dmsguild.com/product/187250/Structured-Milestone-XP-for-Curse-of-Strahd).
As I had to keep track of multiple groups, I found it easier for me to have a small webapp to help me.

### Disclaimer

I did buy and use the guide I'm linking. However, I **did not** add its content to this project.

## How to use it ?

### Installation

* Have [node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed. 
* Download or clone the content to any folder on your machine.
* Navigate to the folder with any command line tool and type
  * `npm install`
  * `npm start`
  
### Setting up the data

Inside the `/scr/data` folder you will find two files.

* `levelup.json` where you can set the leveling up curve (i.e. the number of points to reach in order to gain a level).
* `rewards.json` where you can set the events, actions & quests you have in mind for the milestones advancement and their respective weigths.

