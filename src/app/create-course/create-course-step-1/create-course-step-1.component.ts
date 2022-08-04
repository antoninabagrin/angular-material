import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";

const SAMPLE_TEXT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde, qui beatae accusamus incidunt quibusdam hic expedita at inventore! Repellat a dignissimos officiis error nostrum aliquid doloremque itaque nihil ea!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde, qui beatae accusamus incidunt quibusdam hic expedita at inventore! Repellat a dignissimos officiis error nostrum aliquid doloremque itaque nihil ea!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde, qui beatae accusamus incidunt quibusdam hic expedita at inventore! Repellat a dignissimos officiis error nostrum aliquid doloremque itaque nihil ea!";
@Component({
  selector: "create-course-step-1",
  templateUrl: "create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component {
  form = this.fb.group({
    title: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
    ],
    releasedAt: [new Date(), Validators.required],
    category: ["BEGINNER", Validators.required],
    courseType: ["premium", Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [
      SAMPLE_TEXT,
      [Validators.required, Validators.minLength(3)],
    ],
  });
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if (view == "month") {
      return date == 1 ? "highlight-date" : "";
    }
    return "";
  };

  constructor(private fb: UntypedFormBuilder) {}

  get courseTitle() {
    return this.form.controls["title"];
  }
}
