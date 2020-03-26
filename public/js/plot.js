$(document).ready(function(){

var dates_unsorted = JSON.parse(document.getElementById("dates").value);
var total_cases_unsorted = JSON.parse(document.getElementById("total_cases").value);
var recovered_unsorted = JSON.parse(document.getElementById("recovered").value);
var deaths_unsorted = JSON.parse(document.getElementById("deaths").value);
var news_unsorted = JSON.parse(document.getElementById("news").value);

// sorting data
var dates = getSortedIdx(dates_unsorted);
var total_cases = sortARR(total_cases_unsorted, dates_unsorted.sortIndices);
var recovered = sortARR(recovered_unsorted, dates_unsorted.sortIndices);
var deaths = sortARR(deaths_unsorted, dates_unsorted.sortIndices);
var news = sortARR(news_unsorted, dates_unsorted.sortIndices);

const text_total = Array(total_cases.length).fill("");
const text_deaths = Array(deaths.length).fill("");
const text_recovered = Array(recovered.length).fill("");
text_total[text_total.length-1] = String(total_cases[total_cases.length-1]);
text_deaths[text_deaths.length-1] = String(deaths[deaths.length-1]);
text_recovered[text_recovered.length-1] = String(recovered[recovered.length-1]);
const text_news = news[news.length-1];
$('#news_div').text(text_news);

const maxRange_total = Math.max(...total_cases) + (Math.round((Math.max(...total_cases)- Math.min(...total_cases))/4 ));

const maxRange_deaths = Math.max(...deaths) + (Math.round((Math.max(...deaths)- Math.min(...deaths))/4 ));

const maxRange_recovered = Math.max(...text_recovered) + (Math.round((Math.max(...text_recovered)- Math.min(...text_recovered))/4 ));

const maxRange_secondPlot = Math.max(maxRange_deaths, maxRange_recovered);
const minRange_secondPlot = Math.min(Math.min(...deaths), Math.min(...recovered));

const range_total = [Math.min(...total_cases), maxRange_total];
const range_secondPlot = [minRange_secondPlot, maxRange_secondPlot];

last_date = dates[dates.length-1];
const last_update = 'Last updated: '+last_date;

  var total_cases = {
    x: dates,
    y: total_cases,
    yaxis: 'y2',
    type: 'scatter',
    mode:'lines+text',
    text:text_total,
    textposition: 'top',
    textfont:{size:20, color:"#996100"},
    line:{color:"#996100", width:3},
    name: "total_cases"
  };

  var recovered = {
    x: dates,
    y: recovered,
    type: 'scatter',
    mode:'lines+markers+text',
    text:text_recovered,
    textposition: 'top',
    textfont:{size:20, color:"#0d853d"},
    line:{color:"#0d853d", width:3},
    name: "recovered"
  };

  var deaths = {
    x: dates,
    y: deaths,
    type: 'scatter',
    mode:'lines+markers+text',
    text:text_deaths,
    textposition: 'top',
    textfont:{size:20, color:"#d42828"},
    line:{color:"#d42828", width:3},
    name:'deaths'
  };

  layout= {
    title: {
    text:"Coronavirus cases in Greece over time <br>"+last_update,
    font: {
      family: 'Courier New, monospace',
      size: 28
    }
  },
    ///////////// XAXIS
    xaxis: {
       type: 'date',
       tickformat: "%H:%M <br> %d-%b ",

    tickfont: {
        family: 'Old Standard TT, serif',
        size: 20,
        color: 'black'
      },
    showgrid: false,
    autotick: true,
    zeroline: false,
    ticks: 'outside',
    tickcolor: '#000'
  },
  //////// YAXIS
  yaxis: {
    range:range_secondPlot,
  titlefont: {
        family: 'Arial, sans-serif',
        size: 28,
        color: 'black'
      },
      tickangle: 45,
  domain: [0, .45],
  tickfont: {
      family: 'Old Standard TT, serif',
      size: 20,
      color: 'black'
    },
    autotick: true,
    ticks: 'outside',
    tickcolor: '#000'
  },
  ///////////// YAXIS2
  yaxis2: {
    range:range_total ,
  domain: [.55, 1],
  tickangle: 45,

  tickfont: {
      family: 'Old Standard TT, serif',
      size: 20,
      color: 'black'
    },
    autotick: true,
    ticks: 'outside',
    tickcolor: '#000'
  },
  plot_bgcolor:"#f5f5f5",
  paper_bgcolor:"#E0E0E0",
  ///// annotations
  annotations: [{
    textangle :-90,
    font: {
    family: "Arial, sans serif",
    size: 21,
    color: "black",
  },
    xref: 'paper',
    yref: 'paper',
    x: -.15,
    xanchor: 'left',
    y: 0.3,
    yanchor: 'bottom',
    text: 'Num of cases',
    showarrow: false
  }],
  ////////// legend
  legend:{
    font: {
      family: 'sans-serif',
      size: 18,
      color: '#000'
    },
    bgcolor: '#E2E2E2',
    bordercolor: '#FFFFFF',
    borderwidth: 2
  }
  };

  var data = [recovered, deaths, total_cases];
  //var dataTotal = [total_cases];
  Plotly.newPlot('plot-death-rec', data, layout);
  //Plotly.newPlot('plot-total', dataTotal, layout);


});
