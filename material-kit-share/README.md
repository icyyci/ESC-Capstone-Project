# How to install
Note that this does not include the node-modules. You have to install them yourselves first before using (~roughly 500 mb).
To do so, do:
```
npm install
```

# To start
You can do:
```
npm start
```
to see the page. Note that the page (as seen in the screenshot below) can be found in the page '/Announcements'. For example, it can be in: 'localhost:3000/Announcements'.

# User Dashboard Page
![Alt text](Dashboard.png?raw=true "Title")

# Populating Request Table
'Request Table' is simply the request that each capstone group makes, as their make known their various requirements for their exhibition. This information is collected from another page, compiled into JSON format, and then written to MongoDB - one JSON object per group.

In this 'Announcement' page, students can view their latest request made, represented in a tabular format. Students can locate this table by clicking on "Your Latest Request" tab (see screenshot below for example).

Note that in this code, it does not actually retrieve any data from MongoDB, so as such, there is an example request provided inside, in JSON format.

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
## Rendering the Table
The function call to render to the table is located in the file `SectionPills.js`. This is where the variable `request` is located too. The code calls the function to render the table, along with `request` as a parameter, like so:

```
<SectionTable data={request}/>
```

Here, `SectionTable` is something that is imported from another file (see the top of `SectionPills.js`):

```
import SectionTable from "./SectionTable"
```

This is done purely to compartmentalise the code - make things neat. This means that the code for the table's implementation is located in the full-path:

```
.\src\views\Announcements\Sections\SectionTable.js
```

## Display in Page
![Alt text](TableEx1.png?raw=true "Title")








