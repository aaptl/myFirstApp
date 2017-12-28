import { Component, OnInit } from '@angular/core';
import { ContactService} from '../contact.service'
import { Contact } from '../contact'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers : [ContactService]
})
export class ContactComponent implements OnInit {
  contacts:Contact[];
  contact:Contact;
  first_name:string;
  last_name:string;
  phone:string;

  constructor(private _contactService : ContactService) { }

  addContact()
  {
    const newContact={
      first_name:this.first_name,
      last_name:this.last_name,
      phone:this.phone

    }
    this._contactService.addContact(newContact)
    .subscribe(Contact=>{
      this.contacts.push(Contact)
      this._contactService.getContacts()
    .subscribe(contacts=>this.contacts =contacts);
    })
    
  }

  deleteContact(id : any)
  {
    
    var contacts=this.contacts;
    this._contactService.deleteContact(id)
    .subscribe(data=>{
      if(data.n==1)
      {
        for(var i=0;i<contacts.length;i++)
        {
          if(contacts[i]._id==id)
          {
            contacts.splice(1,1)
          }
        }
      }
      this._contactService.getContacts()
      .subscribe(contacts=>this.contacts =contacts);
    })
   
  }

  ngOnInit() {
    this._contactService.getContacts()
    .subscribe(contacts=>this.contacts =contacts);
  }

}
