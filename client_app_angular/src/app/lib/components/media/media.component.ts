import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SnackbarService} from "../../services/layout/snackbar.service";
import {randomBucketSuffix} from "../../helpers/Randomizer";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnChanges {

  @Input() buckets: any = []
  @ViewChild('fileInput') fileInput: any

  perPage: number = 15
  offset: number = 0
  hasNextPage: boolean = true
  hasPreviousPage: boolean = false

  get currentPage() : number {
    return this.offset / this.perPage + 1
  }

  activeBucket: string = ''
  files: any = []

  constructor(
    private snackbar: SnackbarService
  ) {}


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['buckets']) {
      this.activeBucket = this.buckets[0].name
      this.loadBucketFiles(this.activeBucket)
    }
  }

  async loadBucketFiles(bucket: string) {
    this.activeBucket = bucket


  }

  async loadBuckets() {

  }

  async createBucket(name: string, isPublic: boolean, modalRef: HTMLInputElement) {

  }

  async uploadFile(event: any) {
    const file = event.target.files[0]

    /*if (file.type != 'image/jpeg' || file.type != 'image/jpg' || file.type != 'image/png') {
      this.snackbar.addMessage({
        message: file.type + " file type is not allowed",
        severity: 'error',
        type: 'validation'
      })
      return;
    }*/


  }

  onPageChange(page: number) {
    this.offset = (page - 1) * this.perPage
    this.loadBucketFiles(this.activeBucket)
  }
}
