import { Component, Input, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from "../course-dialog/course-dialog.component";
import { filter } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[];
  cols = 3;
  rowHeight = "500px";

  handsetPortrait = false;

  constructor(
    private dialog: MatDialog,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit() {
    this.responsive
      .observe([
        Breakpoints.Tablet,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
      ])
      .subscribe((result) => {
        this.cols = 3;
        this.rowHeight = "500px";
        this.handsetPortrait = false;

        const breakppoints = result.breakpoints;

        if (breakppoints[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        } else if (breakppoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.rowHeight = "430px";
          this.handsetPortrait = true;
        } else if (breakppoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
        } else if (breakppoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        }
      });
  }

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(filter((val) => !!val))
      .subscribe((val) => console.log("New course value:", val));
  }
}
