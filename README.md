# How to install
Note that this does not include the node-modules. You have to install them yourselves first before using (~roughly 500 mb).
To do so, do:
```
npm install
```

# To start
To see the page, do:
```
npm start
```

# User Dashboard Page
![Alt text](Dashboard.png?raw=true "Title")

# Understanding Code Layout
The code for the above dashboard (i.e. '/Announcements') is located in `Announcements.js` - full path is `\src\views\Announcements\Announcements.js`.

![Alt text](DashboardLayoutExplained.png?raw=true "Title")

# Populating Request Table
'Request Table' is simply the request that each capstone group makes, as their make known their various requirements for their exhibition. This information is collected from another page, compiled into JSON format, and then written to MongoDB - one JSON object per group.

In this 'Announcement' page, students can view their latest request made, represented in a tabular format. **Students can locate this table by clicking on "Your Latest Request" tab (see screenshot below on how it looks like).**

Note that if you observe the code, it does not actually retrieve any data from MongoDB, so for purpose of demonstration, there is an example request provided inside, in JSON format.

```
var request = 
[
  {'Floor Space (m2)': 4},
  {'No. of Plugs': 2},
  {'No. of Screens': 1},
  {'Require Outdoor Exhibition': 'False'},
  {'Special Request': 'None'},
  {'Yeah Yeah': 'Papaya'},
  {'Blah Blah': 'Watermelon'}
]
```




