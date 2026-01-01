import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../core/models/object-model';
import { ApiService } from '../core/services/api.service';
import { UserForm } from '../components/user-form/user-form';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule, UserForm],
  providers: [UserService, ApiService],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  userProfileForm: FormGroup = new FormGroup({});
  userProfile = false;
  user_dto!: User;

  // //data not available on form
  // // upload_file_name;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private userSvc = inject(UserService);

  user_id!: number;
  user_data!: User;
  user_role!: string;
  user_profile_pic!: string;
  user_language!: string;
  user_updated_data: any;

  ngOnInit() {
    this.user_id = Number(sessionStorage.getItem('user_session_id'));
    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: [],
    });
    this.editUserData(this.user_id);
  }

  get rf() {
    return this.userProfileForm.controls;
  }

  editUserData(user_id: number) {
    this.userSvc.getUserData(user_id).subscribe({
      next: (data: User) => {
        this.user_data = data;
        this.user_profile_pic = this.user_data.uploadPhoto;
        this.user_language = this.user_data.language;
        this.user_role = this.user_data.role;
        this.userProfileForm.setValue({
          name: this.user_data.name,
          mobNumber: this.user_data.mobNumber,
          age: this.user_data.age,
          dob: this.user_data.dob,
          email: this.user_data.email,
          password: this.user_data.password,
          addLine1: this.user_data.address.addLine1,
          addLine2: this.user_data.address.addLine2,
          city: this.user_data.address.city,
          state: this.user_data.address.state,
          zipCode: this.user_data.address.zipCode,
          gender: this.user_data.gender,
          aboutYou: this.user_data.aboutYou,
          uploadPhoto: '',
        });
      },
      error: (err) => {
        console.log('My error', err);
      },
    });
  }

  updateProfile() {
    this.userProfile = true;
    if (this.userProfileForm.invalid) {
      this.toastr.error('Some Error Occured!', 'User Profile!');
      // alert('Error!! :-)\n\n' + JSON.stringify(this.userProfileForm.value))
      return;
    }
    this.user_updated_data = this.userProfileForm.value;
    this.user_dto = {
      name: this.user_updated_data.name,
      mobNumber: this.user_updated_data.mobNumber,
      age: this.user_updated_data.age,
      dob: this.user_updated_data.dob,
      email: this.user_updated_data.email,
      password: this.user_updated_data.password,
      language: this.user_updated_data.language,
      gender: this.user_updated_data.gender,
      address: {
        id: 0,
        addLine1: this.user_updated_data.addLine1,
        addLine2: this.user_updated_data.addLine2,
        city: this.user_updated_data.city,
        state: this.user_updated_data.state,
        zipCode: this.user_updated_data.zipCode,
      },
      aboutYou: this.user_updated_data.aboutYou,
      uploadPhoto:
        this.user_updated_data.uploadPhoto == ''
          ? this.user_profile_pic
          : this.user_updated_data.uploadPhoto,
      agreetc: this.user_updated_data.agreetc,
      role: this.user_role,
    };
    this.userSvc.updateUserData(this.user_id, this.user_dto).subscribe({
      next: (data) => {
        this.toastr.success('Profile Updated Successfully!', 'User Profile!');
        if (this.user_role == 'admin') {
          this.router.navigateByUrl('/admin-dashboard');
        } else if (this.user_role == 'seller') {
          this.router.navigateByUrl('/seller-dashboard');
        } else if (this.user_role == 'buyer') {
          this.router.navigateByUrl('/buyer-dashboard');
        }
      },
      error: (err) => {
        this.toastr.error('Some Error Occured!', 'User Profile!');
        // alert("Some Error Occured");
      },
    });
  }
}
