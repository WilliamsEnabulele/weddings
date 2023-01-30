import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { WishesService } from 'src/app/services/wishes.service';
import { Wish } from 'src/app/types/wish';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  isModalOpen = false;
  avatarSize = 25;
  wishes!: Wish[];
  title = "Wishes";
  activeSlide = 1;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    createdAt: new FormControl(Date.now().toString())
  });

  constructor(private wishesService: WishesService) {}

  ngOnInit() {
    this.getWishes();
  }

  getWishes() {
    this.wishesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.wishes = data;
    });
  }

  submit() {
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

  get fc(){
    return this.form.controls;
  }



}
