import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() name!: string;
  @Input() size!: number;
  @Input() id!: number;
  canvas!: HTMLCanvasElement;
  context: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.canvas = this.el.nativeElement.querySelector('canvas');
    this.generateAvatar();
  }

  generateAvatar() {
    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.size, this.size);

    //Draw background
    this.context.fillStyle = this.getRandomColor();
    this.context.fillRect(0, 0, this.size, this.size);

    //Draw text
    this.context.font = `${this.size / 2}px Arial`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'white';
    this.context.fillText(this.name.charAt(0).toUpperCase(), this.size / 2, this.size / 2);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
