import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './supabase-image.component.html',
  styleUrls: ['./supabase-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupabaseImage implements OnChanges{

  @Input() src!: string;
  @Input() bucket!: string;

  publicUrl!: string

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src']?.currentValue) {
      this.getPublicUrl(changes['src'].currentValue);
    }
  }

  getPublicUrl(src: string) {

  }
}
