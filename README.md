# Dependency Grid

This app will find all the items of a particular Portfolio artefact type in your chosen node, then lay out a two dimensional grid if any of them have dependencies.

# Exploring the data

For every item you have asked for, the app will place a row on the grid. The row will contain two important places to focus on:

    the circle(s) in the row
    
Circles are drawn when there is a predecessor relationship. The colour of the circle is to categorise the predecessor information. This colour can be compared to the colour band to the left which uses the same algorithm to colour for the main item

The categorisation method can be selected via the drop-down marked as "Colour Group".

By default, the sorting across the grid (and hence down the grid) is set to the item ID. If you select a different sort order, the grid will be rearranged. E.g, if you select "Name", the items will be arranged alphabetically on the title of the item. The information used for the sort order will be shown to the right of the row

Hovering over a circle will highlight the item names at the top and to the left in red. You can then go to the name and click on it to go to the data panel for that item

Hovering over the circles in the rows will also give you the information for the Predecessor and Successor based on the Grouping you have chosen in the header bar

If you click on the circle, the app will add highlight to the row and column until you click on another circle (either a different one or the same one) to aid with finding the right items in a large grid

    the FormattedID to the left
    
If the FormattedID is not blinking, then look across the row for a circle. The circle indicates the column for the predecessor. If there are no circles, then the FormattedID you are looking at has a Successor which is part of these items

If the FormattedID is blinking, then there is one (or more) dependencies (Predecessor or Successor) that is not in these items. Once again, Predecessors that are known about are shown as circles

Clicking on the FormattedID text will bring up the data panel showing you more info about that Portfolio Item

Shift-Click on the FormattedID will give you a pop-up with just the dependencies on

# Filtering

The app options will allow you to minimise the number of columns and rows by only showing those with dependencies - giving a more focussed view

There are app settings to enable the extra filtering capabilities on the main page, so that you can choose which portfolio items to see e.g. filter on Owner, Investment Type, etc.

You can use the advanced filter to show you items in a particular Program Increment. Remember: if there are dependencies from Successor to a Predecessor that was not in the filtered selection, the Successors name to the left will blink slowly.This means if you have items in your node that are not in the Release you have filtered for, you will not see them and the FormattedID may still blink

![alt text](https://github.com/nikantonelli/DependencyGrid/blob/master/Images/Untitled.png)
