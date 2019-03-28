import { FunfactService } from '../services/funfact.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit {
  myForm: FormGroup;
  startDate: Date;
  endDate: Date;
  displayResults = false;

  // a
  daysBetween: number;
  // b
  startDateMomentIsLeap: boolean;
  endDateMomentIsLeap: boolean;
  // c
  mondaysBetween: number;
  // d
  funFactMessage = '';


  constructor(private formBuilder: FormBuilder, private funFactService: FunfactService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      range: null
    });

  }
  calculateDates(data) {
    console.log(data);
    // const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.startDate = data.range[0];
    this.endDate = data.range[1];
    // const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

    const startDateMoment = moment(data.range[0]);
    const endDateMoment = moment(data.range[1]);
    this.daysBetween = endDateMoment.diff(startDateMoment, 'days');

    this.startDateMomentIsLeap = moment([startDateMoment.year()]).isLeapYear();
    this.endDateMomentIsLeap = moment([endDateMoment.year()]).isLeapYear();

    const tmp = startDateMoment.clone().day(1);
    const mondaysArray = [];
    if (tmp.isBefore(startDateMoment, 'd')) {
      tmp.add(7, 'days');
    }
    while (tmp.isBefore(endDateMoment)) {
      tmp.add(7, 'days');
      mondaysArray.push(tmp.format('YYYY-MM-DD'));
    }
    // console.log('Mondays between dates: ', mondaysArray.length);
    this.mondaysBetween = mondaysArray.length;

    this.funFactService.get(data.range[0])
      .then((response: any) => {
        this.funFactMessage = response.text;
      })
      .catch((err) => {
        this.funFactMessage = 'There was an error while retrieving the fun fact of the start date' + JSON.stringify(err);
      });
    // render guard
    this.displayResults = true;
  }


}
