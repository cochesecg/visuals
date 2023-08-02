import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HighchartsComponent } from "./components/highcharts.component";
import { FusionComponent } from "./components/fusion.component";

const routes: Routes = [
  { path: "highcharts", component: HighchartsComponent },
  { path: "fusion", component: FusionComponent },
  { path: "", redirectTo: "/highcharts", pathMatch: "full" },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
