import { Component, Input, OnInit } from '@angular/core';
import { ContentBlock } from 'src/app/models/entity-options.models';

@Component({
  selector: 'lib-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.scss']
})
export class TestimonialCardComponent implements OnInit {

  @Input() block: ContentBlock

  constructor() { }

  ngOnInit(): void {
  }

}
