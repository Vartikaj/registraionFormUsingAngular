import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationServiceService } from 'src/app/service/registration-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  contactForm !: FormGroup;
  addressForm: any;
  submitted = false;
  posts: any;

  constructor(private formBuilder : FormBuilder,
              private saveData : RegistrationServiceService,
              private route: ActivatedRoute,
            ){ }

  ngOnInit() {

    this.route.queryParamMap.subscribe(queryParams => {
      if(queryParams.has('id')){
        const id = queryParams.get('id');
        this.contactForm.get(['firstName'])?.setValue('a');
        this.saveData.getPosts().subscribe((response) =>
          { this.posts = response; },
        )
        console.log(`The 'id' query parameter is present with the value: ${id}`);
      }
    })
    this.addressForm = this.formBuilder.group({
      'streetAddress' : [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'state': [null, [Validators.required]],
      'postalCode': [null, [Validators.required]],
    }),

    this.contactForm = this.formBuilder.group({
      'firstName' : [null, [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
      'lastName' : [null, [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
      'email': [null, [Validators.required, Validators.email]],
      'phone': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern("^[0-9]*$"),
      ]],
      'address': this.addressForm
    })

    this.saveData.getPosts().subscribe((response) =>
    { this.posts = response; },
    )

    //
    // this.contactForm.get(['firstName'])?.setValue('vbbb')

  }

  /**
   * THIS FUNCTION IS USED TO APPLY VALIDATION
   */
  get validations() { return this.contactForm.controls; }
  get addressValidations() { return this.addressForm.controls; }

  /**
   * SUBMIT THE DETAILS
   */
  submitDetails() {
    this.submitted = true;
    console.log(this.contactForm.value);
    this.saveData.savedata(this.contactForm.value);

  }
}
