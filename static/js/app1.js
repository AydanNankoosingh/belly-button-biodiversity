//d3.json('/samples.json').then(function(data) {console.log(data.samples[0])});

d3.json('/samples.json').then(function(data) {
    var dropDown = d3.select('#selDataset');
    data.names.forEach(function(item) { dropDown.append('option')
        .attr('value', item)
        .text(item)
    });
});


d3.json('/samples.json').then(function(data) {
    

    var id = data.samples[10].id;
    var ind = data.names.indexOf(id)
    var otu_int = data.samples[ind].otu_ids.slice(0, 10);
    var vals = data.samples[ind].sample_values.slice(0, 10);
    var otu = otu_int.map(val => `OTU ${val}`);
    var labels = data.samples[ind].otu_labels.slice(0, 10);
    var meta = data.metadata[ind];

    console.log(data.metadata[ind])

    // bar chart
    var trace_bar = {
        y: otu,
        x: vals,
        type: 'bar',
        orientation: 'h',
        text: labels
    };

    Plotly.newPlot("bar", [trace_bar]);

    // bubble chart
    trace_bubble = {
        x: otu_int,
        y: vals,
        text: labels,
        mode: 'markers',
        marker: {
            size: vals,
            color: otu_int
        }
    };

    Plotly.newPlot("bubble", [trace_bubble]);

    // demo data
    table = d3.select('.panel-body')//.append('p').text('test')

    Object.entries(meta).forEach(function(item) { table.append('p').text(`${item[0]}: ${item[1]}`) } );
}); 