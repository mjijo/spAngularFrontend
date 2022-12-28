import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  constructor() { }

  showAlert(icon:any, title:any, text:any) {

    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      
    })
  }


  showDatePicker() {
    // const getDatePickerTitle = elem => {
    //   // From the label or the aria-label
    //   const label = elem.nextElementSibling;
    //   let titleText = '';
    //   if (label && label.tagName === 'LABEL') {
    //     titleText = label.textContent;
    //   } else {
    //     titleText = elem.getAttribute('aria-label') || '';
    //   }
    //   return titleText;
    // }
    
    // const elems = document.querySelectorAll('.datepicker_input');
    // for (const elem of elems) {
    //   const datepicker = new Datepicker(elem, {
    //     'format': 'dd/mm/yyyy', // UK format
    //     title: getDatePickerTitle(elem)
    //   });
    // }
  }
}
