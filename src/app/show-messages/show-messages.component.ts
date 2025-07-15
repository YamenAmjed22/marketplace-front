import { Component } from '@angular/core';
import { RegistrationService } from '../Services/registration.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'nzrm-ng';


export interface ContactUs {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-show-messages',
  imports: [CommonModule],
  templateUrl: './show-messages.component.html',
  styleUrl: './show-messages.component.scss'
})
export class ShowMessagesComponent {

  contactUs: ContactUs[] | undefined;
  isAdmin:boolean = true;

  constructor(
    private registrationService: RegistrationService,
    private notif: NotificationService
  ) { }

  ngOnInit(): void {
    this.registrationService.getAllContactMessages().subscribe({
      next: (data: any) => {
        console.log("Got all contatctUsMessages: ", data);
        this.contactUs = data;
      },
      error: (error) => {
        console.error('Failed to fetch contact:', error);
      }
    });
  }


  deleteMessage(id: any) {
    this.registrationService.deleteContactMessage(id).subscribe({
      next: (data: any) => {
        this.notif.success("Success", "The Message Deleted Success !")
        console.log("message deleted");
        this.ngOnInit();
      },
      error: (error) => {
        this.notif.error("Error", "You can not make delete for this messages !")

        console.error("the message not deleted", error);
        this.isAdmin= false;

      }
    })
  }

}
