import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FuncsService } from 'src/app/services/funcs.service';
import { UiService } from 'src/app/services/ui.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  jobs: { title: string; content: string }[];
  activeForm: 'hiring' | 'general' | 'subcontractors' = 'general';
  hiring: any;
  subscriptions: Subscription[] = []
  
  constructor(
    private afs: AngularFirestore,
    private gaService: GoogleAnalyticsService,
    private uiService: UiService,
    private funcs: FuncsService,
    private elemRef: ElementRef,
  private ngZone: NgZone) { }

  ngOnInit() {
    this.uiService.setHasOverlayNav(false);

    return this.subscriptions.push(this.afs.doc('public/hiring').get().pipe(
      map(res => {
        console.log({res})
        const doc: {[key:string]: any} = res.data();
        this.hiring = doc;
        this.jobs = doc.jobs.map(j => {
          return {
            ...j,
            content: j.content.split('<strong>').join('<h3>').split('</strong>').join('</h3>').split('<br>').join('</p><p>')
          }
        });
        return this.hiring
      })).subscribe())
  }

  scrollToOpenPanel() {
    const offset = 60;
    return this.ngZone.runOutsideAngular(() => {
      this.funcs.setTimeout$(() => {
        scrollTo({ top: this.elemRef.nativeElement.querySelector('.inquire-jobs .mat-expanded').offsetTop - offset, behavior: 'smooth' })
      }, 500)
    })
  }

  formSubmitted(event) {
    const { formKey = null, data } = event;
    if (!!!formKey) return;
    this.gaService.eventEmitter('form', 'form_submission', `submitted_${formKey}_form`, `${formKey}_form`)
  }

}
