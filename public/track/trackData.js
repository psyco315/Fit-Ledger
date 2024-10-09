let myChart
const drawGraph = async (data, key) => {

  myChart = new Chart(
    document.querySelector('.graphWindow'),
    {
      type: 'line',
      data: {
        labels: data.map(row => row.date),
        datasets: [
          {
            label: `${key}`,
            data: data.map(row => row.trackValue)
          }
        ]
      }
    }
  );
};

const destroyGraph = ()=>{
  if(myChart){
    myChart.destroy()
  }
}

export { drawGraph, destroyGraph }
 