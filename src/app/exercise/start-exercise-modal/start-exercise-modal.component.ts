import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { ModalComponent, Exercise, ExerciseType, CoreApiService, AuthService } from '../../shared';

@Component({
  selector: 'ft-start-exercise-modal',
  templateUrl: './start-exercise-modal.component.html',
  styleUrls: ['./start-exercise-modal.component.css']
})
export class StartExerciseModalComponent implements OnInit {

  @Output() hidden: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ModalComponent) ftModalComponent: ModalComponent;

  exercise: Exercise = new Exercise();

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
    // Format data
    this.exercise.userId = this.authSvc.userId;
    delete this.exercise.created;
    this.exercise.startTime = moment().toISOString();
    // Create exercise
    this.coreApiSvc.post(`/exercises`, this.exercise).subscribe((result) => {
      this.onClose();
    });
  }

}
