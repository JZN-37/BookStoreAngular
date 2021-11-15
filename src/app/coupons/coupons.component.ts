import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

}

/*  
var tooltip = document.getElementById('myTooltip');
var copyText = document.getElementById('couponCode');
function myFunction() {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    tooltip.innerHTML = 'Copied: ' + copyText.value;
}
function outFunc() {
    tooltip.innerHTML = 'Copy to clipboard';
}
*/

