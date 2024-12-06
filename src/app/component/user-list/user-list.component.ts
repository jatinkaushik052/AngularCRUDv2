import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  currentPage = 1;
  itemsPerpage = 7;
  pageData: any[] = []; //The data from the current page
  userValues: any[] = [];

  isDeletepop: boolean = false
  deleteId: any

  constructor(private router: Router) { } //this is used to redirect to another page

  ngOnInit(): void {
    this.loadData();
  }

  //load data from local storage
  loadData():void {
    const localData = localStorage.getItem('userList')
    if (localData !== null) {
      this.userValues = JSON.parse(localData);
      this.updatePage();
      }
  }

  //update the page data when the current page changed
  updatePage():void {
    const startIndex = (this.currentPage - 1) * this.itemsPerpage;
    const endIndex = startIndex + this.itemsPerpage;
    this.pageData = this.userValues.slice(startIndex, endIndex)
    console.log(this.pageData)
  }

  // navigate to the next page
  nextPage(): void{
    if(this.currentPage < this.totalPage()){
      this.currentPage++;
      this.updatePage();
    }
  }

  // navigate to the previous page
  prePage(){
    if(this.currentPage>1){
      this.currentPage--;
      this.updatePage();
    }
  }

  //navigate  to the specific page
  // gotoPage(page: number){
  //   if(page >=1 && page<= this.totalPage()){
  //     this.currentPage=page;
  //     this.updatePage();
  //   }
  // }

  totalPage(): number {
    return Math.ceil(this.userValues.length / this.itemsPerpage);
  }


  onEdit(id: number) {
    this.router.navigate(['/adduser', id])
  }

  showPopup() {
    this.isDeletepop = true;
  }
  closeModal() {
    this.isDeletepop = false;
  }
  onDelete(id: number) {
    this.isDeletepop = true;
    this.deleteId = id;

  }

  deleteData() {
    this.isDeletepop = false;
    const index = this.userValues.findIndex((m: any) => m.id == this.deleteId)
    this.userValues.splice(index, 1)
    localStorage.setItem('userList', JSON.stringify(this.userValues))
    this.updatePage();
  }
}
