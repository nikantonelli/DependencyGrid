(function () {
    var Ext = window.Ext4 || window.Ext;

    Ext.define('Rally.app.PiDependencies.app', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    config: {
        defaultSettings: {
            showFilter: true,
            hideArchived: true,
            onlyDependencies: true,
            mapSelector: 'Cartography'
        }
    },

    DEFAULT_MAP_NAME: 'Cartography',
    cmArray: [
        {
            index: 0,
            mapTitle: 'Cartography',
            map: [  
                "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", 
                "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f", "#1baf8e", "#fffb33", "#7db5b8", "#f700e4", 
                "#0163a7", "#fb68c4", "#6fbcd2", "#f9bbca", "#b3b3b3", "#79017a", "#aad78a", "#ffdade",
                "#722c3a", "#00004e", "#414527", "#047f8f", "#7f4e2e", "#024b9f", "#4c2198", "#03321c", 
                "#262628", "#437f44", "#33143c", "#001292", "#22c3a7", "#20009c", "#828a4e", "#08ef1e", 
                "#fe9a5c", "#04975e", "#984550", "#0ee458", "#4c4c50", "#8fd888", "#ee28f8", "#002584"
            ]
        },

        {
            index: 1,
            mapTitle: 'Shades',
            map: [
                '#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d',
                '#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d',
                '#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#a63603','#7f2704',
                '#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000',
                '#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#006d2c','#00441b',
                '#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'
            ]
        },

        {
            index: 2,
            mapTitle: 'Shuffle Shades',
            map: [
                "#08519c", "#807dba", "#54278f", "#fee6ce", "#dadaeb", "#f16913", "#bcbddc", "#ef3b2c", 
                "#d94801", "#6a51a3", "#9e9ac8", "#2171b5", "#006d2c", "#fc9272", "#f0f0f0", "#7f2704", 
                "#00441b", "#bdbdbd", "#969696", "#fd8d3c", "#9ecae1", "#efedf5", "#74c476", "#a50f15", 
                "#c6dbef", "#3f007d", "#000000", "#238b45", "#4292c6", "#e5f5e0", "#fdd0a2", "#08306b", 
                "#fcbba1", "#67000d", "#41ab5d", "#fb6a4a", "#525252", "#252525", "#737373", "#fdae6b", 
                "#a63603", "#cb181d", "#c7e9c0", "#fee0d2", "#deebf7", "#a1d99b", "#d9d9d9", "#6baed6"
            ]
        },
        {
            index: 3,
            mapTitle: 'Red Brown',
            map: [ 
                '#f9ebea','#f2d7d5','#e6b0aa','#d98880','#cd6155','#c0392b','#a93226','#922b21','#7b241c','#641e16',
                '#fdedec','#fadbd8','#f5b7b1','#f1948a','#ec7063','#e74c3c','#cb4335','#b03a2e','#943126','#78281f',
            ]
        },
        {
            index: 4,
            mapTitle: 'Purples',
            map: [ 
                '#f5eef8','#ebdef0','#d7bde2','#c39bd3','#af7ac5','#9b59b6','#884ea0','#76448a','#633974','#512e5f',
                '#f4ecf7','#e8daef','#d2b4de','#bb8fce','#a569bd','#8e44ad','#7d3c98','#6c3483','#5b2c6f','#4a235a',
            ]
        },
        {
            index: 5,
            mapTitle: 'Blues',
            map: [ 
                '#eaf2f8','#d4e6f1','#a9cce3','#7fb3d5','#5499c7','#2980b9','#2471a3','#1f618d','#1a5276','#154360',
                '#ebf5fb','#d6eaf8','#aed6f1','#85c1e9','#5dade2','#3498db','#2e86c1','#2874a6','#21618c','#1b4f72',
            ]
        },
        {
            index: 6,
            mapTitle: 'BlueGreens',
            map: [ 
                '#e8f8f5','#d1f2eb','#a3e4d7','#76d7c4','#48c9b0','#1abc9c','#17a589','#148f77','#117864','#0e6251',
                '#e8f6f3','#d0ece7','#a2d9ce','#73c6b6','#45b39d','#16a085','#138d75','#117a65','#0e6655','#0b5345',
            ]
        },
        {
            index: 6,
            mapTitle: 'Greens',
            map: [ 
                '#e9f7ef','#d4efdf','#a9dfbf','#7dcea0','#52be80','#27ae60','#229954','#1e8449','#196f3d','#145a32',
                '#eafaf1','#d5f5e3','#abebc6','#82e0aa','#58d68d','#2ecc71','#28b463','#239b56','#1d8348','#186a3b',
            ]
        },
        {
            index: 6,
            mapTitle: 'Golds',
            map: [ 
                '#fef9e7','#fcf3cf','#f9e79f','#f7dc6f','#f4d03f','#f1c40f','#d4ac0d','#b7950b','#9a7d0a','#7d6608',
                '#fef5e7','#fdebd0','#fad7a0','#f8c471','#f5b041','#f39c12','#d68910','#b9770e','#9c640c','#7e5109',
            ]
        },
        {
            index: 7,
            mapTitle: 'Huge Shades',
            map: [ '#f9ebea','#f2d7d5','#e6b0aa','#d98880','#cd6155','#c0392b','#a93226','#922b21','#7b241c','#641e16',
            '#fdedec','#fadbd8','#f5b7b1','#f1948a','#ec7063','#e74c3c','#cb4335','#b03a2e','#943126','#78281f',
            '#f5eef8','#ebdef0','#d7bde2','#c39bd3','#af7ac5','#9b59b6','#884ea0','#76448a','#633974','#512e5f',
            '#f4ecf7','#e8daef','#d2b4de','#bb8fce','#a569bd','#8e44ad','#7d3c98','#6c3483','#5b2c6f','#4a235a',
            '#eaf2f8','#d4e6f1','#a9cce3','#7fb3d5','#5499c7','#2980b9','#2471a3','#1f618d','#1a5276','#154360',
            '#ebf5fb','#d6eaf8','#aed6f1','#85c1e9','#5dade2','#3498db','#2e86c1','#2874a6','#21618c','#1b4f72',
            '#e8f8f5','#d1f2eb','#a3e4d7','#76d7c4','#48c9b0','#1abc9c','#17a589','#148f77','#117864','#0e6251',
            '#e8f6f3','#d0ece7','#a2d9ce','#73c6b6','#45b39d','#16a085','#138d75','#117a65','#0e6655','#0b5345',
            '#e9f7ef','#d4efdf','#a9dfbf','#7dcea0','#52be80','#27ae60','#229954','#1e8449','#196f3d','#145a32',
            '#eafaf1','#d5f5e3','#abebc6','#82e0aa','#58d68d','#2ecc71','#28b463','#239b56','#1d8348','#186a3b',
            '#fef9e7','#fcf3cf','#f9e79f','#f7dc6f','#f4d03f','#f1c40f','#d4ac0d','#b7950b','#9a7d0a','#7d6608',
            '#fef5e7','#fdebd0','#fad7a0','#f8c471','#f5b041','#f39c12','#d68910','#b9770e','#9c640c','#7e5109',
            '#fdf2e9','#fae5d3','#f5cba7','#f0b27a','#eb984e','#e67e22','#ca6f1e','#af601a','#935116','#784212',
            '#fbeee6','#f6ddcc','#edbb99','#e59866','#dc7633','#d35400','#ba4a00','#a04000','#873600','#6e2c00',
            '#fdfefe','#fbfcfc','#f7f9f9','#f4f6f7','#f0f3f4','#ecf0f1','#d0d3d4','#b3b6b7','#979a9a','#7b7d7d',
            '#f8f9f9','#f2f3f4','#e5e7e9','#d7dbdd','#cacfd2','#bdc3c7','#a6acaf','#909497','#797d7f','#626567',
            '#f4f6f6','#eaeded','#d5dbdb','#bfc9ca','#aab7b8','#95a5a6','#839192','#717d7e','#5f6a6a','#4d5656',
            '#f2f4f4','#e5e8e8','#ccd1d1','#b2babb','#99a3a4','#7f8c8d','#707b7c','#616a6b','#515a5a','#424949',
            '#ebedef','#d6dbdf','#aeb6bf','#85929e','#5d6d7e','#34495e','#2e4053','#283747','#212f3c','#1b2631',
            '#eaecee','#d5d8dc','#abb2b9','#808b96','#566573','#2c3e50','#273746','#212f3d','#1c2833','#17202a'
            ]
        },
        {
            index: 8,
            mapTitle: 'Shuffled Huge Shades',
            map: [ 
                '#f5eef8', '#d5d8dc', '#633974', '#d2b4de', '#943126', '#eaecee', '#f6ddcc', '#9a7d0a', 
                '#f1c40f', '#f5cba7', '#af7ac5', '#c39bd3', '#e67e22', '#707b7c', '#cb4335', '#2980b9', 
                '#f4f6f7', '#cd6155', '#aeb6bf', '#7e5109', '#f0b27a', '#fef5e7', '#9b59b6', '#b3b6b7', 
                '#616a6b', '#ebdef0', '#e9f7ef', '#6c3483', '#48c9b0', '#2e4053', '#eb984e', '#fcf3cf', 
                '#d4ac0d', '#873600', '#d5f5e3', '#f2f4f4', '#a93226', '#f7f9f9', '#7b241c', '#2874a6', 
                '#f1948a', '#fae5d3', '#bb8fce', '#f2d7d5', '#424949', '#7dcea0', '#85929e', '#d4efdf', 
                '#d6dbdf', '#5499c7', '#e6b0aa', '#ca6f1e', '#aed6f1', '#212f3d', '#52be80', '#566573', 
                '#a9cce3', '#21618c', '#fad7a0', '#fdf2e9', '#dc7633', '#b9770e', '#34495e', '#d7bde2', 
                '#7fb3d5', '#f2f3f4', '#27ae60', '#839192', '#f8c471', '#f4d03f', '#2e86c1', '#196f3d', 
                '#138d75', '#85c1e9', '#5dade2', '#808b96', '#154360', '#fdfefe', '#d4e6f1', '#d1f2eb', 
                '#fadbd8', '#a6acaf', '#17a589', '#d35400', '#515a5a', '#5f6a6a', '#f7dc6f', '#2c3e50', 
                '#fef9e7', '#1f618d', '#1a5276', '#abebc6', '#b03a2e', '#9c640c', '#a569bd', '#1abc9c', 
                '#7b7d7d', '#d6eaf8', '#fdebd0', '#ebf5fb', '#aab7b8', '#ccd1d1', '#f5b7b1', '#d0ece7', 
                '#922b21', '#797d7f', '#626567', '#eaf2f8', '#d98880', '#148f77', '#17202a', '#eafaf1', 
                '#d0d3d4', '#117a65', '#eaeded', '#f9e79f', '#4d5656', '#784212', '#0e6655', '#e59866', 
                '#bfc9ca', '#b2babb', '#717d7e', '#fbfcfc', '#0b5345', '#2471a3', '#145a32', '#e5e8e8', 
                '#5d6d7e', '#1b4f72', '#3498db', '#d68910', '#76d7c4', '#ecf0f1', '#f0f3f4', '#73c6b6', 
                '#f5b041', '#f4ecf7', '#1c2833', '#e8f8f5', '#b7950b', '#1b2631', '#a04000', '#58d68d', 
                '#186a3b', '#909497', '#283747', '#1d8348', '#641e16', '#4a235a', '#d7dbdd', '#7d3c98', 
                '#212f3c', '#e8f6f3', '#273746', '#45b39d', '#e74c3c', '#ebedef', '#fbeee6', '#ba4a00', 
                '#99a3a4', '#884ea0', '#ec7063', '#979a9a', '#229954', '#e8daef', '#512e5f', '#8e44ad', 
                '#16a085', '#935116', '#f8f9f9', '#f9ebea', '#76448a', '#1e8449', '#e5e7e9', '#7d6608', 
                '#117864', '#f39c12', '#2ecc71', '#7f8c8d', '#f4f6f6', '#cacfd2', '#a9dfbf', '#a3e4d7', 
                '#a2d9ce', '#0e6251', '#82e0aa', '#af601a', '#28b463', '#abb2b9', '#d5dbdb', '#5b2c6f', 
                '#c0392b', '#bdc3c7', '#edbb99', '#95a5a6', '#fdedec', '#78281f', '#239b56', '#6e2c00'
             ]
        }
    ],
    
    colourMap: [],

    getSettingsFields: function() {
        var returned = [        
            {
                name: 'hideArchived',
                xtype: 'rallycheckboxfield',
                fieldLabel: 'Hide Archived',
                labelAlign: 'top'
            },
            {
                xtype: 'rallycheckboxfield',
                fieldLabel: 'Show Advanced filter',
                name: 'showFilter',
                labelAlign: 'top'
            },
            {
                xtype: 'rallycheckboxfield',
                fieldLabel: 'Show Only those with Dependencies',
                name: 'onlyDependencies',
                labelAlign: 'top'
            },
            {
                xtype: 'rallycombobox',
                margin: '10 0 5 20',
                name: 'mapSelector',
                fieldLabel: 'Colour Map :',
                labelWidth: 100,
                store: _.map(gApp.cmArray, function(r) { return [ r.mapTitle, r.mapTitle ];}),
                listeners: {
                    select: function(a) {
                        gApp._setColourMap(_.find(gApp.cmArray, function(d) { return d.mapTitle === a.value;}));
                    }
                }

            }
        ];
        return returned;
    },

    _setColourMap: function(a) {
        var mapstring = '[ ';
        _.each (_.shuffle(a.map), function (a) { mapstring += "'" + a + "', ";});
        mapstring += '];';
        gApp.colourMap = a.map;
    },
    itemId: 'rallyApp',
    MIN_COLUMN_WIDTH:   15,        //Looks silly on less than this
    MAX_COLUMN_WIDTH:   50,
    MIN_CARD_WIDTH: 200,
    LOAD_STORE_MAX_RECORDS: 100, //Can blow up the Rally.data.wsapi.filter.Or
    WARN_STORE_MAX_RECORDS: 300, //Can be slow if you fetch too many
    NODE_CIRCLE_SIZE: 8,                //Pixel radius of dots
    NOT_SET_STRING: '! Not Set !',
    
    _gridMargin: {top: 120, right: 450, bottom: 1000, left: 120},   //Leave a huge space at the bottom for a huge colour legend

    //To be able to show a RAGStatus, you must have some fields in the artefact for severiry, probability and status
    //The values of these fields must match the RISKColour and AIDColour routines in this file.
    RAIDseverityField: 'c_RAIDSeverityCriticality',
    RAIDprobabilityField: 'c_RISKProbabilityLevel',
    RAIDstatusField: 'c_RAIDRequestStatus',   

    STORE_FETCH_FIELD_LIST: [
        'Blocked',
        'BlockedReason',
        'Children',
        'CreationDate',
        'Description',
        'DisplayColor',
        'DragAndDropRank',
        'FormattedID',
        'Iteration',
        'Milestones',
        'Name',
        'Notes',
        'ObjectID',
        'OrderIndex',   //Used to get the State field order index
        'Ordinal',
        'Owner',
        'Parent',
        'PercentDoneByStoryCount',
        'PercentDoneByStoryPlanEstimate',
        'PortfolioItemType',                
        'Predecessors',
        'PredecessorsAndSuccessors',                
        'PreliminaryEstimate',
        'PreliminaryEstimateValue',
        'Project',
        'Ready',
        'Release',
        'RevisionHistory',
        'State',
        'Successors',
        'Tags',
        'UserName',
        'Workspace',
        //Customer specific after here. Delete as appropriate
        'c_ProjectIDOBN',
        'c_QRWP',
        'c_ProgressUpdate',
        'c_RAIDSeverityCriticality',
        'c_RISKProbabilityLevel',
        'c_RAIDRequestStatus',
        'c_RAIDDueDate'   
    ],

    CARD_DISPLAY_FIELD_LIST: [
        'Name',
        'Owner',
        'PreliminaryEstimate',
        'Parent',
        'Project',
        'PercentDoneByStoryCount',
        'PercentDoneByStoryPlanEstimate',
        'PredecessorsAndSuccessors',                
        'State',
        'Milestones',
        'Release',
        //Customer specific after here. Delete as appropriate
        'c_ProjectIDOBN',
        'c_QRWP'

    ],

    SIZEFIELD: 'PreliminaryEstimateValue',

    items: [
        {
            xtype: 'container',
            itemId: 'rootSurface',
//            margin: '5 5 5 5',
            layout: 'auto',
            title: 'Loading...',
            autoEl: {
                tag: 'svg'
            },
            listeners: {
                afterrender:  function() {  gApp = this.up('#rallyApp'); gApp._onElementValid();},
            },
            visible: false
        }
    ],
    //Set the SVG area to the surface we have provided
    _setSVGSize: function() {
        var colSize = Math.min( 800/gApp._nodes.length, gApp.MAX_COLUMN_WIDTH);
        gApp._gridSize = Math.max(colSize, gApp.MIN_COLUMN_WIDTH) * gApp._nodes.length;

        console.log('Grid sizing: ', gApp._gridSize);
        
        var svg = d3.select('svg');
        
        svg.attr('width', gApp._gridSize + gApp._gridMargin.left + gApp._gridMargin.right);
        svg.attr('height',gApp._gridSize + gApp._gridMargin.top + gApp._gridMargin.bottom);

        svg.selectAll('#titleText').remove();
        var xAxis = svg.append('g').attr('id', 'titleText');
        var yAxis = svg.append('g').attr('id', 'titleText');
        
        yAxis.attr("transform", "rotate(-90)")
            .append("text")
                .attr("x", -gApp._gridMargin.top)
                .attr("y", gApp._gridMargin.left/4)
                .attr("dy", ".32em")
                .attr("text-anchor", "end")
                .text(function() { return gApp._nodes.length + ' ' + gApp.down('#piType').rawValue + (gApp._nodes.length !== 1 ? 's' : '') + " selected";});
    
        xAxis.append("text")
                .attr("x", gApp._gridMargin.left)
                .attr("y", gApp._gridMargin.top/4)
                .attr("dy", ".32em")
                .attr("text-anchor", "start")
                .text("Predecessors");

    },

    _setUpGrid: function(num) {  

        console.log('Grid request for: ', num, ' items');
        var svg = d3.select('svg');

        //Start with ordered by FormattedID
        x.domain(gApp._sortOrders[gApp.down('#sortOrder').rawValue]());
//        x.domain(gApp.down('#sortOrder').value());        
        
        if (num > 0) {

            gApp._svg = svg.append('g')
                .attr("id","grid")
                .attr("transform", "translate(" + gApp._gridMargin.left + "," + gApp._gridMargin.top + ")")
                .attr("width", gApp._gridSize)
                .attr("height", gApp._gridSize);

            gApp._svg.append("rect")
                .style("margin-left", -gApp._gridMargin.left + "px")
                .attr("class", "background")
                .attr("width", gApp._gridSize)
                .attr("height", gApp._gridSize);

            var column = gApp._svg.selectAll(".column")
                .data(gApp._matrix)
                .enter().append("g")
                .attr("class", "column")
                .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
        
            column.append("line")
                .attr("x1", -gApp._gridSize);
        
            column.append("text")
                .attr("id", "titleText")
                .attr("x", 6)
                .attr("y", x.bandwidth() / 2)
                .attr("dy", ".32em")
                .attr("text-anchor", "start")
                .attr("class",  "hyperlinkText")
                .on("mouseover", gApp._textMouseOver)
                .on("mouseout", gApp._textMouseOut)
                .on("click", function(node, index, array) { gApp._nodeClick(node,index,array);})                
                .text(function(d, i) { return gApp._nodes[i].Name; });
            
            //Add colour legend to end of grid
            gApp._redrawColourLegend();
        }    
        else { 
            gApp._showNoDependencies();
        }
        
        
    },

    //When the grouping changes, need to redraw the legend
    _redrawColourLegend: function() {
        var legend = d3.selectAll('#colourLegend');
        if (legend) { legend.remove();}
        gApp._addColourLegend();

    },

    _addColourLegend: function() {
        gApp._svg.append('g')
            .attr("id", 'colourLegend')
            .attr("transform", function() { 
                return "translate(0," + gApp._gridSize + ")";
            })
            .selectAll('.legend')
            .data(gApp.down('#grouping').value.allTypesFn())
            .enter().append('g')
            .attr("class", 'legend')
            .attr("transform", function(d,i) { return "translate(0," + (x.bandwidth() * (i+1)) + ")";});

        d3.selectAll('.legend').append("circle")
            .attr('r', x.bandwidth()/4)
            .attr("fill", function(d,i) { return gApp.down('#grouping').value.getColourOfIndexFn(i);});

        d3.selectAll('.legend').append("text")
            .attr("x", x.bandwidth()/4 + 20)
            .attr("text-anchor", "start")
            .text( function(d,i) {
                return gApp.down('#grouping').value.allLabelsFn()[i];
        });
    },

    _nodeTree: null,
    
    _destroyAxes: function() {
        d3.selectAll('#titleText').remove();
    },

    _destroyGrid: function() {
        d3.select("#grid").remove();
    },

    _showNoDependencies: function() {
        d3.select('svg')
            .append('g')
            .attr("id", "grid")
            .attr('transform', 'translate( ' + gApp._gridMargin.left + ',' + gApp._gridMargin.top + ')' )
                .append('text')
                    .text('No dependencies found for your items in selection criteria')
                    .attr('text-anchor','start')
                    .attr("class", 'boldText');
    },

    _getGroupFor: function(record) {
        var selectedgrouping = gApp.down('#grouping').value;
        var grouping = selectedgrouping.getIndexFor(record);
        return grouping;
    },

    //Continuation point after selectors ready/changed
    _enterMainApp: function() {
        gApp._destroyGrid();
        gApp._drawGrid();
    },

    _setNodeGroups: function() {
        gApp._nodes.forEach(function(node) {
            node.group = gApp._getGroupFor(node.record);
        });
    },

    _recolourNodes: function() {
        gApp._setNodeGroups();
        gApp._colourSVGItems();
    },

    _drawGrid: function(){
        gApp._matrix = [];
        var n = gApp._nodes.length;

        //Set the svg area to the required size
        this._setSVGSize(n);
        
        // Compute index per node.
        gApp._nodes.forEach(function(node, i) {
            node.index = i;
            node.count = 0;
            gApp._matrix[i] = d3.range(n).map(function(j) { return {x: i, y: j, z: 0}; });
            gApp._matrix[i].index = i;
        });

        gApp._setNodeGroups();

        //Dependending on grouping, we need to adapt the colouring. Let these slide out to globals
        x = d3.scaleBand().range([0, gApp._gridSize]);  //Scale everything to the grid
        z = d3.scaleLinear().domain([0, 1]).clamp(true);    //Allow for degrees of opacity on number of dependencies

//            c = d3.scaleOrdinal(d3.schemeCategory20).domain(d3.range(n));
            c = d3.scaleOrdinal(gApp.colourMap).domain([0, gApp.colourMap.length]);

        //Get grid ready for drawing
        gApp._setUpGrid(n);

        var deferred = [];

        //Now for each node, add a value to the matrix for the dependency
        gApp._nodes.forEach(function(node){
            var cnf;
            if (node.record && node.record.data.Predecessors && node.record.data.Predecessors.Count){
                //Now we need to find the Predecessor details and dynamically fill in the matix
                cnf = Ext.clone(
                {
                    fetch: true,
                    callback: function (records, operation, success) {
                        if (success) {
                            _.each(records, function(record){

                                var i = gApp._findNodeIndexByRef(gApp._nodes, node.record.data._ref);
                                var j = gApp._findNodeIndexByRef(gApp._nodes, record.data._ref);
                                if ( j < 0 ) {  // Record is outside those selected
                                    gApp._matrix[i].error = 1;
                                } else {
                                    gApp._matrix[i][j].count = gApp._matrix[i][j].count ? gApp._matrix[i][j].count += 1 : 1;
                                    gApp._matrix[i][j].z += record.get(gApp.SIZEFIELD) || 1;    //If not set, clamp to the 'min'
                                }

                            });
                        }
                    }
                });
                deferred.push(node.record.getCollection('Predecessors').load(cnf));
            }

            //We need to check if there are successors and make label blink if it is somewhere else.
            if (node.record && node.record.data.Successors && node.record.data.Successors.Count){
                //Now we need to find the Predecessor details and dynamically fill in the matix
                cnf = Ext.clone(
                {
                    fetch: true,
                    callback: function (records, operation, success) {
                        if (success) {
                            _.each(records, function(record){

                                var j = gApp._findNodeIndexByRef(gApp._nodes, node.record.data._ref);
                                var i = gApp._findNodeIndexByRef(gApp._nodes, record.data._ref);
                                if ( i < 0 ) {  // Record is outside those selected
                                    gApp._matrix[j].error = 1;
                                // } else {
                                //     gApp._matrix[i][j].count = gApp._matrix[i][j].count ? gApp._matrix[i][j].count += 1 : 1;
                                //     gApp._matrix[i][j].z += record.get(gApp.SIZEFIELD) || 1;    //If not set, clamp to the 'min'
                                }

                            });    
                        }
                    }
                });
                deferred.push(node.record.getCollection('Successors').load(cnf));
            }
        });

        if (deferred.length > 0) {
            Deft.Promise.all(deferred, gApp).then({
                success: function() {
                    gApp._refreshGrid();
                }
            });
        }
        else {
            gApp._refreshGrid();
        }

    },

    _createGroupings: function () {
        if ( gApp.down('#piType').getRecord().get('Ordinal') === 0 ){
            gApp._groupings.push( 
            {
                groupTitle: 'Release',
                groupFunctions: {
                    allLabelsFn: function() {
                        return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Release')? node.record.get('Release').Name : gApp.NOT_SET_STRING;}));
                    },
                    allTypesFn: function() {
                        return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Release')? node.record.get('Release').Name : gApp.NOT_SET_STRING;}));
                    },
                    
                    allColoursFn: function() {
                        return gApp.colourMap;
                    },
                    getColourOfIndexFn: function(index) {
                        return gApp.colourMap[index];
                    },
                    getNameOfIndexFn: function(index) {
                        return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Release')?node.record.get('Release').Name: gApp.NOT_SET_STRING ;}))[index];
                    },
                    getTypeOfIndexFn: function(index) {
                        return gApp._nodes[index].record.get('Release').Name;
                    },
                    getIndexFor: function(record) {
                        return _.indexOf( gApp.down('#grouping').value.allTypesFn(), record.get('Release')?record.get('Release').Name : gApp.NOT_SET_STRING);
                    }
                }
        
            });
        }
    },

    _groupings: [
        {
            groupTitle: 'Parent',
            groupFunctions: {
                allLabelsFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Parent')?node.record.get('Parent').Name: gApp.NOT_SET_STRING ;}));
                },
                allTypesFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Parent')?node.record.get('Parent').ObjectID : gApp.NOT_SET_STRING;}));
                },
                
                allColoursFn: function() {
                    return gApp.colourMap;
                },
                getColourOfIndexFn: function(index) {
                    return gApp.colourMap[index];
                },
                getNameOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Parent')?node.record.get('Parent').Name: gApp.NOT_SET_STRING; }))[index];
                },
                getTypeOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Parent')?node.record.get('Parent').ObjectID: gApp.NOT_SET_STRING; }))[index];
                },
                getIndexFor: function(record) {
                    return _.indexOf( gApp.down('#grouping').value.allTypesFn(), record.get('Parent')?record.get('Parent').ObjectID:gApp.NOT_SET_STRING);
                }
            }

        },
        {
            //Currently state is deduced from the values found in the nodes. Future work needed to make it fetch the
            // full list of values (in the right order)from the server.

            groupTitle: 'State',
            groupFunctions: {
                allLabelsFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('State') ? node.record.get('State').Name : gApp.NOT_SET_STRING;}));
                },
                allTypesFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('State')?node.record.get('State').Name : gApp.NOT_SET_STRING;}));
                },
                
                allColoursFn: function() {
                    return gApp.colourMap;
                },
                getColourOfIndexFn: function(index) {
                    return gApp.colourMap[index];
                },
                getNameOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('State') ? node.record.get('State').Name : gApp.NOT_SET_STRING;}))[index];
                },
                getTypeOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('State') ? node.record.get('State').Name : gApp.NOT_SET_STRING;}))[index];
                },
                getIndexFor: function(record) {
                    return _.indexOf( gApp.down('#grouping').value.allTypesFn(), record.get('State')?record.get('State').Name : gApp.NOT_SET_STRING);
                }
            }
    
        },
        {
            //Currently state is deduced from the values found in the nodes. Future work needed to make it fetch the
            // full list of values (in the right order)from the server.

            groupTitle: 'User',
            groupFunctions: {
                allLabelsFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Owner') ? node.record.get('Owner').UserName : gApp.NOT_SET_STRING;}));
                },
                allTypesFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Owner')?node.record.get('Owner')._refObjectName : gApp.NOT_SET_STRING;}));
                },
                
                allColoursFn: function() {
                    return gApp.colourMap;
                },
                getColourOfIndexFn: function(index) {
                    return gApp.colourMap[index];
                },
                getNameOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Owner') ? node.record.get('Owner').UserName : gApp.NOT_SET_STRING;}))[index];
                },
                getTypeOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Owner') ? node.record.get('Owner')._refObjectName : gApp.NOT_SET_STRING;}))[index];
                },
                getIndexFor: function(record) {
                    return _.indexOf( gApp.down('#grouping').value.allTypesFn(), record.get('Owner')?record.get('Owner')._refObjectName : gApp.NOT_SET_STRING);
                }
            }
    
        },
        {
            //Currently state is deduced from the values found in the nodes. Future work needed to make it fetch the
            // full list of values (in the right order)from the server.

            groupTitle: 'Project',
            groupFunctions: {
                allLabelsFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Project')._refObjectName; }));
                },
                allTypesFn: function() {
                    return _.uniq(_.pluck(gApp._nodes, function(node) { return node.record.get('Project')._refObjectName; }));
                },
                
                allColoursFn: function() {
                    return gApp.colourMap;
                },
                getColourOfIndexFn: function(index) {
                    return gApp.colourMap[index];
                },
                getNameOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) {  return node.record.get('Project')._refObjectName; }))[index];
                },
                getTypeOfIndexFn: function(index) {
                    return _.uniq(_.pluck(gApp._nodes, function(node) {  return node.record.get('Project')._refObjectName; }))[index];
                },
                getIndexFor: function(record) {
                    return _.indexOf( gApp.down('#grouping').value.allTypesFn(), record.get('Project').Name );
                }
            }
    
        },        
        
        {
            groupTitle: '% Done By Story Plan Estimate',
            groupFunctions: {
                allLabelsFn: function() {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n.label; });
                },
                allTypesFn: function() {
                    return Object.keys(Rally.util.HealthColorCalculator.colors);
                },
                
                allColoursFn: function() {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n.hex; });
                },
                getColourOfIndexFn: function(index) {
                    return Object.values(Rally.util.HealthColorCalculator.colors)[index].hex;
                },
                getNameOfIndexFn: function(index) {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n.label; })[index] ;
                },
                getTypeOfIndexFn: function(index) {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n; })[index] ;
                },
                getIndexFor: function(record) {
                    //return Object.keys(Rally.util.HealthColorCalculator.calculateHealthColorForPortfolioItemData(record,'PercentDOneByStoryCount'));
                    return Object.values(Rally.util.HealthColorCalculator.colors).indexOf(
                        Rally.util.HealthColorCalculator.calculateHealthColorForPortfolioItemData(record.data,'PercentDoneByStoryPlanEstimate'));
                }
            }
        },
        {
            groupTitle: '% Done By Story Count',
            groupFunctions: {
                allLabelsFn: function() {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n.label; });
                },
                allTypesFn: function() {
                    return Object.keys(Rally.util.HealthColorCalculator.colors);
                },
                
                allColoursFn: function() {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n.hex; });
                },
                getColourOfIndexFn: function(index) {
                    return Object.values(Rally.util.HealthColorCalculator.colors)[index].hex;
                },
                getNameOfIndexFn: function(index) {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n.label; })[index] ;
                },
                getTypeOfIndexFn: function(index) {
                    return _.pluck(Rally.util.HealthColorCalculator.colors, function(n) { return n; })[index] ;
                },
                getIndexFor: function(record) {
                    //return Object.keys(Rally.util.HealthColorCalculator.calculateHealthColorForPortfolioItemData(record,'PercentDOneByStoryCount'));
                    return Object.values(Rally.util.HealthColorCalculator.colors).indexOf(
                        Rally.util.HealthColorCalculator.calculateHealthColorForPortfolioItemData(record.data,'PercentDoneByStoryCount'));
                }
            }
        }

    // {
        //     groupTitle: 'Null Set',
        //     groupFunctions: {
        //         allLabelsFn: function() {
        //             return [ gApp.NOT_SET_STRING];
        //         },
        //         allTypesFn: function() {
        //             return [ gApp.NOT_SET_STRING];
        //         },
                
        //         allColoursFn: function() {
        //             return ['#000000'];
        //         },
        //         getColourOfIndexFn: function(index) {
        //             return '#000000';
        //         },
        //         getNameOfIndexFn: function(index) {
        //             return gApp.NOT_SET_STRING;
        //         },
        //         getTypeOfIndexFn: function(index) {
        //             return gApp.NOT_SET_STRING;
        //         },
        //         getIndexFor: function(record) {
        //             return 0
        //         }
        //     }
        // }
    ],

    _sortOrders: {
        FormattedID:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { return d3.ascending(gApp._nodes[a].record.get('ObjectID'), gApp._nodes[b].record.get('ObjectID')); });
        },

        Name:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { return d3.ascending(gApp._nodes[a].record.get('Name'), gApp._nodes[b].record.get('Name')); });
        },

        PreliminaryEstimateValue:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { return d3.descending(gApp._nodes[a].record.get('PreliminaryEstimateValue'), gApp._nodes[b].record.get('PreliminaryEstimateValue')); });
        },
        Release:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { 
                var al = gApp._nodes[a].record.get('Release') ? gApp._nodes[a].record.get('Release')._refObjectName : gApp.NOT_SET_STRING;
                var bl = gApp._nodes[b].record.get('Release') ? gApp._nodes[b].record.get('Release')._refObjectName : gApp.NOT_SET_STRING;
                return d3.descending(al,bl); });
        },
        Parent:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { 
                var al = gApp._nodes[a].record.get('Parent') ? gApp._nodes[a].record.get('Parent')._refObjectName : gApp.NOT_SET_STRING;
                var bl = gApp._nodes[b].record.get('Parent') ? gApp._nodes[b].record.get('Parent')._refObjectName : gApp.NOT_SET_STRING;
                return d3.descending(al,bl); });
        },
        State:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { 
                var al = gApp._nodes[a].record.get('State') ? gApp._nodes[a].record.get('State').OrderIndex : gApp.NOT_SET_STRING;
                var bl = gApp._nodes[b].record.get('State') ? gApp._nodes[b].record.get('State').OrderIndex : gApp.NOT_SET_STRING;
                return d3.ascending(al,bl); });
        },
        PlannedStartDate:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { 
                return d3.ascending(
                    Ext.Date.format(gApp._nodes[a].record.get('PlannedStartDate'), 'U'), 
                    Ext.Date.format(gApp._nodes[b].record.get('PlannedStartDate'), 'U')
                ); 
            });
        },
        PlannedEndDate:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { 
                return d3.ascending(
                    Ext.Date.format(gApp._nodes[a].record.get('PlannedEndDate'), 'U'), 
                    Ext.Date.format(gApp._nodes[b].record.get('PlannedEndDate'), 'U')
                ); 
            });
        },
    },

    _colourSVGItems: function() {
        d3.selectAll(".row #colourBlock")
            .attr("fill", function(d, i) { return gApp.down('#grouping').value.getColourOfIndexFn(gApp._nodes[i].group);});
        d3.selectAll(".row circle")
            .style("fill", function(d) { return gApp.down('#grouping').value.getColourOfIndexFn(gApp._nodes[d.y].group);});
    },

    _refreshGrid: function() {
    
        //Get the current viewBox
        var svg = gApp._svg;
        var width = svg.attr('width');
        var rows = svg.selectAll(".row")
            .data(gApp._matrix)
            .enter().append("g")
            .attr("class", "row")
            .attr("transform", function(d) { return "translate(0," + x(d.index) + ")"; })
            .each(row);
  
        rows.append("line")
            .attr("x2", width)
            .on("click", function() { 
                d3.selectAll("line").attr("stroke-width", 1);
                d3.selectAll("line").attr("opacity", 1);                
                d3.selectAll("line").classed("active", false);
                d3.selectAll("line").attr("y1", 0);        
                d3.selectAll("line").attr("y2", 0);           
            });

        rows.append("text")
            .attr("id", "infoText")
            .attr("x", gApp._gridSize + 10)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "start")
            .text(function(d) { 
                var variable = gApp._nodes[d.index].record.get(gApp.down('#sortOrder').value);
                variable = variable ? variable: gApp.NOT_SET_STRING;
                return variable._refObjectName ? variable._refObjectName : variable;
            });
    
        rows.append("text")
            .attr("id", "titleText")
            .attr("x", -12)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .attr("class", function(d) {
                if (gApp._matrix[d.index].error ) {
                    return "hyperlinkText textBlink";
                }
                else {
                    return "hyperlinkText";
                }
            })
            .on("mouseover", gApp._textMouseOver)
            .on("mouseout", gApp._textMouseOut)
            .on("click", function(node, index, array) { gApp._nodeClick(node,index,array);})            
            .text(function(d) { return gApp._nodes[d.index].Name; });
  
        rows.append("rect")
            .attr('id', 'colourBlock')
            .attr("x", -10)
            .attr("y",1)
            .attr("width", 9)
            .attr("height", x.bandwidth() - 2);

        gApp._colourSVGItems();

        function row(row) {
            d3.select(this).selectAll(".cell")
                .data(row.filter(function(d) { return d.z; }))
                .enter().append("circle")
                .attr("class", "cell")
                .attr("cx", function(d) { return x(d.y) + (x.bandwidth()/2); })
                .attr("cy", function() { return x.bandwidth()/2; })
                .attr("r", (x.bandwidth()/2) * 0.9)
                .style("fill-opacity", function(d) { return z(d.z); })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click", clickit);
        }
    
        function clickit(p) {
            d3.selectAll(".row line").attr("stroke-width", function(d) { return d.index === p.x ? x.bandwidth() : 1; });
            d3.selectAll(".column line").attr("stroke-width", function(d) { return d.index ===p.y ? x.bandwidth() : 1; });
            d3.selectAll(".row line").attr("y1", function(d) { return d.index ===p.x ? x.bandwidth()/2 : 0; });
            d3.selectAll(".row line").attr("y2", function(d) { return d.index ===p.x ? x.bandwidth()/2 : 0; });
            d3.selectAll(".column line").attr("y1", function(d) { return d.index ===p.y ? x.bandwidth()/2 : 0; });
            d3.selectAll(".column line").attr("y2", function(d) { return d.index ===p.y ? x.bandwidth()/2 : 0; });            
            d3.selectAll(".row line").attr("opacity", function(d) { return d.index ===p.x ? 0.2 : 1; });
            d3.selectAll(".column line").attr("opacity", function(d) { return d.index ===p.y ? 0.2 : 1; });
            d3.selectAll(".row line").classed("active", function(d) { return d.index ===p.x ? true : false; });
            d3.selectAll(".column line").classed("active", function(d) { return d.index ===p.y ? true : false; });

        }
        function mouseover(p) {
            var u = [];
            u.push(p);
            var svg = gApp._svg;
            d3.selectAll(".row #titleText").classed("active", function(d) { return d.index ===p.x; });
            d3.selectAll(".column #titleText").classed("active", function(d) { return d.index ===p.y; });
            var hover = svg.selectAll(".hover")
                .data(u)
                .enter()
                .append('g')
                .attr('id', 'hoverBlock')
                .attr("transform", function(d) { return "translate(" + (x(d.y) + x.bandwidth()) + "," + (x(d.x) + x.bandwidth()) + ")"; });
                
            hover.append('rect')
                .attr('stroke', '#202020')
                .attr('stroke-width', 1)
                .attr('width', 430)
                .attr('height',110)
                .attr("fill", '#ffffff');
            hover.append('text')
                .attr('x', 100)
                .attr('y', 10)
                .attr('text-anchor', 'middle')
                .text( gApp.down('#grouping').rawValue + ' info:');

            hover.append('text')
                .attr('x', 10)
                .attr('y', 70)
                .text( function(d) { return 'Successor: ' + gApp._nodes[d.x].record.get('FormattedID');});

            hover.append('text')
                .attr('x', 15)
                .attr('y', 90)
                .text( function(d) { return gApp.down('#grouping').value.getNameOfIndexFn(gApp._nodes[d.x].group).slice(0,80);});
            
            hover.append('text')
                .attr('x', 10)
                .attr('y', 30)
                .text( function(d) { return 'Predecessor: ' + gApp._nodes[d.y].record.get('FormattedID');});
                
            hover.append('text')
                .attr('x', 15)
                .attr('y', 50)
                .text( function(d) { return gApp.down('#grouping').value.getNameOfIndexFn(gApp._nodes[d.y].group).slice(0,80);});
        }
    
        function mouseout() {
            d3.selectAll("text").classed("active", false);
            d3.selectAll("#hoverBlock").remove();
        }
    },
    
    _nodeClick: function (row,index,array) {
        var node = gApp._nodes[index];
        if (!(node.record.data.ObjectID)) {return;} //Only exists on real items
        //Get ordinal (or something ) to indicate we are the lowest level, then use "UserStories" instead of "Children"
        if (event.shiftKey) { 
            gApp._nodePopup(node,index,array); 
        }  else {
            gApp._dataPanel(node,index,array);
        }
    },

    _nodePopup: function(node) {
        Ext.create('Rally.ui.popover.DependenciesPopover',
            {
                record: node.record,
                target: node.card.el
            }
        );
    },

    _dataPanel: function(node, index, array) {        
        var childField = node.record.hasField('Children')? 'Children' : 'UserStories';
        var model = node.record.hasField('Children')? node.record.data.Children._type : 'UserStory';

        Ext.create('Rally.ui.dialog.Dialog', {
            autoShow: true,
            draggable: true,
            closable: true,
            width: 1200,
            height: 800,
            style: {
                border: "thick solid #000000"
            },
            overflowY: 'scroll',
            overflowX: 'none',
            record: node.record,
            disableScroll: false,
            model: model,
            childField: childField,
            title: 'Information for ' + node.record.get('FormattedID') + ': ' + node.record.get('Name'),
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    itemId: 'leftCol',
                    width: 500,
                },
                {
                    xtype: 'container',
                    itemId: 'rightCol',
                    width: 700  //Leave 20 for scroll bar
                }
            ],
            listeners: {
                afterrender: function() {
                    this.down('#leftCol').add(
                        {
                                xtype: 'rallycard',
                                record: this.record,
                                fields: gApp.CARD_DISPLAY_FIELD_LIST,
                                showAge: true,
                                resizable: true
                        }
                    );

                    if ( this.record.get('c_ProgressUpdate')){
                        this.down('#leftCol').insert(1,
                            {
                                xtype: 'component',
                                width: '100%',
                                autoScroll: true,
                                html: this.record.get('c_ProgressUpdate')
                            }
                        );
                        this.down('#leftCol').insert(1,
                            {
                                xtype: 'text',
                                text: 'Progress Update: ',
                                style: {
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                    fontFamily: 'ProximaNova,Helvetica,Arial',
                                    fontWeight: 'bold'
                                },
                                margin: '0 0 10 0'
                            }
                        );
                    }
                    //This is specific to customer. Features are used as RAIDs as well.
                    if ((this.record.self.ordinal === 1) && this.record.hasField('c_RAIDType')){
                        var rai = this.down('#leftCol').add(
                            {
                                xtype: 'rallypopoverchilditemslistview',
                                target: array[index],
                                record: this.record,
                                childField: this.childField,
                                addNewConfig: null,
                                gridConfig: {
                                    title: '<b>Risks and Issues:</b>',
                                    enableEditing: false,
                                    enableRanking: false,
                                    enableBulkEdit: false,
                                    showRowActionsColumn: false,
                                    storeConfig: this.RAIDStoreConfig(),
                                    columnCfgs : [
                                        'FormattedID',
                                        'Name',
                                        {
                                            text: 'RAID Type',
                                            dataIndex: 'c_RAIDType',
                                            minWidth: 80
                                        },
                                        {
                                            text: 'RAG Status',
                                            dataIndex: 'Release',  //Just so that a sorter gets called on column ordering
                                            width: 60,
                                            renderer: function (value, metaData, record) {
                                                var setColour = (record.get('c_RAIDType') === 'Risk') ?
                                                        gApp.RISKColour : gApp.AIDColour;
                                                
                                                    return '<div ' + 
                                                        'class="RAID-' + setColour(node) + 
                                                        '"' +
                                                        '>&nbsp</div>';
                                            },
                                            listeners: {
                                                mouseover: function(gridView,cell,rowIdx,cellIdx,event,record) { 
                                                    Ext.create('Rally.ui.tooltip.ToolTip' , {
                                                            target: cell,
                                                            html:   
                                                            '<p>' + '   Severity: ' + record.get('c_RAIDSeverityCriticality') + '</p>' +
                                                            '<p>' + 'Probability: ' + record.get('c_RISKProbabilityLevel') + '</p>' +
                                                            '<p>' + '     Status: ' + record.get('c_RAIDRequestStatus') + '</p>' 
                                                        });
                                                    
                                                    return true;    //Continue processing for popover
                                                }
                                            }
                                        },
                                        'ScheduleState'
                                    ]
                                },
                                model: this.model
                            }
                        );
                        rai.down('#header').destroy();
                   }
                    var children = this.down('#rightCol').add(
                        {
                            xtype: 'rallypopoverchilditemslistview',
                            target: array[index],
                            record: this.record,
                            width: '95%',
                            childField: this.childField,
                            addNewConfig: null,
                            gridConfig: {
                                title: '<b>Children:</b>',
                                enableEditing: false,
                                enableRanking: false,
                                enableBulkEdit: false,
                                showRowActionsColumn: false,
                                storeConfig: this.nonRAIDStoreConfig(),
                                columnCfgs : [
                                    'FormattedID',
                                    'Name',
                                    {
                                        text: '% By Count',
                                        dataIndex: 'PercentDoneByStoryCount'
                                    },
                                    {
                                        text: '% By Est',
                                        dataIndex: 'PercentDoneByStoryPlanEstimate'
                                    },
                                    {
                                        text: 'Timebox',
                                        dataIndex: 'Project',  //Just so that the renderer gets called
                                        minWidth: 80,
                                        renderer: function (value, metaData, record) {
                                            var retval = '';
                                                if (record.hasField('Iteration')) {
                                                    retval = record.get('Iteration')?record.get('Iteration').Name:'NOT PLANNED';
                                                } else if (record.hasField('Release')) {
                                                    retval = record.get('Release')?record.get('Release').Name:'NOT PLANNED';
                                                } else if (record.hasField('PlannedStartDate')){
                                                    retval = Ext.Date.format(record.get('PlannedStartDate'), 'd/M/Y') + ' - ' + Ext.Date.format(record.get('PlannedEndDate'), 'd/M/Y');
                                                }
                                            return (retval);
                                        }
                                    },
                                    'State',
                                    'PredecessorsAndSuccessors',
                                    'ScheduleState'
                                ]
                            },
                            model: this.model
                        }
                    );
                    children.down('#header').destroy();

                    var cfd = Ext.create('Rally.apps.CFDChart', {
                        record: this.record,
                        width: '95%',
                        container: this.down('#rightCol')
                    });
                    cfd.generateChart();

                }
            },

            //This is specific to customer. Features are used as RAIDs as well.
            nonRAIDStoreConfig: function() {
                if (this.record.hasField('c_RAIDType') ){
                    switch (this.record.self.ordinal) {
                        case 1:
                            return  {
                                filters: {
                                    property: 'c_RAIDType',
                                    operator: '=',
                                    value: ''
                                },
                                fetch: gApp.STORE_FETCH_FIELD_LIST,
                                pageSize: 50
                            };
                        default:
                            return {
                                fetch: gApp.STORE_FETCH_FIELD_LIST,
                                pageSize: 50
                            };
                    }
                }
                else {
                    return {
                        fetch: gApp.STORE_FETCH_FIELD_LIST,
                        pageSize: 50                                                    
                    };
                }
            },

            //This is specific to customer. Features are used as RAIDs as well.
            RAIDStoreConfig: function() {
                if (this.record.hasField('c_RAIDType')){
                            return {
                                filters: [{
                                    property: 'c_RAIDType',
                                    operator: '!=',
                                    value: ''
                                }],
                                fetch: gApp.STORE_FETCH_FIELD_LIST,
                                pageSize: 50
                            };
                    }
                else {
                    return {
                        fetch: gApp.STORE_FETCH_FIELD_LIST,
                        pageSize: 50
                    };
                }
            },
        });
    },

    RISKColour: function(node) {
        var severity = node.record.get(gApp._RAIDseverityField), 
            probability = node.record.get(gApp._RAIDprobabilityField), 
            state = node.record.get(gApp._RAIDstateField);

        if ( state === 'Closed' || state === 'Cancelled') {
            return 'Blue';
        }

        if (severity === 'Exceptional') {
            return 'Red';
        }

        if (severity ==='High' && (probability === 'Likely' || probability === 'Certain'))
        {
            return 'Red';
        }

        if (
            (severity ==='High' && (probability === 'Unlikely' || probability === 'Possible')) ||
            (severity ==='Moderate' && (probability === 'Likely' || probability === 'Certain'))
        ){
            return 'Amber';
        }
        if (
            (severity ==='Moderate' && (probability === 'Unlikely' || probability === 'Possible')) ||
            (severity ==='Low')
        ){
            return 'Green';
        }
        
        return 'Black';
    },

    AIDColour: function(severity, probability, state) {
        if ( state === 'Closed' || state === 'Cancelled') {
            return 'Blue';
        }

        if (severity === 'Exceptional') 
        {
            return 'Red';
        }

        if (severity === 'High') 
        {
            return 'Amber';
        }

        if ((severity === 'Moderate') ||
            (severity === 'Low')
        ){
            return 'Green';                    
        }
        return 'Black'; //Mark as unknown
    },

    _textMouseOver: function(row, index) {
        var node = gApp._nodes[index];
        if (!(node.record.data.ObjectID)) {
            //Only exists on real items, so do something for the 'unknown' item
            return;
        } else {

            if ( !node.card) {
                var card = Ext.create('Rally.ui.cardboard.Card', {
                    'record': node.record,
                    fields: gApp.CARD_DISPLAY_FIELD_LIST,
                    constrain: false,
                    width: gApp.MIN_CARD_WIDTH,
                    height: 'auto',
                    floating: true, //Allows us to control via the 'show' event
                    shadow: false,
                    showAge: true,
                    resizable: true,
                    // listeners: {
                    //     show: function(card){
                    //         //Move card to one side, preferably closer to the centre of the screen
                    //         var xpos = array[index].getScreenCTM().e - gApp.MIN_CARD_WIDTH;
                    //         var ypos = array[index].getScreenCTM().f;
                    //         card.el.setLeftTop( (xpos - gApp.MIN_CARD_WIDTH) < 0 ? xpos + gApp.MIN_CARD_WIDTH : xpos - gApp.MIN_CARD_WIDTH, 
                    //             (ypos + this.getSize().height)> gApp.getSize().height ? gApp.getSize().height - (this.getSize().height+20) : ypos);  //Tree is rotated
                    //     }
                    // }
                });
                node.card = card;
            }
            node.card.show();
            node.card.setPosition(this.getScreenCTM().e, this.getScreenCTM().f);
        }
    },

    _textMouseOut: function(row, index) {
        var node = gApp._nodes[index];
        node.card.hide();
    },

    _reOrder: function() {
        x.domain(gApp._sortOrders[gApp.down('#sortOrder').rawValue]());
        var grid = d3.select("#grid");
        
        var t = grid.transition().duration(2500);
        
        t.selectAll(".row")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
            .selectAll(".cell")
            .delay(function(d) { return x(d.y) * 4; })
            .attr("x", function(d) { return x(d.y); })      // For text and lines
            .attr("cx", function(d) { return x(d.y) + (x.bandwidth()/2); });    //For circles

        t.selectAll(".column")
            .delay(function(d, i) { return x(i) * 4; })
            .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

        grid.selectAll('#infoText').each( function (d) { 
            var variable = gApp._nodes[d.index].record.get(gApp.down('#sortOrder').value);
            variable = variable ? variable: gApp.NOT_SET_STRING;
            this.innerHTML = variable._refObjectName ? variable._refObjectName : variable;
        });
    },
    
    //Entry point after creation of render box
    _onElementValid: function() {
        //Add any useful selectors into this container ( which is inserted before the rootSurface )
        //Choose a point when all are 'ready' to jump off into the rest of the app
        this.insert (0,{
            xtype: 'container',
            itemId: 'headerBox',
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    itemId: 'filterBox'
                },
                {
                    xtype:  'rallyportfolioitemtypecombobox',
                    itemId: 'piType',
                    fieldLabel: 'Choose Portfolio Type :',
                    stateful: true,
                    stateId: this.getContext().getScopedStateId('portfolioitemtype'),
                    context: this.getContext(),
                    labelWidth: 100,
                    margin: '5 0 5 20',
                    storeConfig: {
                        sorters: {
                            property: 'Ordinal',
                            direction: 'ASC'
                        },
                        fetch: true
                    },
                    listeners: {
                        select: function() { gApp._kickOff();}    //Jump off here to add portfolio size selector
                    }
                },
            ]
        });
        
    },
    numStates: [],

    _onFilterReady: function(inlineFilterPanel) {
        gApp.insert(1,inlineFilterPanel);
    },

    _onFilterChange: function(inlineFilterButton) {
        gApp._filterInfo = inlineFilterButton.getTypesAndFilters();
        gApp._fireFilterPanelEvent();
    },

    _nodes: [],
    _filterPanel: false,

    //We don't want the initial setup firing of the event
    _fireFilterPanelEvent: function() {
        if (!gApp._filterPanel) {
            gApp._filterPanel = true;
        }
        else {
            gApp._kickOff();
        }
    },

    onSettingsUpdate: function() {
        if ( gApp._nodes) { gApp._nodes = [];}
        gApp._destroyAxes();
        gApp._getArtifacts( gApp.down('#piType'));
    },

    _kickOff: function() {

        gApp._setColourMap(_.find( gApp.cmArray, function(d) { return d.mapTitle === (gApp.getSetting('mapSelector') || gApp.DEFAULT_MAP_NAME);}));
        gApp._createGroupings();

        var ptype = gApp.down('#piType');
        gApp._typeStore = ptype.store;
        var hdrBox = gApp.down('#headerBox');

        var sortFuncs = Object.keys(gApp._sortOrders).map(function(key) { return [ key, key];});
//        var sortFuncs = Object.keys(gApp._sortOrders).map(function(key) { return [ gApp._sortOrders[key], key];});
        if ( !gApp.down('#sortOrder')){
            hdrBox.add(
                {
                    xtype: 'rallycombobox',
                    stateful: true,
                    stateId: this.getContext().getScopedStateId('sortorder'),
                    context: this.getContext(),
                    margin: '10 0 5 20',
                    itemId: 'sortOrder',
                    fieldLabel: 'Sort Order :',
                    labelWidth: 100,
                    store: sortFuncs,
                    listeners: {
                        select: function() {
                            gApp._reOrder();
                        }
                    }
                }
            );
        }

        var groupFuncs = _.map( gApp._groupings, function(group) {
            return [group.groupFunctions, group.groupTitle];
        });

        if ( !gApp.down('#grouping')){
            hdrBox.add(
                {
                    xtype: 'rallycombobox',
                    margin: '10 0 5 20',
                    itemId: 'grouping',
                    stateful: true,
                    stateId: this.getContext().getScopedStateId('grouporder'),
                    context: this.getContext(),
                    fieldLabel: 'Colour Group :',
                    labelWidth: 100,
                    store: groupFuncs,
                    listeners: {
                        select: function() {
//                            gApp._destroyAxes();
                            gApp._redrawColourLegend();
                            gApp._recolourNodes();
//                            gApp._getArtifacts(ptype);                            
                        }
                    }
                }
            );
        }

        if (!gApp.down('#infoButton')){
                hdrBox.add( {
                xtype: 'rallybutton',
                itemId: 'infoButton',
                margin: '10 0 5 20',
                align: 'right',
                text: 'Page Info',
                handler: function() {
                    Ext.create('Rally.ui.dialog.Dialog', {
                        autoShow: true,
                        draggable: true,
                        closable: true,
                        width: 500,
                        autoScroll: true,
                        maxHeight: 600,
                        title: 'Information about this app',
                        items: {
                            xtype: 'component',
                            html: 
                            '<p class="boldText">Dependency Grid</p>' +
                            '<p>This app will find all the items of a particular Portfolio artefact type in your chosen node,' +
                            ' then lay out a two dimensional grid if any of them have dependencies.</p>' +
                            '<p class="boldText">Exploring the data</p>' +
                            '<p>For every item you have asked for, the app will place a row on the grid. The row will contain two important places to focus on: </p>' +
                            '<li>the circle(s) in the row ' +
                            '<p>Circles are drawn when there is a predecessor relationship. The colour of the circle is to categorise the predecessor information. ' + 
                            'This colour can be compared to the colour band to the left which uses the same algorithm to colour for the main item</p>' +
                            '<p>The categorisation method can be selected via the drop-down marked as "Colour Group". </p>' +
                            '<p>By default, the sorting across the grid (and hence down the grid) is set to the item ID. If you select a different sort order, the grid will be ' + 
                            'rearranged. E.g, if you select "Name", the items will be arranged alphabetically on the title of the item. The information used for the sort order will be shown to the right of the row</p>' +
                            '<p>Hovering over a circle will highlight the item names at the top and to the left in red. You can then go to the name and click on it to go to the data panel for that item</p>' +
                            '<p>Hovering over the circles in the rows will also give you the information for the Predecessor and Successor based on the Grouping you have chosen in the header bar</p>' +
                            '<p>If you click on the circle, the app will add highlight to the row and column until you click on another circle (either a different one or the same one) to aid with finding the right items in a large grid</p>' +
                            '</li>' +
                            '<li>the FormattedID to the left' +
                            '<p>If the FormattedID is not blinking, then look across the row for a circle. The circle indicates the column for the predecessor. If there are no circles, ' + 
                                'then the FormattedID you are looking at has a Successor which is part of these items</p>' +
                            '<p>If the FormattedID is blinking, then there is one (or more) dependencies (Predecessor or Successor) that is not in these items.' + 
                            ' Once again, Predecessors that are known about are shown as circles</p>' +
                            '<p>Clicking on the FormattedID text will bring up the data panel showing you more info about that Portfolio Item</p>' +
                            '<p>Shift-Click on the FormattedID will give you a pop-up with just the dependencies on</p>' +
                            '</li>' +
                            // '<p></p>' +
                            '<p class="boldText">Filtering</p>' +
                            '<p>The app options will allow you to minimise the number of columns and rows by only showing those with dependencies - giving a more focussed view</p>' +
                           '<p>There are app settings to enable the extra filtering capabilities on the main page, so that you can choose which portfolio items to see' +
                           ' e.g. filter on Owner, Investment Type, etc. </p><p>You can use the advanced filter to show you items in a particular Program Increment. Remember: if there are dependencies ' + 
                           'from Successor to a Predecessor that was not in the filtered selection, the Successors name to the left will blink slowly.This means if you have items ' + 
                           'in your node that are not in the Release you have filtered for, you will not see them and the FormattedID may still blink</p>' +
                            '<p>Source code available here: <br/><a href=https://github.com/nikantonelli/DependencyGrid> Github Repo</a></p>',
                        padding: 10
                        }
                    });
                }
            } );
            //Create a dropdown for the sort order
        }

        if (!gApp._filterPanel){
            gApp._addFilterPanel();
        }

        gApp._getArtifacts(ptype);
    },

    _addFilterPanel: function() {
            var hdrBox = gApp.down('#headerBox');
            //Add a filter panel
            var blackListFields = ['Successors', 'Predecessors', 'DisplayColor'],
                whiteListFields = ['Milestones', 'Tags'];
            var modelNames = [];
            for ( var i = 0; i <= gApp._highestOrdinal(); i++){
                modelNames.push(gApp._getModelFromOrd(i));
            }
            hdrBox.add({
                xtype: 'rallyinlinefiltercontrol',
                itemId: 'filterPanel',
                context: this.getContext(),
                margin: '5 0 0 60',
                height: 26,
                inlineFilterButtonConfig: {
                    stateful: true,
                    stateId: this.getContext().getScopedStateId('inline-filter'),
                    context: this.getContext(),
                    modelNames: modelNames,
                    filterChildren: false,
                    inlineFilterPanelConfig: {
                        quickFilterPanelConfig: {
                            defaultFields: ['ArtifactSearch', 'Owner'],
                            addQuickFilterConfig: {
                                blackListFields: blackListFields,
                                whiteListFields: whiteListFields
                            }
                        },
                        advancedFilterPanelConfig: {
                            advancedFilterRowsConfig: {
                                propertyFieldConfig: {
                                    blackListFields: blackListFields,
                                    whiteListFields: whiteListFields
                                }
                            }
                        }
                    },
                    listeners: {
                        inlinefilterchange: this._onFilterChange,
                        inlinefilterready: this._onFilterReady,
                        scope: this
                    }
                }
            });
    },

    _getArtifacts: function(ptype) {
    console.log('Getting artifacts from project: ', this.getContext().getProject()._refObjectName);
        //On re-entry remove all old stuff
        if ( gApp._nodes) {gApp._nodes = [];}
        if (gApp._nodeTree) {
            d3.select("#tree").remove();
            gApp._nodeTree = null;
        }
        //Starting with lowest selected by the combobox, go up
        var typeRecord = ptype.getRecord();
        var modelNumber = typeRecord.get('Ordinal');
        var typeRecords = ptype.store.getRecords();
        gApp._loadStoreLocal( typeRecords[modelNumber].get('TypePath')).then({
            success: function(dataArray) {
                if (dataArray.length >= gApp.WARN_STORE_MAX_RECORDS) {
                    Rally.ui.notify.Notifier.showWarning({message: 'Excessive limit of first level records. Narrow your scope '});
                }
                console.log('Adding ' + typeRecords[modelNumber].get('TypePath') + ' nodes: ', dataArray);
                gApp._nodes = gApp._nodes.concat(gApp._createNodes(dataArray)); //These will have their local variable set true.
                gApp._enterMainApp();
            },
            failure: function(error) {
                console.log("Failed to load a store", error.error.errors);
            }
        });
    },


    _loadStoreLocal: function(modelName) {
        
        var filters = '';

        var advFilters = [];
        var hideFilters = [];

        var storeConfig = {
            model: modelName,
            limit: 20000,
            fetch:  gApp.STORE_FETCH_FIELD_LIST,
            filters: [],
            sorters: [
                {
                    property: 'Rank',
                    direction: 'ASC'
                }
            ]
        };

        if ( gApp.getSetting('onlyDependencies') === true){
            filters = Rally.data.wsapi.Filter.or([
                { property: 'Predecessors.ObjectID', operator: '!=', value: null },
                { property: 'Successors.ObjectID', operator: '!=', value: null }
            ]).toString();
        }

        if (gApp._filterInfo && gApp._filterInfo.filters.length) {
            advFilters = gApp._filterInfo.filters.toString();
            storeConfig.models = gApp._filterInfo.types;
            if (filters.length) {
                filters = '(' + advFilters + ' AND ' + filters + ')';
            } else {
                filters = advFilters;
            }
        }

        if (gApp.getSetting('hideArchived') === true) {
            hideFilters = Ext.create('Rally.data.wsapi.Filter', {
                property: 'Archived',
                operator: '=',
                value: false
            }).toString();
            if (filters.length) {
                filters = '(' + hideFilters + ' AND ' + filters + ')';
            } else {
                filters = hideFilters;
            }
        }

        console.log('Fetching using filters: ', filters);        

        if (filters.length > 0) {
            storeConfig.filters = Rally.data.wsapi.Filter.fromQueryString( filters );
        }
        
        var store = Ext.create('Rally.data.wsapi.Store', storeConfig);
        return store.load();
    },

    //Load some artifacts from the global arena as a promise
    _loadStoreGlobal: function(modelName, globalItems) {
        var loadPromises = [];
        var config = {
            model: modelName,
            pageSize: gApp.LOAD_STORE_MAX_RECORDS,
            context: {
                workspace: gApp.getContext().getWorkspaceRef(),
                project: null
            },
            fetch:  gApp.STORE_FETCH_FIELD_LIST,
            sorters: [
                {
                    property: 'Rank',
                    direction: 'ASC'
                }
            ]
        };
        //Just to make sure we don't overload how many 'or's we have....
        while (globalItems.length) {
            var wConf = Ext.clone(config);
            wConf.pageSize = globalItems.length >= gApp.LOAD_STORE_MAX_RECORDS ? gApp.LOAD_STORE_MAX_RECORDS : globalItems.length;
            //Get the filters from the array
            wConf.filters = Rally.data.wsapi.Filter.or(_.first(globalItems, wConf.pageSize));
            globalItems = _.rest(globalItems, wConf.pageSize);
            var store = Ext.create('Rally.data.wsapi.Store', wConf);
            loadPromises.push(store.load());
        }
        return Deft.Promise.all(loadPromises);
    },
    _createNodes: function(data) {
        //These need to be sorted into a hierarchy based on what we have. We are going to add 'other' nodes later
        var nodes = [];
        //Push them into an array we can reconfigure
        _.each(data, function(record) {
            var localNode = (gApp.getContext().getProjectRef() === record.get('Project')._ref);
            nodes.push({'Name': record.get('FormattedID'), 'record': record, 'local': localNode});
        });
        return nodes;
    },

    _findNode: function(nodes, record) {
        var returnNode = null;
            _.each(nodes, function(node) {
                if ((node.record && node.record.data._ref) === record._ref){
                     returnNode = node;
                }
            });
        return returnNode;

    },

    _findNodeIndexByRef: function(nodes, ref) {
        var retval = _.findIndex(nodes, function(node) {
            return ((node.record && node.record.data._ref) === ref);
        });
        return retval;
    },

    _findNodeById: function(nodes, id) {
        return _.find(nodes, function(node) {
            return node.record.data._ref === id;
        });
    },

    //Routines to manipulate the types

     _getTypeList: function(lowestOrdinal) {
        var piModels = [];
        _.each(gApp._typeStore.data.items, function(type) {
            //Only push types above that selected
            if (type.data.Ordinal >= lowestOrdinal ){
                piModels.push({ 'type': type.data.TypePath.toLowerCase(), 'Name': type.data.Name, 'ref': type.data._ref});
            }
        });
        return piModels;
    },

    _highestOrdinal: function() {
        return _.max(gApp._typeStore.data.items, function(type) { return type.get('Ordinal'); }).get('Ordinal');
    },
    _getModelFromOrd: function(number){
        var model = null;
        _.each(gApp._typeStore.data.items, function(type) { if (number === type.get('Ordinal')) { model = type; } });
        return model && model.get('TypePath');
    },

    _getSelectedOrdinal: function() {
        return gApp.down('#piType').lastSelection[0].get('Ordinal');
    },

    _getOrdFromModel: function(modelName){
        var model = null;
        _.each(gApp._typeStore.data.items, function(type) {
            if (modelName === type.get('TypePath').toLowerCase()) {
                model = type.get('Ordinal');
            }
        });
        return model;
    },

    _getPrefixFromModel: function(modelName){
        var prefix = null;
        _.each(gApp._typeStore.data.items, function(type) {
            if (modelName === type.get('TypePath').toLowerCase()) {
                prefix = type.get('IDPrefix');
            }
        });
        return prefix;
    },

    _getIDFromRecord: function(record) {
        return record.get('FormattedID').slice(gApp._getPrefixFromModel(record.get('_type').length));
    },

    _getNodeId: function(d){
        return ((d.parent !== null) && (d.data.record.data.Parent !== null)) ?
            d.data.record.get('FormattedID') : Ext.id();
    },

    launch: function() {
    },
});
}());