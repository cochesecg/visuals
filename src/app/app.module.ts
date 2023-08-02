import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BigNumberComponent } from "./components/big-number.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// Import angular-fusioncharts
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as Power from "fusioncharts/fusioncharts.powercharts";
import * as Widget from "fusioncharts/fusioncharts.widgets";
import * as Gantt from "fusioncharts/fusioncharts.gantt";

import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(
  FusionCharts,
  Charts,
  Gantt,
  Widget,
  Power,
  FusionTheme
);

import { FusionComponent } from "./components/fusion.component";
import { HighchartsComponent } from "./components/highcharts.component";

@NgModule({
  declarations: [
    AppComponent,
    BigNumberComponent,
    FusionComponent,
    HighchartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FusionChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
