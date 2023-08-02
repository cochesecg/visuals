import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-big-number",
  templateUrl: "./big-number.component.html",
  styleUrls: ["./big-number.component.scss"],
})
export class BigNumberComponent implements OnInit {
  @Input() title: string;
  @Input() mainValue: string;
  @Input() secondaryValue: string;
  @Input() secondaryColor: string;
  constructor() {}

  ngOnInit(): void {}
}
