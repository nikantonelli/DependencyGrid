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
    MIN_CARD_WIDTH: 200,
    LOAD_STORE_MAX_RECORDS: 100, //Can blow up the Rally.data.wsapi.filter.Or
    WARN_STORE_MAX_RECORDS: 300, //Can be slow if you fetch too many
    NODE_CIRCLE_SIZE: 8,                //Pixel radius of dots
    
    _gridMargin: {top: 120, right: 400, bottom: 400, left: 120},

    //To be able to show a RAGStatus, you must have some fields in the artefact for severiry, probability and status
    //The values of these fields must match the RISKColour and AIDColour routines in this file.
    RAIDseverityField: 'c_RAIDSeverityCriticality',
    RAIDprobabilityField: 'c_RISKProbabilityLevel',
    RAIDstatusField: 'c_RAIDRequestStatus',   

    _RAIDTypeMap: [
        {
            _refObjectName: 'RISK',      //Fixed internal string for this entity
            Name: 'Risk',                //Displayed to user
            data: { _refObjectName: 'Risk' } // Data area for any specifics for this code
        },

    ],
    //After caluclating the RAGStatus, it will be one of these entries
    _RAGStatusMap: [
        {
            _refObjectName: 'Red',      //Fixed internal string for this entity
            Name: 'Red',                //Displayed to user
            data: { _refObjectName: '#ff0000' } // Data area for any specifics for this code
        },
        {
            _refObjectName: 'Amber',
            Name: 'Amber',
            data: { _refObjectName: '#ffb080' } 
        },
        {
            _refObjectName: 'Green',
            Name: 'Green',
            data: { _refObjectName: '#00ff00' } 
        },
        {
            _refObjectName: 'Blue',
            Name: 'Blue',
            data: { _refObjectName: '#0000ff' } 
        },
        {
            _refObjectName: 'Unset',
            Name: 'Black',
            data: { _refObjectName: '#000000' } 
        }
    ],

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

        svg.selectAll('#titleText').remove();
        var xAxis = svg.append('g').attr('id', 'titleText');
        var yAxis = svg.append('g').attr('id', 'titleText');
        
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
                .text(function() { return gApp.down('#piType').rawValue + "(s) selected";});

    },

    _setUpGrid: function(num) {  

        console.log('Grid request for: ', num, ' items');
        var svg = d3.select('svg');

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
                .attr("class",  "hyperlinkText")
                .on("mouseover", gApp._textMouseOver)
                .on("mouseout", gApp._textMouseOut)
                .on("click", function(node, index, array) { gApp._nodeClick(node,index,array);})                
                .text(function(d, i) { return gApp._nodes[i].Name; });
            
            //Add colour legend to end of grid
            gApp._addColourLegend();
        }    
        else { 
            gApp._showNoDependencies();
        }
        
        
    },
    _addColourLegend: function() {
        var colourLegend = gApp._svg.append('g')
            .attr("transform", function(d, i) { 
                return "translate(0," + gApp._gridSize + ")";
            })
            .selectAll('.legend')
            .data(gApp._grouping[gApp.down('#grouping').rawValue]())
            .enter().append('g')
            .attr("class", 'legend')
            .attr("transform", function(d,i) { return "translate(0," + (x.bandwidth() * (i+1)) + ")";})

        d3.selectAll('.legend').append("circle")
            .attr('r', x.bandwidth()/4)
            .attr("fill", function(d,i) { return c(i);});

        d3.selectAll('.legend').append("text")
            .attr("x", x.bandwidth()/4 + 20)
            .attr("text-anchor", "start")
            .text( function(d,i,a) {
                var record =   gApp._grouping[gApp.down('#grouping').rawValue]()[i]
                return record ? record._refObjectName: "! NOT SET !";});
    },

    _nodeTree: null,
    
    _destroyAxes: function() {
        var svg = d3.selectAll('#titleText').remove();
    },

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

    _getGroupFor: function(record) {
//        debugger;
        var selectedgrouping = gApp.down('#grouping').rawValue;
        var grouping = gApp._grouping[selectedgrouping];
        var index = _.indexOf(grouping(), record.data[selectedgrouping]);
        return index < 0 ? 19 : index;  //If unknown, use the last number in the schemeCategory20 colouring
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
            var setColour = node.record.get('c_RAIDType') ? (node.record.get('c_RAIDType') === 'Risk') ?
                gApp.RISKColour : gApp.AIDColour : function() { return "Blue"; };
            node.record.data.RAGStatus = _.find(gApp._RAGStatusMap, { '_refObjectName' : setColour(node)}); //Insert an object for RAGStatus
            node.index = i;
            node.count = 0;
            node.group = gApp._getGroupFor(node.record);
            gApp._matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
            gApp._matrix[i].index = i;
        });

        //Dependending on gourping, we need to adapt the colouring. Let these slide out to globals
        x = d3.scaleBand().range([0, gApp._gridSize]);  //Scale everything to the grid
        z = d3.scaleLinear().domain([0, 5]).clamp(true);    //Allow for degrees of opacity on number of dependencies

        if (gApp.down('#grouping').rawValue === 'RAGStatus'){
            c = d3.scaleOrdinal( ['#ff005c', '#f3ca5e', '#b3ee01', '#145FAC'])
        } else {
            c = d3.scaleOrdinal(d3.schemeCategory20).domain(d3.range(n));
        }

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
                            var i = gApp._findNodeIndexByRef(gApp._nodes, node.record.data._ref);
                            _.each(records, function(record) {
                                var j = gApp._findNodeIndexByRef(gApp._nodes, record.data._ref);
                                if ( j < 0 ) {  // Record is outside those selected
                                    gApp._matrix[i].error = 1;
                                } else {
                                    gApp._matrix[i][j].count = gApp._matrix[i][j].count ? gApp._matrix[i][j].count += 1 : 1;
                                    gApp._matrix[i][j].z += record.get(gApp.SIZEFIELD) || 0;
                                }
                            });
                            gApp._matrix[i].loaded = true;
                            gApp._refreshGrid();
                        }
                    }
                });
            }
        });
    },

    _grouping: {
        Parent: function() {
            return _.uniq( _.pluck(gApp._nodes, function(node) { return node.record.get('Parent') }))
        },
        RAGStatus: function() {
            return gApp._RAGStatusMap;
//            return _.uniq( _.pluck(gApp._nodes, function(node) { return node.record.data.RAGStatus }));
        },
        PreliminaryEstimate: function() {
            return _.uniq( _.pluck(gApp._nodes, function(node) { return node.record.get('PreliminaryEstimate') }))
        },
        Release: function() {
            return _.uniq( _.pluck(gApp._nodes, function(node) { return node.record.get('Release') }))
        },
        State: function() {
            return _.uniq( _.pluck(gApp._nodes, function(node) { return node.record.get('State') }))
        },
        Owner: function() {
            return _.uniq( _.pluck(gApp._nodes, function(node) { return node.record.get('Owner') }))
        },
        Project: function() {
            return _.uniq( _.pluck(gApp._nodes, function(node) { return node.record.get('Project') }))
        }
        
    },

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
    
        //Get the current viewBox
        var svg = gApp._svg;
        var width = svg.attr('width');
        var height = svg.attr('height');

        // var grid = d3.select("grid");
        // if (grid) { 
        //     grid.remove(); 
        // }

        var rows = svg.selectAll(".row")
        .data(gApp._matrix.filter(function(d) { return d.loaded === true; }))
            .enter().append("g")
            .attr("class", "row")
            .attr("transform", function(d, i) { return "translate(0," + x(d.index) + ")"; })
            .each(row);
  
console.log('Rows: ',rows)
        rows.append("line")
            .attr("x2", width)
            .on("click", function(p, i, a) { 
                d3.selectAll("line").attr("stroke-width", 1);
                d3.selectAll("line").attr("opacity", 1);                
                d3.selectAll("line").classed("active", false);
                d3.selectAll("line").attr("y1", 0)            
                d3.selectAll("line").attr("y2", 0)            
            })

        rows.append("text")
            .attr("id", "infoText")
            .attr("x", gApp._gridSize + 10)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "start")
            .text(function(d, i) { 
                return gApp._nodes[d.index].record.get(gApp.down('#sortOrder').rawValue); 
            });
    
        rows.append("text")
            .attr("id", "titleText")
            .attr("x", -10)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .attr("class", function(d,i) {
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
            .text(function(d, i) { return gApp._nodes[d.index].Name; });
  
        rows.append("rect")
            .attr("x", -6)
            .attr("y",1)
            .attr("width", 5)
            .attr("height", x.bandwidth() - 2)
            .attr("fill", function(d, i, a) { return c(gApp._nodes[d.index].group)});

        function row(row) {
        var cell = d3.select(this).selectAll(".cell")
        .data(row)
    //    .data(row.filter(function(d) { return d.z; }))
            .enter().append("circle")
            .attr("class", "cell")
            .attr("cx", function(d) { return x(d.x) + (x.bandwidth()/2); })
            .attr("cy", function(d) { return x.bandwidth()/2; })
            .attr("r", (x.bandwidth()/2) * 0.9)
            .style("fill-opacity", function(d) { return z(d.z); })
            .style("fill", function(d) { return gApp._nodes[d.x].group === gApp._nodes[d.y].group ? c(gApp._nodes[d.y].group) : c(gApp._nodes[d.x].group); })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("click", clickit);
        }
    
        function clickit(p, i, a) {
            d3.selectAll(".row line").attr("stroke-width", function(d, i) { return d.index === p.y ? x.bandwidth() : 1; });
            d3.selectAll(".column line").attr("stroke-width", function(d, i) { return d.index ===p.x ? x.bandwidth() : 1; });
            d3.selectAll(".row line").attr("y1", function(d, i) { return d.index ===p.y ? x.bandwidth()/2 : 1; });
            d3.selectAll(".row line").attr("y2", function(d, i) { return d.index ===p.y ? x.bandwidth()/2 : 1; });
            d3.selectAll(".column line").attr("y1", function(d, i) { return d.index ===p.x ? x.bandwidth()/2 : 1; });
            d3.selectAll(".column line").attr("y2", function(d, i) { return d.index ===p.x ? x.bandwidth()/2 : 1; });            
            d3.selectAll(".row line").attr("opacity", function(d, i) { return d.index ===p.y ? 0.2 : 1; });
            d3.selectAll(".column line").attr("opacity", function(d, i) { return d.index ===p.x ? 0.2 : 1; });
            d3.selectAll(".row line").classed("active", function(d, i) { return d.index ===p.y ? true : false; });
            d3.selectAll(".column line").classed("active", function(d, i) { return d.index ===p.x ? true : false; });

        }
        function mouseover(p) {
            d3.selectAll(".row #titleText").classed("active", function(d, i) { return d.index ===p.y; });
            d3.selectAll(".column #titleText").classed("active", function(d, i) { return d.index ===p.x; });
        }
    
        function mouseout() {
            d3.selectAll("text").classed("active", false);
        }
    },
    
    _nodeClick: function (row,index,array) {
        var node = gApp._nodes[index];
        if (!(node.record.data.ObjectID)) return; //Only exists on real items
        //Get ordinal (or something ) to indicate we are the lowest level, then use "UserStories" instead of "Children"
        if (event.shiftKey) { 
            gApp._nodePopup(node,index,array); 
        }  else {
            gApp._dataPanel(node,index,array);
        }
    },

    _nodePopup: function(node, index, array) {
        var popover = Ext.create('Rally.ui.popover.DependenciesPopover',
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
                        var me = this;
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
                                            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
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
                                        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
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
                else return {
                    fetch: gApp.STORE_FETCH_FIELD_LIST,
                    pageSize: 50                                                    
                };
            },

            //This is specific to customer. Features are used as RAIDs as well.
            RAIDStoreConfig: function() {
                var retval = {};

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
                else return {
                    fetch: gApp.STORE_FETCH_FIELD_LIST,
                    pageSize: 50
                };
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

    _dataCheckForItem: function(d){
        return "";
    },

    
    _textMouseOver: function(row, index, array) {
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

    _textMouseOut: function(row, index, array) {
        var node = gApp._nodes[index];
        node.card.hide();
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
        gApp._destroyAxes();
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
                    stateful: true,
                    stateId: this.getContext().getScopedStateId('sortorder'),
                    context: this.getContext(),
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

        var groupFuncs = Object.keys(gApp._grouping).map(function(key) { return [ gApp._grouping[key], key];});

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
                        select: function(a,b,c,d,e,f) {
                            gApp._destroyAxes();
                            gApp._getArtifacts(ptype);                            
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
                            '<p>Circles are drawn when there is a dependency relationship. The colour of the circle is to categorise the Predecessor information. This colour can be compared to the colour band to the left which uses the same algorithm to colour for the Successor</p>' +
                            '<p>The categorisation method can be selected via the drop-down marked as "Colour Group". Currently the RAGStatus option uses a hard-coded algorithm specific to a particular customer. This could be changed to your requirements in the source code. If you do not have the same custom fields enabled, it will not work.</p>' +
                            '<p>By default, the ordering across the grid (and hence down the grid) is set to the item ID. If you select a different order, the grid will be rearranged. E.g, if you select "Name", the items will be arranged alphabetically on the title of the item</p>' +
                            '<p>Hovering over a circle will highlight the item names at the top and to the left in red. You can then go to the name and click on it to go to the data panel for that item</p>' +
                            '<p>If you click on the circle, the app will add highlight to the row and column until you click on another circle (either a different one or the same one)</p>' +
                            '<p>The app options will allow you to minimise the number of columns and rows by only showing those with dependencies - giving a more focussed view</p>' +
                            '<p class="boldText">Filtering</p>' +
                           '<p>There are app settings to enable the extra filtering capabilities on the main page, so that you can choose which portfolio items to see' +
                           ' e.g. filter on Owner, Investment Type, etc. </p><p>You can use the advanced filter to show you items in a particular Program Increment. If there are dependencies from Successor to a Predecessor that was not in the filtered selection, the Successors name to the left will blink slowly.</p>' +
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

        var depFilters = [];

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

        storeConfig.filters = Rally.data.wsapi.Filter.fromQueryString( filters );
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