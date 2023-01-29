import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AvailableTags} from "../../../lib/types/Metrics.types";
import {NgForOf, NgIf} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-actuator-tags',
  templateUrl: './actuator-tags.component.html',
  styleUrls: ['./actuator-tags.component.scss'],
  imports: [
    NgForOf,
    FontAwesomeModule,
    NgIf
  ],
  standalone: true
})
export class ActuatorTagsComponent {

  selectedTag: AvailableTags | null = null;
  selectedFilters: string[] = [];
  @Input() availableTags: AvailableTags[] | null = null;
  @Output() selectedFiltersChange = new EventEmitter<string[]>();

  showOptions(tag: AvailableTags) {
    if (this.selectedTag?.tag == tag.tag) {
      this.selectedTag = null;
    }else {
      this.selectedTag = tag;
    }
  }

  selectFilter(selectedTag: AvailableTags, option: string) {
    const filterString = selectedTag.tag + ':' + option;
    if (this.selectedFilters.includes(filterString)) {
      this.selectedFilters = this.selectedFilters.filter(filter => filter != filterString);
    }else {
      this.selectedFilters.push(filterString);
    }
    this.selectedFiltersChange.emit(this.selectedFilters);
  }

  removeFilter(filter: string) {
    this.selectedFilters = this.selectedFilters.filter(f => f != filter);
    this.selectedFiltersChange.emit(this.selectedFilters);
  }
}
