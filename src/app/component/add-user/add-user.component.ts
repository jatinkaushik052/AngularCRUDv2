import { CommonModule } from '@angular/common';
import { Component, OnInit ,} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  isModalShow: boolean = false;
  isModalShowUpdate : boolean = false

  addUserForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(),
    email: new FormControl(),
    department: new FormControl(),
    state: new FormControl(),
  })

  userValues: any[] = []; // this is for storing values of addUserForm

  //target Id
  currentId: number = 0;
  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((res: any) => {
      debugger;
      if (res.id) {
        this.currentId = res.id;
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // fetching data in localstorage 
    const gettingData = localStorage.getItem('userList');
    debugger;
    if (gettingData !== null) {
      this.userValues = JSON.parse(gettingData);
      debugger;
      // for updating data by ID
      if (this.currentId !== 0) {
        const currentRecord = this.userValues.find((m: any) => m.id === Number(this.currentId))
        if (currentRecord !== undefined) {
          debugger
          this.addUserForm.patchValue({
            name: currentRecord?.name,
            email: currentRecord?.email,
            department: currentRecord?.department,
            state: currentRecord?.state
          })

        }
      }
    }
  }

  // open Modal
  openModal() {
    this.isModalShow = true;
  }
  // close modal
  closeModal() {
    this.isModalShow = false
    this.isModalShowUpdate = false
  }

  // Adding Data
  onAdd() {
    this.openModal();
    const payload = {
      id: 0,
      name: this.addUserForm.value?.name,
      email: this.addUserForm.value?.email,
      department: this.addUserForm.value?.department,
      state: this.addUserForm.value?.state
    }

    // getting data form local storage
    const localData = localStorage.getItem('userList');
    if (localData == null) { //when there is no data in local storage
      payload.id = 1;
      this.userValues.push(payload);
      localStorage.setItem('userList', JSON.stringify(this.userValues))
    }
    else {
      const parseData = JSON.parse(localData);
      payload.id = parseData.length + 1;
      this.userValues.push(payload)
      parseData.push(payload)
      localStorage.setItem('userList', JSON.stringify(parseData))
    }
  }



 
  // for data edit
  onUpdate(){
    this.isModalShowUpdate = true
    const currentData= this.userValues.find((m:any)=> m.id == this.currentId )
    if(currentData != undefined){
      currentData.name= this.addUserForm.get('name')?.value;
      currentData.email= this.addUserForm.get('email')?.value;
      currentData.department= this.addUserForm.get('department')?.value;
      currentData.state= this.addUserForm.get('state')?.value;
    }
    localStorage.setItem('userList',JSON.stringify(this.userValues))
  }
}
