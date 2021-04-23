//changes the plot with the id selected
updatebarplot= (data,id)=> {
    let sample= data.samples.filter((sample) => sample.id===id);
    let idsValues = sample[0].otu_ids.slice(0,10).reverse();
    //inserting the text OTU on the label name
    let createLabel = function(item) {
        return "OTU"+item;
    }
    let idsLabels=[];
    idsValues.forEach(element => {
            idsLabels.push(createLabel(element));
    });
    
    let sampleValues= sample[0].sample_values.slice(0,10).reverse();
    let textValues= sample[0].otu_labels.slice(0,10).reverse();
    console.log(idsLabels);
    console.log(sampleValues);
    console.log(textValues);

    var trace = {
        x:sampleValues,
        y:idsLabels,
        text: textValues,
        type: "bar",
        orientation:"h",
        marker: {color: "#EE6868"}
    };
    
    var data1 = [trace];
    
    var layout = {
        height: 600,
        width: 500
    };
      
    Plotly.newPlot("bar", data1);

};

updatebubbleplot= (data,id)=> {
    let sample= data.samples.filter((sample) => sample.id===id);
    let idsValues = sample[0].otu_ids;  
    let sampleValues= sample[0].sample_values;
    let textValues= sample[0].otu_labels;
    console.log(idsValues);
    console.log(sampleValues);
    var trace1 = {
        x: idsValues,
        y: sampleValues,
        text:textValues,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: idsValues,
            opacity: [1, 0.8, 0.6, 0.4]
        }
     };
  
  var data1 = [trace1];
  
  var layout = {
    //title: 'OUT ID',
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot("bubble", data1, layout);

};

updategaugechart = (wfreq) =>{
    var data1  = [
        {
          //domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            bordercolor:"gray",
            borderwidth:"2",
            axis: {range: [1, 9], nticks: 9
                 },
            bar: { color: "#4D90E1" },
            steps: [
              { range: [1, 2], color: "#F2F3F4" },
              { range: [2, 3], color: "#D7DBDD" },
              { range: [3, 4], color: "#F5CBA7" },
              { range: [4, 5], color: "#F0B27A" },
              { range: [5, 6], color: "#DC7633" },
              { range: [6, 7], color: "#CD6155" },
              { range: [7, 8], color: "#C0392B" },
              { range: [8, 9], color: "#922B21" }
            ],
            threshold: {
              line: { color: "#0F56AB", width: 4 },
              thickness: 0.75,
              value: wfreq
            }
          }
        }
      ];
      
      var layout = {margin: { t: 0, b: 0 } };

      Plotly.newPlot("gauge", data1, layout);

};


//function the update the plots when the dropdown selection change
optionChanged = (id) =>{
    d3.json("samples.json").then(data => {
        let demoginfo = data.metadata.filter(metadatas => metadatas.id.toString()===id);
        d3.select("#sample-metadata").html("");
        d3.select("#sample-metadata").append("li").text("id:" + demoginfo[0].id);
        d3.select("#sample-metadata").append("li").text("ethnicity: "+demoginfo[0].ethnicity);
        d3.select("#sample-metadata").append("li").text("gender: "+demoginfo[0].gender);
        d3.select("#sample-metadata").append("li").text("age: "+demoginfo[0].age);
        d3.select("#sample-metadata").append("li").text("location: "+demoginfo[0].location);
        d3.select("#sample-metadata").append("li").text("bbtype: "+demoginfo[0].bbtype);
        d3.select("#sample-metadata").append("li").text("wfreq: "+demoginfo[0].wfreq);
        console.log (demoginfo);
        updatebarplot(data, id);
        updatebubbleplot(data,id);
        updategaugechart(demoginfo[0].wfreq);

    });
}

//init dropdown with data
d3.json("samples.json").then(data => {
    console.log(data);
    let dropSelect =d3.select("#selDataset");
    data.names.forEach(element => {
        dropSelect.append("option").attr("value", element)
        .text(element);
    });
    optionChanged(data.names[0]);
});