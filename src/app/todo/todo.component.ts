import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../Model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  todoform!: FormGroup;

  task: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];

  updateIndex: any;
  isEdit: boolean = false;

  constructor(private formbuiler: FormBuilder) { }

  ngOnInit(): void {
    this.todoform = this.formbuiler.group({
      item: ['', Validators.required]
    })
  }

  //add task function
  addtask() {
    this.task.push({
      description: this.todoform.value.item,
      done: false,
    });
    this.todoform.reset();
  }

  //edit
  onEdit(item: ITask, i: number) {
    this.todoform.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEdit = true;
  }

  //update
  Updatetask() {
    this.task[this.updateIndex].description = this.todoform.value.item;
    this.task[this.updateIndex].done = false;
    this.todoform.reset();
    this.updateIndex = undefined;
    this.isEdit = false;
  }

  //delete task function
  deletetask(i: number) {
    this.task.splice(i, 1)
  }

  //delete in progress
  deleteinprogress(i: number) {
    this.inprogress.splice(i, 1)
  }

  //delete done
  deletedone(i: number) {
    this.done.splice(i, 1)
  }

  //drop event
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
