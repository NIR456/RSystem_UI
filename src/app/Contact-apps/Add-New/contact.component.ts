import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/Services/contact.service';
import { Requestmodels } from 'src/app/Models/request.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit, OnChanges {
  contactForm: FormGroup;
  public IsUpdate: boolean = false;
  @Input() data: any;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,private contactservice: ContactService) {
    this.contactForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]]
    });
  }

  ngOnInit(): void {
    if(this.data.id > 0){
      this.IsUpdate = true;
      this.SetFormData(this.data);
   }
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }


  SetFormData(d: any){
    this.contactForm.controls['FirstName'].setValue(d.FirstName);
    this.contactForm.controls['LastName'].setValue(d.LastName);
    this.contactForm.controls['Email'].setValue(d.Email);
  }


  AddContactDetails(){
    if(this.contactForm.valid){
       this.AddContactList(this.contactForm.value);
    }
  }

  CloseModel() {
    this.activeModal.close(false);
  }

  AddContactList(data: any){
    let request = new Requestmodels();
     let d = {
      Id: (this.data.id),
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email
     }
     request.RequestObject = d;
    request.RequestUrl = 'api_contact/Contact/AddOrUpdateContactList';

    this.contactservice.postData(request).subscribe(data => {
      if (data && data.responseStatus) {
        this.activeModal.close({update: true});
        this.IsUpdate = false;
      }
    }
    )
  }
}
