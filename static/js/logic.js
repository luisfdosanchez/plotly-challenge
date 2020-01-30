
d3.json("/static/data/samples.json").then(d=>{
    console.group("Initial check");
    console.log(d.samples);
    console.log(d.names.length);
    console.groupEnd();
    for (i=0; i<d.names.length; i++) {
        d3.selectAll("select").append("option").text(d.names[i]).attr('value',i);
    }
});

d3.select("#idd").on("change", f=> {
    let vval = d3.select("#idd").property("value");
    d3.json("/static/data/samples.json").then(d=>{
      d3.select("#tabla1").selectAll("hr").remove();
      d3.select("#tabla1").selectAll("div").remove();
      d3.select("#tabla1").append("hr");
      d3.select("#tabla1").append("div").attr('class','card-header').attr('id','tabletitle');
      d3.select("#tabletitle").text("Demographic data");
      d3.select("#tabla1").append("div").attr('class','card-body').attr('id','tablecontent');
      d3.select("#tablecontent").append("h6").text("id: "+d.metadata[vval].id).attr('class','small');
      d3.select("#tablecontent").append("h6").text("ethnicity: "+d.metadata[vval].ethnicity).attr('class','small');
      d3.select("#tablecontent").append("h6").text("gender: "+d.metadata[vval].gender).attr('class','small');
      d3.select("#tablecontent").append("h6").text("age: "+d.metadata[vval].age).attr('class','small');
      d3.select("#tablecontent").append("h6").text("location: "+d.metadata[vval].location).attr('class','small');
      d3.select("#tablecontent").append("h6").text("bbtype: "+d.metadata[vval].bbtype).attr('class','small');
      d3.select("#tablecontent").append("h6").text("wfreq: "+d.metadata[vval].wfreq).attr('class','small');

      arrX=[];
      arrY=[];
      arrL=[];

      for (i=10; i>0; i--) {
        if (d.samples[vval].otu_ids[i]!=null) {
          arrX.push("OTU "+d.samples[vval].otu_ids[i]);
        }
        if (d.samples[vval].sample_values[i]!=null) {
          arrY.push(d.samples[vval].sample_values[i]);
        }
        if (d.samples[vval].otu_labels[i]!=null) {
          arrL.push(d.samples[vval].otu_labels[i]);
        }
      }

      console.group('id:'+d.metadata[vval].id+' - arrayPos:'+vval);
      console.log(arrX);
      console.log(arrY);
      //console.log("Labels top 10: "+arrL);
      console.log("WashFreq: "+d.metadata[vval].wfreq)


      if (arrX.length!=0) {
        d3.select("#grafica1").selectAll("*").remove();
        d3.select("#grafica1").append("div").attr('id', 'plot1').attr('class','text-center align-middle');

        var trace1 = {
          x: arrY,
          y: arrX,
          text: arrL,
          type: 'bar',
          orientation: "h"
        };
        var layout={
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
          }
        };
        var data = [trace1];
        Plotly.newPlot('plot1', data);
      } else {
        d3.select("#grafica1").selectAll("*").remove();
        d3.select("#grafica1").append("h5").attr('class', "text-center text-danger align-middle").text("Oops!");
        d3.select("#grafica1").append("img").attr('src','/static/data/no_data_found.png').attr('src','/static/data/no_data_found.png').attr('class','img-fluid text-center align-middle').attr('alt','Responsive image');
        
      }

      if (d.metadata[vval].wfreq!=null) {
        d3.select("#grafica2").selectAll("*").remove();
        d3.select("#grafica2").append("h1").text(" ");
        d3.select("#grafica2").append("h1").text(" ");
        d3.select("#grafica2").append("div").attr('id', "plot2").attr('class','text-center align-middle');

        var data = [
          {
            type: "indicator",
            mode: "gauge+number+delta",
            value: d.metadata[vval].wfreq,
            title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
            subtitle: { text: "Scrubs per week", font: { size: 20 } },
            gauge: {
              axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
              bar: { color: "darkred" },
              bgcolor: "white",
              borderwidth: 1,
              bordercolor: "gray",
              steps: [
                { range: [0, 1], color: "#ffffe0" },
                { range: [1, 2], color: "#f4fdd7" },
                { range: [2, 3], color: "#e8fcce" },
                { range: [3, 4], color: "#dcfac5" },
                { range: [4, 5], color: "#d0f8bc" },
                { range: [5, 6], color: "#c4f6b3" },
                { range: [6, 7], color: "#b8f4ab" },
                { range: [7, 8], color: "#abf2a2" },
                { range: [8, 9], color: "#9ef099" },
                { range: [9, 10000], color: "#90ee90" }
              ]
            }
          }
        ];
        var layout = {
          width: 500,
          height: 400,
          margin: { t: 25, r: 25, l: 25, b: 25 },
          font: { color: "black", family: "Arial" }
        };
        Plotly.newPlot('plot2', data, layout);
      } else {
        d3.select("#grafica2").selectAll("*").remove();
        d3.select("#grafica2").append("h5").attr('class', "text-center text-danger align-middle").text("Oops!");
        d3.select("#grafica2").append("img").attr('src','/static/data/no_data_found.png').attr('class','img-fluid text-center align-middle').attr('alt','Responsive image');
      }

      arrX=[];
      arrY=[];
      arrL=[];

      for (i=d.samples.length; i>0; i--) {
        if (d.samples[vval].otu_ids[i]!=null) {
          arrX.push(d.samples[vval].otu_ids[i]);
        }
        if (d.samples[vval].sample_values[i]!=null) {
          arrY.push(d.samples[vval].sample_values[i]);
        }
        if (d.samples[vval].otu_labels[i]!=null) {
          arrL.push(d.samples[vval].otu_labels[i]);
        }
      }

      console.log(arrX);
      console.log(arrY);
      //console.log(arrL);
      console.groupEnd();

      if (arrX.length>0) { 
        d3.select("#grafica3").selectAll("*").remove();
        d3.select("#grafica3").append("div").attr('id', "plot3").attr('class','text-center align-middle');

        var trace1 = {
          x: arrX,
          y: arrY,
          text:arrL,
          mode: 'markers',
          marker: {
            size: arrY,
            color:arrX,
          }
        };
        var data = [trace1];
        Plotly.newPlot('plot3', data);
      } else {
        d3.select("#grafica3").selectAll("*").remove();
        d3.select("#grafica3").append("h5").attr('class', "text-center text-danger align-middle").text("Oops!");
        d3.select("#grafica3").append("img").attr('src','/static/data/no_data_found.png').attr('class','img-fluid text-center align-middle').attr('alt','Responsive image');
      }
    })    
});
