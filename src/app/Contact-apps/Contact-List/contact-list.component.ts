import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactComponent } from '../Add-New/contact.component';
import { ContactService } from 'src/app/Services/contact.service';
import { Requestmodels } from 'src/app/Models/request.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.sass']
})
export class ContactListComponent implements OnInit {
  public ContactListData: Array<any> = [];
  public editdata: Array<any> = [];
  public ContactListdataForSearch: Array<any> = [];
  constructor(private contactservice: ContactService,
    private modalService: NgbModal,private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.GetContactListData();
  }

  AddConactDetails(Id: number = 0) {
    const modalRef = this.modalService.open(ContactComponent);
    modalRef.componentInstance.data = { id: Id,FirstName: (this.editdata.length > 0 ? this.editdata[0].firstName : ''),LastName: (this.editdata.length > 0 ? this.editdata[0].lastName : ''),Email: (this.editdata.length > 0 ? this.editdata[0].email : '')};
    modalRef.result.then(x => {
      if (x?.update) {
        this.GetContactListData();
        this.editdata = [];
         if(Id > 0){
          this.toastrService.success('Update SuccessFully !', '');
         }else{
          this.toastrService.success('Added SuccessFully !', '');
         }
      }
    });
  }


  GetContactListData() {
    let request = new Requestmodels();
    request.RequestUrl = 'api_contact/Contact/GetContactListData';
    this.contactservice.getData(request).subscribe(data => {
      if (data && data.responseStatus) {
        if (data.responseObject.length >= 0) {
          this.ContactListData = data.responseObject;
          this.ContactListdataForSearch = data.responseObject;
        }else{
          this.toastrService.error(data.ResponseMessage, '');
        }
      }
    }
    )
  }

  EditContact(Id: number = 0) {
    this.editdata = this.ContactListData.filter(x => x.id == Id);
    this.AddConactDetails(Id);

  }

  DeleteContact(Id: number = 0) {
    let request = new Requestmodels();
    request.RequestUrl = 'api_contact/Contact/RemoveContactList?Id=' + Id;
    this.contactservice.getData(request).subscribe(data => {
      if (data && data.responseStatus) {
        this.GetContactListData();
        this.toastrService.success('Deleted SuccessFully !', '');
      }else{
        this.toastrService.error(data.ResponseMessage, '');
      }
    }
    )
  }

  SearchContactList(event: any){
     let ContactListData = this.ContactListData;
     let searchtext = event.target.value;
      if(event.target.value != ""){
        this.ContactListData = ContactListData.filter(x => x.firstName.toLowerCase().startsWith(searchtext.toLowerCase()));
      }else{
        this.ContactListData = this.ContactListdataForSearch;
      }
  }

}
