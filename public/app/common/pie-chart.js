(function(){
    if(!!$('#chart-profile-page').length) {

        function createChart(started, finished) {
            $("#chart-profile-page").kendoChart({
                title: {
                    position: "bottom",
                    text: "Started/Finished games"
                },
                legend: {
                    visible: false
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        background: "transparent",
                        template: "#= category #: \n #= value#"
                    }
                },
                series: [{
                    type: "pie",
                    startAngle: 150,
                    data: [{
                        category: "Started Games",
                        value: started,
                        color: "#D9230F"
                    }, {
                        category: "Finished Games",
                        value: finished,
                        color: "#737373"
                    }]
                }],
                tooltip: {
                    visible: true,
                    format: "{0}"
                }
            });
        }

        $(document).ready(function () {

            $.ajax({
                url: "/identity/profile/stats",
                context: document.body
            }).done(function(resp) {
                if(resp.length){
                    createChart(resp[0].startedGames + 1, resp[0].endedGames + 1);
                    // createChart(resp[0].startedGames, resp[0].endedGames);
                }
            });
        });
        $(document).bind("kendo:skinChange", createChart);
    }
}());