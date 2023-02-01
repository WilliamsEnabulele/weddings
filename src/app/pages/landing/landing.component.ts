import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { WishesService } from 'src/app/services/wishes.service';
import { Wish } from 'src/app/shared/types/wish';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  loading = true;
  isModalOpen = false;
  avatarSize = 25;
  wishes!: Wish[];
  title = "Wishes";
  activeSlide = 1;
  activeIndex = 0;

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.wishes.length) % this.wishes.length;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.wishes.length;
  }

  autoSlide() {
    while (this.activeIndex != 0) {
      console.log('firing')
      if (this.activeIndex > 1) {
        this.nextSlide();
      }
      this.prevSlide();
    }
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    createdAt: new FormControl('')
  });

  constructor(private wishesService: WishesService) { }

  ngOnInit() {
    this.getWishes();
    this.autoSlide();
  }

  getWishes() {
    this.wishesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.wishes = data;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  submit() {
    this.form.value['createdAt'] = Date.now().toString();
    this.wishesService.create(this.form.value).then(() => {
      this.form.reset();
      this.handleModalClose();
    })
  }

  openModal() {
    this.isModalOpen = true;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }

  get fc() {
    return this.form.controls;
  }
}
