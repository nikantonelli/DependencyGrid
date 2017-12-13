var gApp;
(function () {
    var Ext = window.Ext4 || window.Ext;

    Ext.define('Rally.app.PiDependencies.app', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    config: {
        defaultSettings: {
            showFilter: true,
            hideArchived: true,
            onlyDependencies: true
        }
    },
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
            }
        ];
        return returned;
    },
    itemId: 'rallyApp',
    MIN_COLUMN_WIDTH:   15,        //Looks silly on less than this
    MAX_COLUMN_WIDTH:   50,
    LOAD_STORE_MAX_RECORDS: 100, //Can blow up the Rally.data.wsapi.filter.Or
    WARN_STORE_MAX_RECORDS: 300, //Can be slow if you fetch too many
    NODE_CIRCLE_SIZE: 8,                //Pixel radius of dots
    
    _gridMargin: {top: 80, right: 400, bottom: 10, left: 80},

    STORE_FETCH_FIELD_LIST: [
        'Name',
        'FormattedID',
        'Parent',
        'DragAndDropRank',
        'Children',
        'ObjectID',
        'Project',
        'DisplayColor',
        'Owner',
        'Blocked',
        'BlockedReason',
        'Ready',
        'Tags',
        'Workspace',
        'RevisionHistory',
        'CreationDate',
        'PercentDoneByStoryCount',
        'PercentDoneByStoryPlanEstimate',
        'PredecessorsAndSuccessors',                
        'State',
        'PreliminaryEstimate',
        'PreliminaryEstimateValue',
        'Description',
        'Notes',
        'Predecessors',
        'Successors',
        'OrderIndex',   //Used to get the State field order index
        'PortfolioItemType',                
        'Ordinal',
        'Release',
        'Iteration',
        'Milestones',
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
                afterrender:  function() {  gApp = this.up('#rallyApp'); gApp._onElementValid(this);},
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

        var xAxis = svg.append('g');
        var yAxis = svg.append('g');
        
        yAxis.attr("transform", "rotate(-90)")
            .append("text")
                .attr("x", -gApp._gridMargin.top)
                .attr("y", gApp._gridMargin.left/4)
                .attr("dy", ".32em")
                .attr("text-anchor", "end")
                .text("Successors");
    
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

        //Let these slide out to globals
        x = d3.scaleBand().range([0, gApp._gridSize]);
        z = d3.scaleLinear().domain([0, 4]).clamp(true);
        c = d3.scaleOrdinal(d3.schemeCategory10).domain(d3.range(10));

        //Start with ordered by FormattedID
        x.domain(gApp.down('#sortOrder').value());        
        
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
                .text(function(d, i) { return gApp._nodes[i].Name; });
                
        }    
        else { 
            gApp._showNoDependencies();
        }
        
        
    },
    _nodeTree: null,
    
    _destroyGrid: function() {
        var svg = d3.select("#grid").remove();
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

    _currentGroups: [],

    _getGroupFor: function(record) {
        var index = _.indexOf(gApp._currentGroups, record);
        if ( index < 0 ) {
            gApp._currentGroups.push(record);
            index = _.indexOf(gApp._currentGroups, record);
        }
        return index;
    },

    //Continuation point after selectors ready/changed
    _enterMainApp: function() {
        gApp._destroyGrid();
        gApp._drawGrid();
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
            node.group = gApp._getGroupFor(node.record.data.Parent);
            gApp._matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
        });

        //Get grid ready for drawing
        gApp._setUpGrid(n);

        //Now for each node, add a value to the matrix for the dependency
        gApp._nodes.forEach(function(node){
            if (node.record && node.record.data.Predecessors && node.record.data.Predecessors.Count){
                //Now we need to find the Predecessor details and dynamically fill in the matix
                node.record.getCollection('Predecessors').load({
                    fetch: true,
                    callback: function (records, operation, success) {
                        if (success) {
                            //For each record, find the matrix element and update
                            _.each(records, function(record) {
                                var i = gApp._findNodeIndexByRef(gApp._nodes, node.record.data._ref);
                                var j = gApp._findNodeIndexByRef(gApp._nodes, record.data._ref);
                                if ( j < 0 ) {  // Record is outside those selected
                                    gApp._matrix[i].error = 1;
                                } else {
                                    gApp._matrix[i][j].count = gApp._matrix[i][j].count ? gApp._matrix[i][j].count += 1 : 1;
                                    gApp._matrix[i][j].z += record.get(gApp.SIZEFIELD) || 0;
                                }
                            });
                            gApp._refreshGrid();
                        }
                    }
                });
            }
        });
    },

    _sortOrders: {
        FormattedID:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { return d3.ascending(gApp._nodes[a].record.get('ObjectID'), gApp._nodes[b].record.get('ObjectID')); });
        },

        Name:   function() {
            return d3.range(gApp._nodes.length).sort(function(a, b) { return d3.ascending(gApp._nodes[a].record.get('Name'), gApp._nodes[b].record.get('Name')); });
        },

        PreliminaryEstimateValue:   function() {
                    return d3.range(gApp._nodes.length).sort(function(b, a) { return d3.ascending(gApp._nodes[a].record.get('PreliminaryEstimateValue'), gApp._nodes[b].record.get('PreliminaryEstimateValue')); });
                },
        // Parent:   
        //     function() {
        //         return d3.range(gApp._nodes.length).sort(function(a, b) { 
        //             return d3.ascending(
        //                 gApp._nodes[a].record.get('Parent') && gApp._nodes[a].record.get('Parent')._ref, 
        //                 gApp._nodes[b].record.get('Parent') && gApp._nodes[b].record.get('Parent')._ref
        //             ); 
        //         });
        //     },
        PlannedStartDate:   
            function() {
                return d3.range(gApp._nodes.length).sort(function(a, b) { 
                    return d3.ascending(
                        Ext.Date.format(gApp._nodes[a].record.get('PlannedStartDate'), 'U'), 
                        Ext.Date.format(gApp._nodes[b].record.get('PlannedStartDate'), 'U')
                    ); 
                });
            },
        PlannedEndDate:   
            function() {
                return d3.range(gApp._nodes.length).sort(function(a, b) { 
                    return d3.ascending(
                        Ext.Date.format(gApp._nodes[a].record.get('PlannedEndDate'), 'U'), 
                        Ext.Date.format(gApp._nodes[b].record.get('PlannedEndDate'), 'U')
                    ); 
                });
            },

    },

    _refreshGrid: function() {
    
        var grid = d3.select("grid");
        if (grid) { grid.remove(); }

        //Get the current viewBox
        var svg = gApp._svg;
        var width = svg.attr('width');
        var height = svg.attr('height');

        var rows = svg.selectAll(".row")
            .data(gApp._matrix)
            .enter().append("g")
            .attr("class", "row")
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
            .each(row);
    
        rows.append("line")
            .attr("x2", width);
    
        rows.append("text")
            .attr("x", -6)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .attr("class", function(d,i) {
                if (gApp._matrix[i].error ) {
                    return "textBlink";
                }
                else {
                    return "normalText";
                }
            })
            .on("mouseover", textmouseOver)
            .on("mouseout", textMouseOut)
            .text(function(d, i) {  
                return gApp._nodes[i].Name; 
            });
        
        rows.append("text")
            .attr("id", "infoText")
            .attr("x", gApp._gridSize + 10)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "start")
            .text(function(d, i) { 
                return gApp._nodes[i].record.get(gApp.down('#sortOrder').rawValue); 
            });
    

    
        function textmouseOver(p) {
            debugger;
            return;
        }

        function textMouseOut(p) {
            return;
        }
    
        function row(row) {
        var cell = d3.select(this).selectAll(".cell")
            .data(row.filter(function(d) { return d.z; }))
            .enter().append("circle")
//            .enter().append("rect")
            .attr("class", "cell")
            .attr("cx", function(d) { return x(d.x) + (x.bandwidth()/2); })
            .attr("cy", function(d) { return x.bandwidth()/2; })
            // .attr("y", function(d) { return x(d.y); })
            .attr("r", x.bandwidth()/2 - 4)
            // .attr("width", x.bandwidth())
            // .attr("height", x.bandwidth())
            .style("fill-opacity", function(d) { return z(d.z); })
            .style("fill", function(d) { return gApp._nodes[d.x].group === gApp._nodes[d.y].group ? c(gApp._nodes[d.y].group) : c(gApp._nodes[d.x].group); })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);
        }
    
        function mouseover(p) {
            d3.selectAll(".row text").classed("active", function(d, i) { return i === p.y; });
            d3.selectAll(".column text").classed("active", function(d, i) { return i === p.x; });
        }
    
        function mouseout() {
            d3.selectAll("text").classed("active", false);
        }
    },
    
    
    _reOrder: function(value) {
            x.domain(value());

            var grid = d3.select("#grid");
        
            var t = grid.transition().duration(2500);
        
            t.selectAll(".row")
                .delay(function(d, i) { return x(i) * 4; })
                .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
                .selectAll(".cell")
                .delay(function(d) { return x(d.x) * 4; })
                .attr("x", function(d) { return x(d.x); })      // For text and lines
                .attr("cx", function(d) { return x(d.x) + (x.bandwidth()/2); });    //For circles
    
            t.selectAll(".column")
                .delay(function(d, i) { return x(i) * 4; })
                .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

            grid.selectAll('#infoText').each( function (d, i, n) { 
                this.innerHTML = gApp._nodes[i].record.get(gApp.down('#sortOrder').rawValue) 
            });
        },
    
        // var timeout = setTimeout(function() {
        // order("group");
        // d3.select("#order").property("selectedIndex", 2).node().focus();
        // }, 5000);

    // _nodeMouseOut: function(node, index,array){

    // },

    // _nodeMouseOver: function(node,index,array) {

    // },
    
    // _nodePopup: function(node, index, array) {

    // },

    _nodeClick: function (node,index,array) {
        if (!(node.data.record.data.ObjectID)){ return; } //Only exists on real items
        if (event.shiftKey) { 
            gApp._nodePopup(node,index,array); 
        }  else {
            gApp._dataPanel(node,index,array);
        }
    },

    // _dataPanel: function(node, index, array) {

    // },

    //Entry point after creation of render box
    _onElementValid: function(rs) {
        //Add any useful selectors into this container ( which is inserted before the rootSurface )
        //Choose a point when all are 'ready' to jump off into the rest of the app
        var hdrBox = this.insert (0,{
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
        console.log('filterchange');
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
        if ( gApp._nodes) gApp._nodes = [];
        gApp._getArtifacts( gApp.down('#piType'));
    },

    _kickOff: function() {
        var ptype = gApp.down('#piType');
        gApp._typeStore = ptype.store;
        var hdrBox = gApp.down('#headerBox');

        var sortFuncs = Object.keys(gApp._sortOrders).map(function(key) { return [ gApp._sortOrders[key], key];});
        if ( !gApp.down('#sortOrder')){
            hdrBox.add(
                {
                    xtype: 'rallycombobox',
                    margin: '10 0 5 20',
                    itemId: 'sortOrder',
                    fieldLabel: 'Sort Order :',
                    labelWidth: 100,
                    store: sortFuncs,
                    listeners: {
                        select: function(a,b,c,d,e,f) {
                            gApp._reOrder(a.value);
                        }
                    }
                }
            )
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
                                '<p class="boldText">Filtering</p>' +
                               '<p>There are app settings to enable the extra filtering capabilities on the main page, so that you can choose which lowest-level portfolio items to see' +
                               ' e.g. filter on Owner, Investment Type, etc. </p><p>To filter by release (e.g. to find all those features scheduled into a Program Increment)' +
                               ' you will need to edit the Page settings (not the App Settings) to add a Release or Milestone filter</p>' +
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
    console.log('getArtifacts');
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

                if (gApp.getSetting('onlyDependencies')) {
                    gApp._nodes = gApp._createNodes(_.filter(dataArray, function(n) {
                        return n.get('PredecessorsAndSuccessors') && n.get('PredecessorsAndSuccessors').Count > 0;
                    }));
                }
                else {
                    gApp._nodes = gApp._createNodes(dataArray); //These will have their local variable set true.
                }
                gApp._enterMainApp();
            },
            failure: function(error) {
                console.log("Failed to load a store", error.error.errors);
            }
        });
    },


    _loadStoreLocal: function(modelName) {
        var storeConfig =
            {
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
        if (gApp._filterInfo && gApp._filterInfo.filters.length) {
            storeConfig.filters = gApp._filterInfo.filters;
            storeConfig.models = gApp._filterInfo.types;
        }

        if (gApp.getSetting('hideArchived')) {
            storeConfig.filters.push({
                property: 'Archived',
                operator: '=',
                value: false
            });
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
        return _.findIndex(nodes, function(node) {
            return ((node.record && node.record.data._ref) === ref);
        });
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
        //API Docs: https://help.rallydev.com/apps/2.1/doc/
    },
});
}());