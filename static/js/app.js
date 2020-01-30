sampleData = 'https://github.com/AydanNankoosingh/belly-button-biodiversity/blob/master/samples.json'

// init function -- pull up 940
function init() {
    var id = '940';
    getData(id)
    buildDrop()
}

// listener
d3.selectAll("#selDataset").on("change", updater);


// get data
function getData(id) {
    d3.json(sampleData).then(function(data) {
    
        var ind = data.names.indexOf(id)
        var otu_int = data.samples[ind].otu_ids.slice(0, 10);
        var vals = data.samples[ind].sample_values.slice(0, 10);
        var otu = otu_int.map(val => `OTU ${val}`);
        var lab = data.samples[ind].otu_labels.slice(0, 10);
        var meta = data.metadata[ind];

        buildPlots(otu_int, vals, otu, lab)
        buildPanel(meta)
    })
}

// build dropdown
function buildDrop() {
    d3.json('/samples.json').then(function(data) {
        var dropDown = d3.select('#selDataset');
        data.names.forEach(function(item) { dropDown.append('option')
            .attr('value', item)
            .text(item)
        });
    });
}

// build panel
function buildPanel(metadata) {
    table = d3.select('.panel-body')
    table.html('')
    Object.entries(metadata).forEach(function(item) {table.append('p').text(`${item[0]}: ${item[1]}`)});
};

// build plots
function buildPlots(otu_id, values, otu_text, labels) {

    // bar chart
    var trace_bar = {
        y: otu_text,
        x: values,
        type: 'bar',
        orientation: 'h',
        text: labels
    };
    

    Plotly.newPlot("bar", [trace_bar]);

    // bubble chart
    trace_bubble = {
        x: otu_id,
        y: values,
        text: labels,
        mode: 'markers',
        marker: {
            size: values.map(item => item/2),
            sizemode: 'diameter',
            color: otu_id
        }
    };

    var layout = {
        xaxis: { title: "OTU ID" },
      };

    Plotly.newPlot("bubble", [trace_bubble], layout);
}

// updater
function updater() {
    var dropdownMenu = d3.select("#selDataset");
    var new_id = dropdownMenu.node().value;

    getData(new_id);
};

init()