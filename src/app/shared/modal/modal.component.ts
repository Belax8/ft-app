import { Component, OnInit, Input, Output, EventEmitter, HostBinding, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
declare var jQuery: any;


@Component({
  selector: 'ft-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() options: any = {};

  @Output() shown: EventEmitter<any> = new EventEmitter<any>();
  @Output() hidden: EventEmitter<any> = new EventEmitter<any>();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.modal') classModal = true;
  @HostBinding('class.fade') classFade = true;

  public elem: HTMLElement;
  private modal: any;

  constructor(elementRef: ElementRef) {
    this.elem = elementRef.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    jQuery(this.elem).modal(jQuery.extend({
      backdrop: true,
      keyboard: true,
      show: false
    }, this.options));

    this.modal = jQuery(this.elem).data('bs.modal');
    this.subscribeToModalEvents();
  }

  handleHeightAdjustment() {
    jQuery(this.elem).modal('handleUpdate');
  }

  hide() {
    jQuery(this.elem).modal('hide');
  }

  isVisible() {
    return this.modal && this.modal.isShown;
  }

  show() {
    jQuery(this.elem).modal('show');
  }

  subscribeToModalEvents() {
    jQuery(this.elem).on('shown.bs.modal', () => {
      this.shown.emit(null);
    });

    jQuery(this.elem).on('hidden.bs.modal', () => {
      this.hidden.emit(null);
    });

    jQuery(this.elem).on('loaded.bs.modal', () => {
      this.loaded.emit(null);
    })
  }

  toggle() {
    jQuery(this.elem).modal('toggle');
  }

  ngOnDestroy() {
    // jQuery(this.elem).data('bs.modal', null);
  }

}
