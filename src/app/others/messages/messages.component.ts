import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'] // Asegúrate de usar 'styleUrls' en lugar de 'styleUrl'
})
export class MessagesComponent {
  @Input() alertColor: string = '';
  @Input() iconName: string = '';
  @Input() message: string = '';

  ngOnInit(): void {

      this.alertColor = this.alertColor;
      this.iconName =this.iconName;
      this.message = this.message;
  }
}

