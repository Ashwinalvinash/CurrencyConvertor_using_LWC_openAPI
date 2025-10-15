import { LightningElement } from 'lwc';

export default class CurrencyConvertor extends LightningElement {
    showOutput = false ;
    currencyOptions = [];
    convertedValue = '';
    toCurrnecy = '';
    enteredAmount = '';
    fromCurrency = '' ;

    connectedCallback(){
        this.fetchSymbols();

    }

changeHandler(event){
    
    
    if(event.target.name === 'amount'){
        this.enteredAmount = event.target.value ;

    }
     if(event.target.name === 'fromcurr'){
        this.fromCurrency = event.target.value ;

    }
     if(event.target.name === 'tocurr'){
        this.toCurrnecy  = event.target.value ;

    }


}

 async fetchSymbols(){
    let endPoint = 'https://api.frankfurter.dev/v1/currencies' ;
    let response = await fetch(endPoint);
    let data = await response.json();
    let options = [] ;
    for(let symbol in data){
            options = [...options,{label:symbol,value:symbol}];
    }
   

    this.currencyOptions = [...options];

}

handleClick(){
    if(this.enteredAmount && this.fromCurrency && this.toCurrnecy){
        this.conversion(this.fromCurrency,this.toCurrnecy,this.enteredAmount);
    }
    /*
    if (value) {
    // do something..
    }
will evaluate to true if value is not:

null
undefined
NaN
empty string ("")
0
false


    */
  
}

async conversion(from,to,amount){
  let endPoint =  `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`;
    let response = await fetch(endPoint);
    let data = await response.json();
    this.convertedValue = data.rates[to] * parseFloat(amount) ;
    this.showOutput = true ;
}

/*
 


<template>
<lightning-card title=”LWC Input Custom Validation” icon-name=”standard:contact”>

<div class=”slds-var-p-around_small”>
<lightning-input class=”nameVal” label=”Enter Name” type=”text” required></lightning-input>
<lightning-input class=”emailVal” label=”Enter Email” type=”email” required></lightning-input>
<lightning-input class=”dateVal” label=”Enter Date” type=”date” required></lightning-input><br/><br/>
<lightning-button class=”slds-align_absolute-center” label=”Validate” variant=”brand”
onclick={handleValidation}></lightning-button>
</div>
</lightning-card>
</template>

import { LightningElement, track } from ‘lwc’;
export default class Customvalidationlwc extends LightningElement {
handleValidation() {
let nameCmp = this.template.querySelector(“.nameVal”);
let dateCmp = this.template.querySelector(“.dateVal”);
let emailCmp = this.template.querySelector(“.emailVal”);
if (!nameCmp.value) {
nameCmp.setCustomValidity(“Please provide the name value”);
} else {
nameCmp.setCustomValidity(“”); // clear previous value
}
nameCmp.reportValidity();
if (!dateCmp.value) {
dateCmp.setCustomValidity(“Please provide the date value.”);
} else {
dateCmp.setCustomValidity(“”); // clear previous value
}
dateCmp.reportValidity();
if (!emailCmp.value) {
emailCmp.setCustomValidity(“Please provide a valid email address.”);
} else {
emailCmp.setCustomValidity(“”); // clear previous value
}
emailCmp.reportValidity();
}
}



*/

}