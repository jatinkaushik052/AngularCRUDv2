import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
@Input() totalItems: any;
@Input() currentPage: any;
@Input() itemsPerPage: any;
totalpage=0;


}
