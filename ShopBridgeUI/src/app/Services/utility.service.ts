import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
// import { environment } from 'src/environments/environment';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  authToken: string;
  constructor() {}

  downloadFile(data: ArrayBuffer, contentType: string, fileName: string) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(data, fileName);
    } else {
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([data], { type: contentType }));
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  onBlurEvent(controlName: string, form: FormGroup) {
    const control = form.get(controlName).value;
    if (control) {
      form.get(controlName).setValue(control.replace(/  +/g, ' ').trim());
    }
  }

  onBlurFormArray(formArray: AbstractControl, controlName: string) {
    const abstractControl = formArray;
    if (abstractControl.value) {
      abstractControl.get(controlName).setValue((abstractControl.value[controlName]).replace(/  +/g, ' ').trim());
    }
  }

  blobToJSON(b) {
    let u, x;
    u = URL.createObjectURL(b);
    x = new XMLHttpRequest();
    x.open('GET', u, false); // although sync, you're not fetching over internet
    x.send();
    URL.revokeObjectURL(u);
    return JSON.parse(x.responseText);
  }
  getAttachmentFile(attachmentUrl: any, apiUrl: string): Observable<any> {
    this.authToken = localStorage.getItem('msal.idtoken');
    const subject = new ReplaySubject<Response>();
    // Xhr creates new context so we need to create reference to this
    const self = this;
    let pending: boolean;
    pending = true;

    // Create the Xhr request object
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `path${apiUrl}`, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${this.authToken}`);
    xhr.responseType = 'blob';

    // Xhr callback when we get a result back
    // We are not using arrow function because we need the 'this' context
    xhr.onreadystatechange = function () {
      // We use setTimeout to trigger change detection in Zones
      setTimeout(() => {
        pending = false;
      }, 0);
      // If we get an HTTP status OK (200), save the file using fileSaver
      if (xhr.readyState === 4 && xhr.status === 200) {
        subject.next(this.response);
        subject.complete();
      }
      if (xhr.readyState === 4 && xhr.status === 204) {
        subject.error(xhr.status);
        subject.complete();
      } else if (xhr.readyState === 4 && xhr.status === 206) {
        // If get HTTP status PartialContent(206) return error in case download limit exceeded for export.
        subject.error(xhr.status);
        subject.complete();
      }
    };
    // Start the Ajax request
    const params = JSON.stringify(attachmentUrl);
    xhr.send(params);
    return subject.asObservable();
  }
  getAttachmentFileWithoutParams( apiUrl: string): Observable<any> {
    this.authToken = localStorage.getItem('msal.idtoken');
    const subject = new ReplaySubject<Response>();
    // Xhr creates new context so we need to create reference to this
    const self = this;
    let pending: boolean;
    pending = true;

    // Create the Xhr request object
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `path${apiUrl}`, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${this.authToken}`);
    xhr.responseType = 'blob';

    // Xhr callback when we get a result back
    // We are not using arrow function because we need the 'this' context
    xhr.onreadystatechange = function () {
      // We use setTimeout to trigger change detection in Zones
      setTimeout(() => {
        pending = false;
      }, 0);
      // If we get an HTTP status OK (200), save the file using fileSaver
      if (xhr.readyState === 4 && xhr.status === 200) {
        subject.next(this.response);
        subject.complete();
      }
      if (xhr.readyState === 4 && xhr.status === 204) {
        subject.error(xhr.status);
        subject.complete();
      } else if (xhr.readyState === 4 && xhr.status === 206) {
        // If get HTTP status PartialContent(206) return error in case download limit exceeded for export.
        subject.error(xhr.status);
        subject.complete();
      }
    };
    // Start the Ajax request
    //const params = JSON.stringify(attachmentUrl);
    xhr.send();
    return subject.asObservable();
  }
}
