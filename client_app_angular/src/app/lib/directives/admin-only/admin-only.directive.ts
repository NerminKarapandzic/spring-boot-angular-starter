import {Directive, ElementRef, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subject, takeUntil} from "rxjs";

@Directive({
  selector: '[appAdminOnly]'
})
export class AdminOnlyDirective implements OnInit{

  authService = inject(AuthService)
  elementRef =  inject(ElementRef)

  destroyed: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.authService.logedInUSer$.pipe(
      takeUntil(this.destroyed),
    ).subscribe(currentUser => {
      console.log('currentUser: ', currentUser);
      if(!currentUser || !currentUser.roles.includes('SUPER_ADMIN')) {
        this.elementRef.nativeElement.style.display = 'none';
      }
    })
  }
}
