// const ctx = document.getElementById('chart-canvas');
// const myChart = new Chart(ctx, {
//     type: 'doughnut',
//     labels: ['Платено', 'Остава', 'Тип'],
//     data: {
//         datasets: [{
//             // todo_back: change these value to value coming from DB
//             data: [30, 10, 0],
//             backgroundColor: [
//                 'rgba(38,99,235, 1)',
//                 'rgba(240,90,11, 1)',
//                 'rgba(63,63,70, 1)',
//             ],
//             borderWidth: 0,
//             borderRadius: [10,10],
//             // clip: {left: 20, top: false, right: -21, bottom: 0}
//         }],

//     },
//     options: {
//         cutout: '75%',
//     }
// });


Chart.defaults.elements.arc.borderWidth = 0;
Chart.defaults.elements.arc.roundedCornersFor = 0;
Chart.defaults.elements.arc.hoverBorderColor = 'white';

Chart.defaults.datasets.doughnut.cutout = '75%';

var doughnutChart = document.getElementById('chart-canvas');

if(doughnutChart) {
    new Chart(doughnutChart, {
        type: 'doughnut',
        labels: ['Платено', 'Остава', 'Тип'],
        // The data for our dataset
    data: {
        datasets: [{
            // todo_back: change these value to value coming from DB
            data: [30, 10, 0],
            backgroundColor: [
                'rgba(38,99,235, 1)',
                'rgba(240,90,11, 1)',
                'rgba(63,63,70, 1)',
            ],
            borderWidth: 0,
            borderRadius: 0,
        }],

    },
        plugins: [
            {
                afterUpdate: function(chart) {
                    if (chart.options.elements.arc.roundedCornersFor !== undefined) {
                        var arc = chart.getDatasetMeta(0).data[chart.options.elements.arc.roundedCornersFor];
                        
                        arc.round = {
                            x: (chart.chartArea.left + chart.chartArea.right) / 2,
                            y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                            radius: (arc.outerRadius + arc.innerRadius) / 2,
                            thickness: (arc.outerRadius - arc.innerRadius) / 2,
                            backgroundColor: arc.options.backgroundColor
                        }
                    }
                },
                afterDraw: (chart) => {
                    if (chart.options.elements.arc.roundedCornersFor !== undefined) {
                        var {ctx, canvas} = chart;
                        var arc = chart.getDatasetMeta(0).data[chart.options.elements.arc.roundedCornersFor];

                        var startAngle = Math.PI / 2 - arc.startAngle;
                        var endAngle = Math.PI / 2 - arc.endAngle;
        
                        ctx.save();
                        ctx.translate(arc.round.x, arc.round.y);
                        ctx.fillStyle = arc.round.backgroundColor;
                        ctx.beginPath();
                        ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
                        ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                }
            }
        ]
    });
}