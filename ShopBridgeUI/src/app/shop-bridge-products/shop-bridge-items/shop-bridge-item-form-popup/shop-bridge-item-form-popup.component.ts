import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../Services/utility.service';


@Component({
  selector: 'app-shop-bridge-item-form-popup',
  templateUrl: './shop-bridge-item-form-popup.component.html',
  styleUrls: ['./shop-bridge-item-form-popup.component.css']
})
export class ShopBridgeItemFormPopupComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @Input('ItemId') ItemId: number;
  enableCancelButton: boolean = false;
  @Output() closeItemPopup = new EventEmitter<boolean>();
  shopBridgeItemFormGroup:FormGroup;
  addAlphaPattern: RegExp = (/^[0-9a-zA-Z\s\.,()\-&@%]+$/g);
  addNumberPattern: RegExp = (/^\d{0,12}(?:\.\d{0,3})?$/g);
  openForm: boolean = false;
  openInEdit: boolean;
  openEditModal: boolean = false;
  openCancelModal: boolean = false;
  openSaveModal: boolean = false;
  confirmationMessage: string;
  cancelConfirmationMessage: string;
  disableForm: boolean = true;
  IsEditable: boolean;
  title;
  comment: string;
  @ViewChild('comments') comments: ElementRef;
  maxLength: number;

  constructor(private formBuilder: FormBuilder,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.maxLength=1000;
    if (this.ItemId === 0 || this.ItemId === undefined) {
      this.enableCancelButton = true;
      this.IsEditable = true;
      this.title = "Add";
    }
    else {
      this.enableCancelButton = true;
      this.IsEditable = true;
      this.title = "Edit";
    }
    this.confirmationMessage = 'Do you want to Save the changes?';
    this.cancelConfirmationMessage = 'Do you want to Cancel the changes?';
    this.addItemForm();
  }

  public counter() {
    this.comment = this.comments.nativeElement.value;
  }

  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (<any>window).clipboardData;
    const pastedText = clipboardData.getData('text').toString();
    this.comment = this.comment + pastedText;
    this.comment = this.comment.substring(0, 1000);
  }

  addItemForm() {
    this.shopBridgeItemFormGroup = this.formBuilder.group({
      Name: [{ value: null, disabled: false },[Validators.required]],
      Description: [{ value: null, disabled: false }, [Validators.required]],
      Price: [{ value: null, disabled: false },[Validators.required]]
    });
    // if (this.ItemId != 0 && this.ItemId != null) {
    //   this.notesService.getShopBridgeItemDetail(this.ItemId).subscribe(response => {
    //     if (!!response && !!response.Data) {
    //       this.shopBridgeItemFormGroup.controls['Name'].reset(response.Data.Title);
    //       this.shopBridgeItemFormGroup.controls['Description'].reset(response.Data.Description);
    //       this.shopBridgeItemFormGroup.controls['Price'].reset(response.Data.Price);
    //       this.comment=response.Data.Description;
    //     }
    //   },
    //     (error) => {
    //       this.spinner.hide();
    //       this.toastr.error(error.message, this.appMessages.message['common-error-message'], {
    //         timeOut: 3000,
    //         positionClass: 'toast-bottom-right'
    //       });
    //     },
    //     // () => { this.spinner.hide(); }
    //   );
    // }
    this.openForm = true;
  }
  onBlurEvent(controlName: string) {
    // this.utilityService.onBlurEvent(controlName, this.shopBridgeItemFormGroup);
  }

  openSavePopup() {
    if (confirm(this.confirmationMessage)) {
      this.saveItem();
    } else {
      return false;
    }
  }

  openCancelPopup() {
    if (confirm(this.cancelConfirmationMessage)) {
      this.closePopUp(false);
    } else {
      return false;
    }

  }
  saveItem() {
    // this.spinner.show();
    let data;
    data.Id = this.ItemId;
    data.Name = this.shopBridgeItemFormGroup.controls['Name'].value;
    data.Description = this.shopBridgeItemFormGroup.value.Description;
    data.Price = this.shopBridgeItemFormGroup.controls['Price'].value;
    console.log(data);
    // this.notesService.saveNotes(data).subscribe(response => {
    //   if (response && response.Data) {
    //     this.spinner.hide();
    //     this.toastr.success(this.appMessages.message['financials/notes/save'],
    //       'Success!', {
    //       timeOut: 3000,
    //       positionClass: 'toast-bottom-right',
    //       closeButton: true
    //     });
    //     this.closePopUp(true);
    //   }
    // },
    //   (error) => {
    //     this.spinner.hide();
    //     this.toastr.error(error.message, this.appMessages.message['common-error-message'], {
    //       timeOut: 3000,
    //       positionClass: 'toast-bottom-right'
    //     });
    //     this.closePopUp(false);
    //   },
    //   // () => { this.spinner.hide(); }
    // );
  }
  closePopUp(value) {
    this.resetForm();
    this.ItemId = 0;
    this.closeItemPopup.emit(value);
    this.closeBtn.nativeElement.click();
  }
  resetForm() {
    this.shopBridgeItemFormGroup.controls['Name'].reset();
    this.shopBridgeItemFormGroup.controls['Description'].reset();
    this.shopBridgeItemFormGroup.controls['Price'].reset();
  }
  alterForm(value) {
    this.enableCancelButton = true;
    this.IsEditable = true;

    this.shopBridgeItemFormGroup.controls['Name'].enable();
    this.shopBridgeItemFormGroup.controls['Description'].enable();
    this.shopBridgeItemFormGroup.controls['Price'].enable();
  }

}