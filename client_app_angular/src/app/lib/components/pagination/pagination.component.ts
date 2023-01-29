import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() currentPage: number = 0
  @Input() hasNext: boolean = true
  @Input() hasPrevious: boolean = false

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>()


  onPageChange(page: number) {
    this.pageChange.emit(page)
  }
}
