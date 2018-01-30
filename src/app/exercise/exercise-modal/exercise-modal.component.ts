import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

import { ModalComponent, Exercise, CoreApiService, ExerciseType, AuthService } from '../../shared';

@Component({
  selector: 'ft-exercise-modal',
  templateUrl: './exercise-modal.component.html',
  styleUrls: ['./exercise-modal.component.css']
})
export class ExerciseModalComponent implements OnInit {

  @Input() exercise: Exercise; 
  @Output() hidden: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ModalComponent) ftModalComponent: ModalComponent;
  
  exerciseTypes: ExerciseType[] = [];
  modalOptions: any = {
    backdrop: false,
    show: true
  };

  constructor(private coreApiSvc: CoreApiService, private authSvc: AuthService) { }

  ngOnInit() {
    this.getExerciseTypes();
  }

  getExerciseTypes() {
    this.coreApiSvc.get('/exerciseTypes').subscribe((result) => {
      this.exerciseTypes = result;
    });
  }

  onHidden() {
    this.hidden.emit(null);
  }

  onClose() {
    this.ftModalComponent.hide();
  }

  onSave() {
    if (this.exercise.id == 0) {
      this.exercise.userId = this.authSvc.userId;
      delete this.exercise.created;
      this.coreApiSvc.post(`/exercises`, this.exercise).subscribe((result) => {
        this.onClose();
      });
    } else {
      this.coreApiSvc.put(`/exercises/${this.exercise.id}`, this.exercise).subscribe((result) => {
        this.onClose();
      });
    }
  }

}
