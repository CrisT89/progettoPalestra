import { TestComponent } from './components/test-component/test-component';
import { ComponentMapperService } from './services/componentMapper.service';
import { Component, HostListener, Inject, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FixTemplateService } from './services/fixtemplate.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<app-spinner></app-spinner><router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnChanges {
  window: Window;
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private templateFixService: FixTemplateService) { }

  /**
     *
     * @param event
     */
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.templateFixService.fixTemplate(event, this.document, this.renderer);
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.mapComponent();
    this.onResize(this.document.defaultView);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  mapComponent() {
    //Registro i componenti per la lookup
    ComponentMapperService.register('app-test', TestComponent);
  }
}
