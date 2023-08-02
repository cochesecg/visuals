import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as FusionCharts from "fusioncharts";

interface SeriesData extends Highcharts.PointOptionsObject {
  grade?: string;
}
@Component({
  selector: "app-fusion",
  templateUrl: "./fusion.component.html",
  styleUrls: ["./fusion.component.scss"],
})
export class FusionComponent implements OnInit {
  regularChartDataSource: Object | undefined;
  customChartDataSource: Object | undefined;
  clickActionChartDataSource: Object | undefined;
  customBarChartDataSource: Object | undefined;
  ganttChartDataSource: Object | undefined;
  barDrilldownChartDataSouce: Object | undefined;
  chart1DataSource: Object | undefined;
  chart2DataSource: Object | undefined;
  chart2: any;
  // customHideableChart: Highcharts.Chart | undefined;
  // customHideChart: Highcharts.Chart | undefined;
  // chart1: Highcharts.Chart | undefined;
  // chart2: Highcharts.Chart | undefined;
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
    { label: "class 1", grade: "1", sessions: 2, value: 40 },
    { label: "class 2", grade: "2", sessions: 3, value: 60 },
    { label: "class 3", grade: "3", sessions: 4, value: 86 },
    { label: "class 4", grade: "4", sessions: 8, value: 20 },
    { label: "class 5", grade: "1", sessions: 7, value: 10 },
    { label: "class 6", grade: "2", sessions: 9, value: 15 },
    { label: "class 7", grade: "3", sessions: 55, value: 8 },
    { label: "class 8", grade: "4", sessions: 0, value: 20 },
  ];

  public ngAfterViewInit(): void {}

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.customBarChartForm = this.fb.group({
      grade: [null],
      class: [null],
    });
    this.basicLineChart();
    this.customLineChart();
    this.clickActionLineChart();
    this.createCustomBarChart();
    this.createGanttChart();
    this.createHideChart();
    this.createChart1();
    this.createChart2();
  }
  ngDoCheck() {
    if (!this.hideChart && !this.barDrilldownChartDataSouce) {
      console.log("create hide chart");
      this.createHideChart();
    }
  }
  private basicLineChart(): void {
    this.regularChartDataSource = {
      chart: {
        caption: "Fruit Consumption",
        yaxisname: "fruit eaten",
        theme: "fusion",
      },
      categories: [
        {
          category: [
            {
              label: "Apples",
            },
            {
              label: "Bananas",
            },
            {
              label: "Oranges",
            },
          ],
        },
      ],
      dataset: [
        {
          seriesname: "Jane",
          data: [
            {
              value: "1",
            },
            {
              value: "0",
            },
            {
              value: "4",
            },
          ],
        },
        {
          seriesname: "John",
          data: [
            {
              value: "5",
            },
            {
              value: "7",
            },
            {
              value: "3",
            },
          ],
        },
      ],
    };
  }
  private customLineChart(): void {
    this.customChartDataSource = {
      chart: {
        caption: "Fruit Consumption",
        captionFont: "Arial",
        captionFontSize: "36",
        captionFontColor: "#4572A7",
        captionAlignment: "right",
        yaxisname: "fruit eaten",
        theme: "fusion",
        legendCaption: "Legend title",
        legendCaptionBold: "1",
        legendCaptionFontColor: "#ff00f",
        legendPosition: "right",
        legendItemFont: "Roboto, sans-serif",
        plottooltext: (function (label, value, seriesname) {
          if (label == "Apples") {
            return (
              "<span>The value for <b>!" +
              label +
              "!</b> is <b class='red'>" +
              value +
              "</b>, in series " +
              seriesname +
              "</span>"
            );
          } else {
            return (
              '<span>The value for <b class="green">?' +
              label +
              "?</b> is <b>" +
              value +
              "</b>, in series " +
              seriesname +
              "</span>"
            );
          }
        })("$label", "$dataValue", "$seriesName"),
      },
      categories: [
        {
          category: [
            {
              label: "Apples",
            },
            {
              label: "Bananas",
            },
            {
              label: "Oranges",
            },
          ],
        },
      ],
      dataset: [
        {
          seriesname: "Jane",
          color: "#ff0000",
          data: [
            {
              value: "1",
            },
            {
              value: "0",
            },
            {
              value: "4",
            },
          ],
        },
        {
          seriesname: "John",
          data: [
            {
              value: "5",
            },
            {
              value: "7",
            },
            {
              value: "3",
            },
          ],
        },
      ],
    };
  }
  private clickActionLineChart(): void {
    this.clickActionChartDataSource = {
      chart: {
        caption: "Fruit Consumption",
        yaxisname: "fruit eaten",
        theme: "fusion",
      },
      categories: [
        {
          category: [
            {
              label: "Apples",
            },
            {
              label: "Bananas",
            },
            {
              label: "Oranges",
            },
          ],
        },
      ],
      dataset: [
        {
          seriesname: "Jane",
          data: [
            {
              value: "1",
            },
            {
              value: "0",
            },
            {
              value: "4",
            },
          ],
        },
        {
          seriesname: "John",
          data: [
            {
              value: "5",
            },
            {
              value: "7",
            },
            {
              value: "3",
            },
          ],
        },
      ],
    };
    //onclick
    document.querySelector(".action1")?.addEventListener("click", () => {
      this.clickActionChartDataSource = Object.assign(
        {},
        this.clickActionChartDataSource,
        {
          categories: [
            {
              category: [
                {
                  label: "Apples",
                },
                {
                  label: "Bananas",
                },
                {
                  label: "Oranges",
                },
                { label: "Pears" },
                { label: "Grapes" },
              ],
            },
          ],
          dataset: [
            {
              seriesname: "Jane",
              data: [
                {
                  value: "1",
                },
                {
                  value: "0",
                },
                {
                  value: "4",
                },
              ],
            },
            {
              seriesname: "John",
              data: [
                {
                  value: "5",
                },
                {
                  value: "7",
                },
                {
                  value: "3",
                },
              ],
            },
            {
              seriesname: "new series",
              data: [
                {
                  value: "1",
                },
                {
                  value: "2",
                },
                {
                  value: "3",
                },
                {
                  value: "4",
                },
                {
                  value: "5",
                },
              ],
            },
          ],
        }
      );
    });
    //onclick
    document.querySelector(".action2")?.addEventListener("click", () => {
      this.clickActionChartDataSource = Object.assign(
        {},
        this.clickActionChartDataSource,
        {
          categories: [
            {
              category: [
                {
                  label: "Apples",
                },
                {
                  label: "Bananas",
                },
                {
                  label: "Oranges",
                },
              ],
            },
          ],
          dataset: [
            {
              seriesname: "Jane",
              data: [
                {
                  value: "1",
                },
                {
                  value: "0",
                },
                {
                  value: "4",
                },
              ],
            },
            {
              seriesname: "John",
              data: [
                {
                  value: "5",
                },
                {
                  value: "7",
                },
                {
                  value: "3",
                },
              ],
            },
          ],
        }
      );
    });
  }
  private createCustomBarChart(): void {
    this.customBarChartDataSource = {
      chart: {
        caption: "Class stuff",
        captionAlignment: "left",
        yaxisname: "hours",
        theme: "fusion",
        divLineThickness: "0",
        plottooltext:
          '<span class="mb-2">students: ' +
          "$label" +
          "</span><br>" +
          '<span class="mb-2 green">sessions: ' +
          "$value" +
          "</span><br>" +
          '<span class="mb-2 red">calculated: fail calulation' +
          ("$dataValue" + this.getRandomNumber(1, 100)) +
          "</span><br>" +
          '<span class="mb-2 red">weird special option: ' +
          "fail" +
          "</span><br>",
      },

      data: this.getSeriesData(),
    };
    // var _this = this;
    // this.customBarChart = Highcharts.chart('custom-bar-chart', {
    //   chart: {
    //     type: 'bar',
    //   },
    //   title: {
    //     text: 'Class stuff',
    //     align: 'left',
    //   },
    //   xAxis: {
    //     categories: this.getCategoriesData(),
    //     title: {
    //       text: null,
    //     },
    //     gridLineWidth: 0,
    //     lineWidth: 0,
    //   },
    //   yAxis: {
    //     min: 0,
    //     title: {
    //       text: 'hours',
    //       align: 'low',
    //     },
    //     lineWidth: 0,
    //     gridLineWidth: 0,
    //     tickWidth: 1,
    //   },
    //   tooltip: {
    //     useHTML: true,
    //     formatter: function (item) {
    //       //   console.log("item", item);
    //       //   console.log("this.point", this.point);
    //       const customOptions = this.point.options as SeriesData;
    //       return (
    //         '<span class="mb-2">students: ' +
    //         this.x +
    //         '</span><br>' +
    //         '<span class="mb-2 green">sessions: ' +
    //         this.y +
    //         '</span><br>' +
    //         '<span class="mb-2 red">calculated: ' +
    //         (Number(this.y) + _this.getRandomNumber(1, 100)) +
    //         '</span><br>' +
    //         '<span class="mb-2 red">weird special option: ' +
    //         customOptions?.grade +
    //         '</span><br>'
    //       );
    //     },
    //   },
    //   plotOptions: {
    //     bar: {
    //       borderRadius: '50%',
    //       dataLabels: {
    //         enabled: true,
    //       },
    //       groupPadding: 0.1,
    //     },
    //   },
    //   legend: {
    //     enabled: false,
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'top',
    //     x: -40,
    //     y: 80,
    //     floating: true,
    //     borderWidth: 1,
    //     backgroundColor:
    //       Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
    //     shadow: true,
    //   },
    //   credits: {
    //     enabled: false,
    //   },
    //   series: [
    //     {
    //       data: this.getSeriesData(),
    //       type: 'column',
    //       cursor: 'pointer',
    //       point: {
    //         events: {
    //           click: function () {
    //             window.open(
    //               'https://www.google.com/search?q=' + this.options.name,
    //               '_blank'
    //             );
    //           },
    //         },
    //       },
    //     },
    //   ],
    // });
  }
  barChartClick(e: any) {
    window.open(
      "https://www.google.com/search?q=" + e?.dataObj?.categoryLabel,
      "_blank"
    );
  }
  barChartOptionChange(): void {
    this.customBarChartDataSource = Object.assign(
      {},
      this.customBarChartDataSource,
      { data: this.getSeriesData() }
    );
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
          )?.name === c.label
      )
      .map((c) => ({
        label: c.label,
        value: c.value,
        grade: c.grade,
      }));
  }
  // getCategoriesData(): string[] {
  //   return this.classes.map((c) => c.name);
  // }
  private createGanttChart(): void {
    this.ganttChartDataSource = {
      chart: {
        dateformat: "mm/dd/yyyy",
        caption: "Simple Gantt Chart",
        theme: "fusion",
      },
      tasks: {
        task: [
          {
            start: "11/18/2014",
            end: "11/25/2014",
            processId: "process1",
          },
          {
            start: "11/20/2014",
            end: "11/25/2014",
            processId: "process2",
          },
          {
            start: "11/23/2014",
            end: "11/26/2014",
            processId: "process3",
          },
          {
            start: "11/27/2014",
            end: "11/28/2014",
            processId: "process4",
          },
        ],
      },
      processes: {
        process: [
          {
            label: "Start prototype",
            id: "process1",
          },
          {
            label: "Develop",
            id: "process2",
          },
          {
            label: "Run acceptance tests",
            id: "process3",
          },
          {
            label: "Test prototype",
            id: "process4",
          },
        ],
      },
      categories: [
        {
          category: [
            {
              start: "11/17/2014",
              end: "11/17/2014",
              label: "M",
            },
            {
              start: "11/18/2014",
              end: "11/18/2014",
              label: "T",
            },
            {
              start: "11/19/2014",
              end: "11/19/2014",
              label: "W",
            },
            {
              start: "11/20/2014",
              end: "11/20/2014",
              label: "Th",
            },
            {
              start: "11/21/2014",
              end: "11/21/2014",
              label: "F",
            },
            {
              start: "11/22/2014",
              end: "11/22/2014",
              label: "Sa",
            },
            {
              start: "11/23/2014",
              end: "11/23/2014",
              label: "Su",
            },
            {
              start: "11/24/2014",
              end: "11/24/2014",
              label: "M",
            },
            {
              start: "11/25/2014",
              end: "11/25/2014",
              label: "T",
            },
            {
              start: "11/26/2014",
              end: "11/26/2014",
              label: "W",
            },
            {
              start: "11/27/2014",
              end: "11/27/2014",
              label: "Th",
            },
            {
              start: "11/28/2014",
              end: "11/28/2014",
              label: "F",
            },
            {
              start: "11/29/2014",
              end: "11/28/2014",
              label: "Sa",
            },
          ],
        },
      ],
    };
  }
  private createHideChart(): void {
    this.barDrilldownChartDataSouce = {
      chart: {
        caption: "Basic Drilldown",
        yaxisname: "Values",
        theme: "fusion",
      },
      data: [
        {
          label: "animals",
          value: "5",
          link: "newchart-xml-animals",
        },
        {
          label: "fruits",
          value: "2",
          link: "newchart-xml-fruits",
        },
        {
          label: "Cars",
          value: "4",
          link: "newchart-xml-cars",
        },
      ],
      linkeddata: [
        {
          id: "animals",
          linkedchart: {
            chart: {
              caption: "Basic Drilldown - Animals",
              yaxisname: "Values",
              theme: "fusion",
            },
            data: [
              {
                label: "cats",
                value: "4",
              },
              {
                label: "dogs",
                value: "2",
              },
              {
                label: "cows",
                value: "1",
              },
              {
                label: "sheep",
                value: "2",
              },
              {
                label: "pigs",
                value: "1",
              },
            ],
          },
        },
        {
          id: "fruits",
          linkedchart: {
            chart: {
              caption: "Basic Drilldown - Fruits",
              yaxisname: "Values",
              theme: "fusion",
            },
            data: [
              {
                label: "apples",
                value: "4",
              },
              {
                label: "oranges",
                value: "2",
              },
            ],
          },
        },
        {
          id: "cars",
          linkedchart: {
            chart: {
              caption: "Basic Drilldown - Cars",
              yaxisname: "Values",
              theme: "fusion",
            },
            data: [
              {
                label: "Toyota",
                value: "4",
              },
              {
                label: "Opel",
                value: "2",
              },
              {
                label: "Volkswagen",
                value: "2",
              },
            ],
          },
        },
      ],
    };
  }
  chartSwitch(): void {
    this.hideChart = !this.hideChart;
  }
  private createChart1(): void {
    this.chart1DataSource = {
      chart: {
        caption: "Retaurant Complaints",
        theme: "fusion",
        canvasTopPadding: "10",
        toolTipSepChar: " - ",
      },
      data: [
        {
          label: "Overpriced",
          value: "755",
        },
        {
          label: "Small portions",
          value: "222",
        },
        {
          label: "Wait time",
          value: "151",
        },
        {
          label: "Food is tasteless",
          value: "86",
        },
        {
          label: "No atmosphere",
          value: "72",
        },
        {
          label: "Not clean",
          value: "51",
        },
        {
          label: "Too noisy",
          value: "36",
        },
        {
          label: "Unfriendly staff",
          value: "10",
        },
      ],
    };
    // this.chart1 = Highcharts.chart("item1-chart", {
    //   chart: {
    //     type: "column",
    //     events: {
    //       click: function () {
    //         console.log("chart event");
    //         _this.chart2?.series[0].setData(
    //           [
    //             {
    //               name: "Edge",
    //               y: 14.77,
    //             },
    //             {
    //               name: "Firefox",
    //               y: 4.86,
    //             },
    //             {
    //               name: "Safari",
    //               y: 2.63,
    //             },
    //             {
    //               name: "Internet Explorer",
    //               y: 1.53,
    //               sliced: true,
    //               selected: true,
    //             },
    //             {
    //               name: "Opera",
    //               y: 1.4,
    //             },
    //             {
    //               name: "Sogou Explorer",
    //               y: 0.84,
    //             },
    //           ] as Highcharts.PointOptionsObject[],
    //           false
    //         );
    //         _this.chart2?.redraw();
    //       },
    //     },
    //   },
    //   title: {
    //     text: "Restaurants Complaints",
    //   },
    //   tooltip: {
    //     shared: true,
    //   },
    //   xAxis: {
    //     categories: [
    //       "Overpriced",
    //       "Small portions",
    //       "Wait time",
    //       "Food is tasteless",
    //       "No atmosphere",
    //       "Not clean",
    //       "Too noisy",
    //       "Unfriendly staff",
    //     ],
    //     crosshair: true,
    //   },
    //   yAxis: [
    //     {
    //       title: {
    //         text: "",
    //       },
    //     },
    //     {
    //       title: {
    //         text: "",
    //       },
    //       minPadding: 0,
    //       maxPadding: 0,
    //       max: 100,
    //       min: 0,
    //       opposite: true,
    //       labels: {
    //         format: "{value}%",
    //       },
    //     },
    //   ],
    //   series: [
    //     {
    //       type: "pareto",
    //       name: "Pareto",
    //       yAxis: 1,
    //       zIndex: 10,
    //       baseSeries: 1,
    //       tooltip: {
    //         valueDecimals: 2,
    //         valueSuffix: "%",
    //       },
    //       point: {
    //         events: {
    //           click: function () {
    //             console.log("series line click");
    //           },
    //         },
    //       },
    //     },
    //     {
    //       name: "Complaints",
    //       type: "column",
    //       zIndex: 2,
    //       data: [755, 222, 151, 86, 72, 51, 36, 10],
    //       point: {
    //         events: {
    //           click: function () {
    //             console.log("series bar click");
    //           },
    //         },
    //       },
    //     },
    //   ],
    // });
  }

  /**
   * something in chart 1 clicked do something to chart 2
   * @param e
   */
  chart1Click(e: any) {
    console.log("e", e);
    this.chart2.setJSONData(
      Object.assign({}, this.chart2DataSource, {
        data: [
          {
            label: "Edge",
            value: 14.77,
          },
          {
            label: "Firefox",
            value: 4.86,
          },
          {
            label: "Safari",
            value: 2.63,
          },
          {
            label: "Internet Explorer",
            value: 1.53,
            isSliced: true,
          },
          {
            label: "Opera",
            value: 1.4,
          },
          {
            label: "Sogou Explorer",
            value: 0.84,
          },
        ],
      })
    );
  }
  chart2DataInitialized(e: any) {
    this.chart2 = e.chart;
  }
  private createChart2(): void {
    this.chart2DataSource = {
      chart: {
        caption: "Browser market shares in May, 2020",
        captionAlignment: "left",
        theme: "fusion",
        showShadow: false,
        showLegend: false,
      },
      data: [
        {
          label: "Chrome",
          value: 70.67,
          isSliced: true,
        },
        {
          label: "Edge",
          value: 14.77,
        },
        {
          label: "Firefox",
          value: 4.86,
        },
        {
          label: "Safari",
          value: 2.63,
        },
        {
          label: "Internet Explorer",
          value: 1.53,
        },
        {
          label: "Opera",
          value: 1.4,
        },
        {
          label: "Sogou Explorer",
          value: 0.84,
        },
        {
          label: "QQ",
          value: 0.51,
        },
        {
          label: "Other",
          value: 2.6,
        },
      ],
    };
    // this.chart2 = Highcharts.chart("item2-chart", {
    //   chart: {
    //     plotBackgroundColor: undefined,
    //     plotBorderWidth: 1,
    //     plotShadow: false,
    //     type: "pie",
    //   },
    //   title: {
    //     text: "Browser market shares in May, 2020",
    //     align: "left",
    //   },
    //   tooltip: {
    //     pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    //   },
    //   accessibility: {
    //     point: {
    //       valueSuffix: "%",
    //     },
    //   },
    //   plotOptions: {
    //     pie: {
    //       allowPointSelect: true,
    //       cursor: "pointer",
    //       dataLabels: {
    //         enabled: true,
    //         format: "<b>{point.name}</b>: {point.percentage:.1f} %",
    //       },
    //     },
    //   },
    //   series: [
    //     {
    //       name: "Brands",
    //       colorByPoint: true,
    //       data: [
    //         {
    //           name: "Chrome",
    //           y: 70.67,
    //           sliced: true,
    //           selected: true,
    //         },
    //         {
    //           name: "Edge",
    //           y: 14.77,
    //         },
    //         {
    //           name: "Firefox",
    //           y: 4.86,
    //         },
    //         {
    //           name: "Safari",
    //           y: 2.63,
    //         },
    //         {
    //           name: "Internet Explorer",
    //           y: 1.53,
    //         },
    //         {
    //           name: "Opera",
    //           y: 1.4,
    //         },
    //         {
    //           name: "Sogou Explorer",
    //           y: 0.84,
    //         },
    //         {
    //           name: "QQ",
    //           y: 0.51,
    //         },
    //         {
    //           name: "Other",
    //           y: 2.6,
    //         },
    //       ] as Highcharts.PointOptionsObject[],
    //     },
    //   ] as Highcharts.SeriesOptionsType[],
    // });
  }
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
