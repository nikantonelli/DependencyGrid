# DependencyGrid

This app will find all the items of a particular Portfolio artefact type in your chosen node, then lay out a two dimensional grid if any of them have dependencies.

# Exploring the data

Circles are drawn when there is a dependency relationship. The colour of the circle is to categorise the Predecessor information. This colour can be compared to the colour band to the left which uses the same algorithm to colour for the Successor

The categorisation method can be selected via the drop-down marked as "Colour Group". The PercentDOne fields that you can show in normal grids can be used to give indication of 'Late', 'On Track', 'At Risk', etc. Be aware that if you choose a PercentDOne field where the underlying data is not being entered correctly (e.g. PercentDoneByStoryPlanEstimate used but story points not entered) you may get 'Late' indication for items you believe are complete.

By default, the ordering across the grid (and hence down the grid) is set to the item ID. If you select a different order, the grid will be rearranged. E.g, if you select "Name", the items will be arranged alphabetically on the title of the item

Hovering over a circle will highlight the item names at the top and to the left in red. You can then go to the name and click on it to go to the data panel for that item

If you click on the circle, the app will add highlight to the row and column until you click on another circle (either a different one or the same one)

The app options will allow you to minimise the number of columns and rows by only showing those with depedencies - giving a more focussed view

# Filtering

There are app settings to enable the extra filtering capabilities on the main page, so that you can choose which portfolio items to see e.g. filter on Owner, Investment Type, etc.

You can use the advanced filter to show you items in a particular Program Increment. If there are dependencies from a successor to a Predecessor that was not in the filtered selection, the Sucessors name to the left will blink slowly.

![alt text](https://github.com/nikantonelli/DependencyGrid/blob/master/Images/Untitled.png)
