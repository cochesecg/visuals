import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";
import HighchartsSunburst from "highcharts/modules/sunburst";
import HighchartGantt from "highcharts/modules/gantt";
import HighchartDrilldown from "highcharts/modules/drilldown";
import HighchartsParetto from "highcharts/modules/pareto";

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HighchartsSunburst(Highcharts);
HighchartGantt(Highcharts);
HighchartDrilldown(Highcharts);
HighchartsParetto(Highcharts);

interface SeriesData extends Highcharts.PointOptionsObject {
  grade?: string;
}
@Component({
  selector: "app-highcharts",
  templateUrl: "./highcharts.component.html",
  styleUrls: ["./highcharts.component.scss"],
})
export class HighchartsComponent implements AfterViewInit, OnInit {
  customBarChart: Highcharts.Chart | undefined;
  customHideableChart: Highcharts.Chart | undefined;
  customHideChart: Highcharts.Chart | undefined;
  chart1: Highcharts.Chart | undefined;
  chart2: Highcharts.Chart | undefined;
  customBarChartForm: FormGroup;
  hideChart = false;
  classes = [
    { id: 1, name: "class 1" },
    { id: 2, name: "class 2" },
    { id: 3, name: "class 3" },
    { id: 4, name: "class 4" },
    { id: 5, name: "class 5" },
    { id: 6, name: "class 6" },
    { id: 7, name: "class 7" },
    { id: 8, name: "class 8" },
  ];
  grades = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
  ];
  classesData = [
    { className: "class 1", grade: "1", sessions: 2, duration: 40 },
    { className: "class 2", grade: "2", sessions: 3, duration: 60 },
    { className: "class 3", grade: "3", sessions: 4, duration: 86 },
    { className: "class 4", grade: "4", sessions: 8, duration: 20 },
    { className: "class 5", grade: "1", sessions: 7, duration: 10 },
    { className: "class 6", grade: "2", sessions: 9, duration: 15 },
    { className: "class 7", grade: "3", sessions: 55, duration: 8 },
    { className: "class 8", grade: "4", sessions: 0, duration: 20 },
  ];

  public ngAfterViewInit(): void {
    this.basicLineChart();
    this.customLineChart();
    this.clickActionLineChart();
    this.createCustomBarChart();
    this.createGanttChart();
    if (!this.hideChart && !this.customHideChart) {
      this.createHideChart();
    }
    this.createChart1();
    this.createChart2();
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.customBarChartForm = this.fb.group({
      grade: [null],
      class: [null],
    });
  }
  ngDoCheck() {
    if (!this.hideChart && !this.customHideChart) {
      console.log("create hide chart");
      this.createHideChart();
    }
  }
  private basicLineChart(): void {
    Highcharts.chart("basic-line-chart", {
      chart: {
        type: "line",
      },
      title: {
        text: "Fruit Consumption",
      },
      xAxis: {
        categories: ["Apples", "Bananas", "Oranges"],
      },
      yAxis: {
        title: {
          text: "Fruit eaten",
        },
      },
      series: [
        {
          name: "Jane",
          data: [1, 0, 4],
        },
        {
          name: "John",
          data: [5, 7, 3],
        },
      ] as Highcharts.SeriesOptionsType[],
    });
  }
  private customLineChart(): void {
    Highcharts.chart("custom-line-chart", {
      chart: {
        type: "line",
      },
      title: {
        text: "Fruit Consumption",
        align: "right",
        style: {
          color: "#4572A7",
          fontSize: "36px",
        },
      },
      xAxis: {
        categories: ["Apples", "Bananas", "Oranges"],
      },
      yAxis: {
        title: {
          text: "Fruit eaten",
        },
      },
      legend: {
        title: {
          text: "Legend title",
          style: {
            color: "#ff00f",
          },
        },
        verticalAlign: "middle",
        align: "right",
        itemStyle: {
          fontFamily: "Roboto, sans-serif",
        },
      },
      series: [
        {
          name: "Jane",
          data: [1, 0, 4],
          color: "#ff0000",
        },
        {
          name: "John",
          data: [5, 7, 3],
        },
      ] as Highcharts.SeriesOptionsType[],
      tooltip: {
        formatter: function () {
          if (this.x == "Apples") {
            return (
              "<span>The value for <b>" +
              this.x +
              "</b> is <b class='red'>" +
              this.y +
              "</b>, in series " +
              this.series.name +
              "</span>"
            );
          }
          return (
            '<span>The value for <b class="green">' +
            this.x +
            "</b> is <b>" +
            this.y +
            "</b>, in series " +
            this.series.name +
            "</span>"
          );
        },
      },
    });
  }
  private clickActionLineChart(): void {
    const chart = Highcharts.chart("click-actions-line-chart", {
      chart: {
        type: "line",
      },
      title: {
        text: "Fruit Consumption",
      },
      xAxis: {
        categories: ["Apples", "Bananas", "Oranges"],
      },
      yAxis: {
        title: {
          text: "Fruit eaten",
        },
      },
      series: [
        {
          name: "Jane",
          data: [1, 0, 4],
        },
        {
          name: "John",
          data: [5, 7, 3],
        },
      ] as Highcharts.SeriesOptionsType[],
    });
    //onclick
    document.querySelector(".action1")?.addEventListener("click", () => {
      chart.xAxis[0].setCategories([
        "Apples",
        "Bananas",
        "Oranges",
        "Pears",
        "Grapes",
      ]);
      chart.addSeries({
        name: "New series",
        data: [1, 2, 3, 4, 5],
      } as Highcharts.SeriesOptionsType);
    });
    //onclick
    document.querySelector(".action2")?.addEventListener("click", () => {
      chart.series.forEach((series) => {
        if (series.name === "New series") {
          series.remove();
        }
      });
    });
  }
  private createCustomBarChart(): void {
    var _this = this;
    this.customBarChart = Highcharts.chart("custom-bar-chart", {
      chart: {
        type: "bar",
      },
      title: {
        text: "Class stuff",
        align: "left",
      },
      xAxis: {
        categories: this.getCategoriesData(),
        title: {
          text: null,
        },
        gridLineWidth: 0,
        lineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: "hours",
          align: "low",
        },
        lineWidth: 0,
        gridLineWidth: 0,
        tickWidth: 1,
      },
      tooltip: {
        useHTML: true,
        formatter: function (item) {
          console.log("item", item);
          console.log("this.point", this.point);
          const customOptions = this.point.options as SeriesData;
          return (
            '<span class="mb-2">students: ' +
            this.x +
            "</span><br>" +
            '<span class="mb-2 green">sessions: ' +
            this.y +
            "</span><br>" +
            '<span class="mb-2 red">calculated: ' +
            (Number(this.y) + _this.getRandomNumber(1, 100)) +
            "</span><br>" +
            '<span class="mb-2 red">weird special option: ' +
            customOptions?.grade +
            "</span><br>"
          );
        },
      },
      plotOptions: {
        bar: {
          borderRadius: "50%",
          dataLabels: {
            enabled: true,
          },
          groupPadding: 0.1,
        },
      },
      legend: {
        enabled: false,
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts?.defaultOptions?.legend?.backgroundColor || "#FFFFFF",
        shadow: true,
      },
      credits: {
        enabled: false,
      },

      series: [
        {
          data: this.getSeriesData(),
          type: "column",
          cursor: "pointer",
          point: {
            events: {
              click: function () {
                window.open(
                  "https://www.google.com/search?q=" + this.options.name,
                  "_blank"
                );
              },
            },
          },
        },
      ],
    });
  }
  barChartOptionChange(): void {
    console.log(
      "this.customBarChartForm.classes",
      this.customBarChartForm.value.class
    );
    console.log(
      "this.customBarChartForm.grade",
      this.customBarChartForm.value.grade
    );
    console.log(this.getCategoriesData());
    console.log(this.getSeriesData());
    this.customBarChart?.series[0].setData(this.getSeriesData(), false);
    this.customBarChart?.xAxis[0].setCategories(
      this.getCategoriesData(),
      false
    );
    this.customBarChart?.redraw();
  }
  getSeriesData(): SeriesData[] {
    return this.classesData

      .filter(
        (c) =>
          this.customBarChartForm.value.grade === null ||
          this.grades.find(
            (item) => this.customBarChartForm.value.grade == item.id
          )?.name === c.grade
      )
      .filter(
        (c) =>
          this.customBarChartForm.value.class === null ||
          this.classes.find(
            (item) => this.customBarChartForm.value.class == item.id
          )?.name === c.className
      )
      .map((c) => ({
        name: c.className,
        y: c.duration,
        grade: c.grade,
      }));
  }
  getCategoriesData(): string[] {
    return this.classes.map((c) => c.name);
  }
  private createGanttChart(): void {
    Highcharts.ganttChart("gantt-chart", {
      title: {
        text: "Simple Gantt Chart",
      },

      xAxis: [
        {
          min: Date.UTC(2014, 10, 17),
          max: Date.UTC(2014, 10, 30),
        },
      ],

      series: [
        {
          name: "Project 1",
          data: [
            {
              name: "Start prototype",
              start: Date.UTC(2014, 10, 18),
              end: Date.UTC(2014, 10, 25),
            },
            {
              name: "Develop",
              start: Date.UTC(2014, 10, 20),
              end: Date.UTC(2014, 10, 25),
            },
            {
              name: "Run acceptance tests",
              start: Date.UTC(2014, 10, 23),
              end: Date.UTC(2014, 10, 26),
            },
            {
              name: "Test prototype",
              start: Date.UTC(2014, 10, 27),
              end: Date.UTC(2014, 10, 29),
            },
          ],
        },
      ] as Highcharts.SeriesOptionsType[],
    });
  }
  private createHideChart(): void {
    this.customHideChart = Highcharts.chart("hide-chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "Basic drilldown",
      },
      xAxis: {
        type: "category",
      },

      legend: {
        enabled: false,
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          },
        },
      },

      series: [
        {
          name: "Things",
          colorByPoint: true,
          data: [
            {
              name: "Animals",
              y: 5,
              drilldown: "animals",
            },
            {
              name: "Fruits",
              y: 2,
              drilldown: "fruits",
            },
            {
              name: "Cars",
              y: 4,
              drilldown: "cars",
            },
          ],
        },
      ] as Highcharts.SeriesOptionsType[],
      drilldown: {
        series: [
          {
            id: "animals",
            data: [
              ["Cats", 4],
              ["Dogs", 2],
              ["Cows", 1],
              ["Sheep", 2],
              ["Pigs", 1],
            ],
          },
          {
            id: "fruits",
            data: [
              ["Apples", 4],
              ["Oranges", 2],
            ],
          },
          {
            id: "cars",
            data: [
              ["Toyota", 4],
              ["Opel", 2],
              ["Volkswagen", 2],
            ],
          },
        ],
      } as Highcharts.DrilldownOptions,
    });
  }
  chartSwitch(): void {
    this.hideChart = !this.hideChart;
    if (!this.hideChart) {
      this.createHideChart();
    } else {
      this.customHideChart?.destroy();
    }
  }
  private createChart1(): void {
    var _this = this;
    this.chart1 = Highcharts.chart("item1-chart", {
      chart: {
        type: "column",
        events: {
          click: function () {
            console.log("chart event");
            _this.chart2?.series[0].setData(
              [
                {
                  name: "Edge",
                  y: 14.77,
                },
                {
                  name: "Firefox",
                  y: 4.86,
                },
                {
                  name: "Safari",
                  y: 2.63,
                },
                {
                  name: "Internet Explorer",
                  y: 1.53,
                  sliced: true,
                  selected: true,
                },
                {
                  name: "Opera",
                  y: 1.4,
                },
                {
                  name: "Sogou Explorer",
                  y: 0.84,
                },
              ] as Highcharts.PointOptionsObject[],
              false
            );
            _this.chart2?.redraw();
          },
        },
      },
      title: {
        text: "Restaurants Complaints",
      },
      tooltip: {
        shared: true,
      },
      xAxis: {
        categories: [
          "Overpriced",
          "Small portions",
          "Wait time",
          "Food is tasteless",
          "No atmosphere",
          "Not clean",
          "Too noisy",
          "Unfriendly staff",
        ],
        crosshair: true,
      },
      yAxis: [
        {
          title: {
            text: "",
          },
        },
        {
          title: {
            text: "",
          },
          minPadding: 0,
          maxPadding: 0,
          max: 100,
          min: 0,
          opposite: true,
          labels: {
            format: "{value}%",
          },
        },
      ],
      series: [
        {
          type: "pareto",
          name: "Pareto",
          yAxis: 1,
          zIndex: 10,
          baseSeries: 1,
          tooltip: {
            valueDecimals: 2,
            valueSuffix: "%",
          },
          point: {
            events: {
              click: function () {
                console.log("series line click");
              },
            },
          },
        },
        {
          name: "Complaints",
          type: "column",
          zIndex: 2,
          data: [755, 222, 151, 86, 72, 51, 36, 10],
          point: {
            events: {
              click: function () {
                console.log("series bar click");
              },
            },
          },
        },
      ],
    });
  }
  private createChart2(): void {
    this.chart2 = Highcharts.chart("item2-chart", {
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: 1,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Browser market shares in May, 2020",
        align: "left",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "Chrome",
              y: 70.67,
              sliced: true,
              selected: true,
            },
            {
              name: "Edge",
              y: 14.77,
            },
            {
              name: "Firefox",
              y: 4.86,
            },
            {
              name: "Safari",
              y: 2.63,
            },
            {
              name: "Internet Explorer",
              y: 1.53,
            },
            {
              name: "Opera",
              y: 1.4,
            },
            {
              name: "Sogou Explorer",
              y: 0.84,
            },
            {
              name: "QQ",
              y: 0.51,
            },
            {
              name: "Other",
              y: 2.6,
            },
          ] as Highcharts.PointOptionsObject[],
        },
      ] as Highcharts.SeriesOptionsType[],
    });
  }
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
