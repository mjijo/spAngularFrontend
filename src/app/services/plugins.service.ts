import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;


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

  async showQuickLogin(title:string){

    // login via sweet alert
    const { value: email } = await Swal.fire({
      title: 'Please login to ' + title,
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
      html: '<input id="swal-input1" class="swal2-input">' +
            '<input id="swal-input2" class="swal2-input">',
    })
    
    if (email) {
      Swal.fire(`Entered email: ${email}`)
    }
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

  initRangeSlider(){
    let range = document.querySelectorAll(".range-slider span input");
    let progress = document.querySelector(".range-slider .progress") as HTMLElement;
    let gap = 0.1;
    let inputValue = document.querySelectorAll(".numberVal input");

    range.forEach((input) => {
      input.addEventListener("input", (e: Event) => {
        let minRange = parseInt((range[0] as HTMLInputElement).value);
        let maxRange = parseInt((range[1] as HTMLInputElement).value);

        if (maxRange - minRange < gap) {
          let target = e.target as HTMLInputElement;
          if ( target?.className === "range-min" ) {
            (range[0] as HTMLInputElement).value = (maxRange - gap).toString();
          } else {
            (range[1] as HTMLInputElement).value = (minRange + gap).toString();
          }
        } else {
          progress.style.left = (minRange / Number((range[0] as HTMLInputElement).max)) * 100 + "%";
          progress.style.right = 100 - (maxRange / Number((range[1] as HTMLInputElement).max)) * 100 + "%";
          (inputValue[0] as HTMLInputElement).value = minRange.toString();
          (inputValue[1] as HTMLInputElement).value = maxRange.toString();
        }
      });
    });

  }
}
