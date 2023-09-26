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
        if(id){
          this.saveData.getDataById(id).subscribe((response) =>
            { this.posts = response;

              //THESE LINE OF CODE BSICALLY USED TO REMOVE THE UNWANTED ELEMENTS FROM THE ARRAY
              // Define the fields you want to exclude from the original object
              const excludedFields = ['_id', '__v'];
              // Create a copy of the original object, excluding the specified fields
              const formData = { ...this.posts.data[0] }; // create a shallow Copy of the object
              // Remove excluded fields from the copied object
              excludedFields.forEach((field) => {
                delete formData[field];
              });
              //================================================================================

              // Set the modified object in the form group
              this.contactForm.setValue(formData);

              // this.contactForm.get(['firstName'])?.setValue(this.posts.data[0].firstName);
              // this.contactForm.get(['lastName'])?.setValue(this.posts.data[0].lastName);
              // this.contactForm.get(['email'])?.setValue(this.posts.data[0].email);
              // this.contactForm.get(['phone'])?.setValue(this.posts.data[0].phone);
              // // console.log(this.addressForm.get(['streetAddress'])?.setValue(this.posts.data[0].address.streetAddress));
              // this.contactForm.get(['city'])?.setValue(this.posts.data[0].address.city);
              // this.contactForm?.setValue(this.posts.data[0])
              this.addressForm.setValue(this.posts.data[0].address)

            },
          )
        }
        
        console.log(`The 'id' query parameter is present with the value: ${id}`);
      }
    }),

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
    this.route.queryParamMap.subscribe(queryParams => {
      if(queryParams.has('id')) {
        const id = queryParams.get('id');
        if(id){
          this.saveData.updateDataById(id, this.posts.data[0]).subscribe((response) =>
            { 
              this.posts = response; 
            }
          );
        }else{
          this.saveData.savedata(this.contactForm.value);
        }
      }
    })
  }
}
