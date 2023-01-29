import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-media-page',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit{

  gallery: string[] = []
  buckets: any = []

  constructor(
  ) {}

  async ngOnInit() {
  }

  async createBucket(name: string) {
  }
}
