import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    alert('Thanks for contacting us! We will get in touch with you shortly ...');
    return false;
  }

}
