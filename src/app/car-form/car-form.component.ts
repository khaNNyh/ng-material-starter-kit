import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface CarOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
  carForm: FormGroup;
  carBrands: CarOption[] = [];
  carSecurity: CarOption[] = [];
  carComfort: CarOption[] = [];

  constructor(private fb: FormBuilder, private restService: RestService) {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      securityGroups: this.fb.array([]),
      comfortOptions: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    forkJoin({
      carBrands: this.restService.getCarBrands(),
      carSecurity: this.restService.getCarSecurity(),
      carComfort: this.restService.getCarComfort(),
    }).subscribe({
      next: ({ carBrands, carSecurity, carComfort }) => {
        console.log('Car Brands:', carBrands);
        console.log('Car Security:', carSecurity);
        console.log('Car Comfort:', carComfort);
        this.carBrands = carBrands;
        this.carSecurity = carSecurity;
        this.carComfort = carComfort;
        this.addSecurityRow();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.info('Completed fetching data');
      },
    });
  }

  get securityGroups(): FormArray {
    return this.carForm.get('securityGroups') as FormArray;
  }

  get comfortGroups(): FormArray {
    return this.carForm.get('comfortGroups') as FormArray;
  }

  onCheckboxChange(optionId: string, event: MatCheckboxChange): void {
    const formArray: FormArray = this.carForm.get(
      'comfortOptions'
    ) as FormArray;
    const checkbox = event as MatCheckboxChange;

    if (checkbox.checked) {
      formArray.push(this.fb.control(optionId));
    } else {
      const index = formArray.controls.findIndex(
        (control) => control.value === optionId
      );
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  addSecurityRow(): void {
    this.securityGroups.push(this.fb.control(''));
  }

  submitCarForm(): void {
    if (this.carForm.valid) {
      this.restService.postCarForm(this.carForm.value).subscribe({
        next: (response) => {
          console.log('Form successfully submitted:', response);
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
    }
  }
}
