import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

const HARD_CODED_MIN_LENGTH = 3;

interface FormJson {
  form: DForm;
}

interface DForm {
  group: string;
  submit: string;
  controls: DControl[];
}

interface DControl {
  name: string;
  type: string;
  text: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validators?: DValidator[];
}

interface DValidator {
  type: string;
  message?: string;
  options?: { length: number };
}

function getValidators(ctrl: FormControl, validators: DValidator[]) {
  validators.forEach((validator: DValidator) => {
    switch (validator.type) {
      case 'required':
        ctrl.addValidators(Validators.required);
        break;
      case 'email':
        ctrl.addValidators(Validators.email);
        break;
      case 'minlength':
        if (validator.options?.length) {
          ctrl.addValidators(Validators.minLength(validator.options.length));
        } else {
          ctrl.addValidators(Validators.minLength(HARD_CODED_MIN_LENGTH));
        }

        break;
      default:
        console.log('Unknown validator type:', validator.type);
        break;
    }
  });
}

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  dForm = this.fb.group({});

  formData = signal<FormJson | null>(null);

  ngOnInit(): void {
    this.http.get<FormJson>('assets/formJson/someForm.json').subscribe({
      next: (data: FormJson) => {
        data.form.controls.forEach((control: DControl) => {
          const ctrl = new FormControl('', []);

          if (control.validators) {
            getValidators(ctrl, control.validators);
          }

          this.dForm.addControl(control.name, ctrl);
        });
        this.formData.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitForm() {
    console.log(this.dForm.value);
  }
}
