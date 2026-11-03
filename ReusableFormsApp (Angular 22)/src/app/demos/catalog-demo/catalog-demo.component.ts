import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  UiFormFieldComponent,
  UiInputComponent,
  UiTextareaComponent,
  UiSelectComponent,
  UiCheckboxComponent,
  UiCheckboxGroupComponent,
  UiRadioGroupComponent,
  UiSwitchComponent,
  UiDatepickerComponent,
  UiFileUploadComponent,
  UiSelectOption,
  UiRadioOption,
  UiCheckboxOption,
} from '../../shared/components/forms';

@Component({
  selector: 'app-catalog-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiFormFieldComponent,
    UiInputComponent,
    UiTextareaComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiCheckboxGroupComponent,
    UiRadioGroupComponent,
    UiSwitchComponent,
    UiDatepickerComponent,
    UiFileUploadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-demo.component.html',
  styleUrl: './catalog-demo.component.css',
})
export class CatalogDemoComponent {
  sampleText = signal<string>('Hello Angular 22!');
  samplePassword = signal<string>('SecretP@ssw0rd!');
  sampleTextarea = signal<string>('This textarea automatically grows as you type more lines without breaking your layout!');
  sampleSelect = signal<string>('angular');
  sampleSwitch = signal<boolean>(true);
  sampleSwitch2 = signal<boolean>(false);
  sampleCheckbox = signal<boolean>(true);
  sampleCheckboxGroup = signal<string[]>(['aws', 'gcp']);
  sampleRadio = signal<string>('standard');
  sampleDate = signal<string>('2026-12-01');
  sampleFiles = signal<any[]>([]);

  frameworkOptions: UiSelectOption[] = [
    { label: 'Angular 22+ (Signals & Modern Control Flow)', value: 'angular' },
    { label: 'React 19', value: 'react' },
    { label: 'Vue 3.5', value: 'vue' },
    { label: 'Svelte 5', value: 'svelte' },
    { label: 'Solid.js', value: 'solid' },
  ];

  cloudOptions: UiCheckboxOption[] = [
    { label: 'Amazon Web Services (AWS)', value: 'aws' },
    { label: 'Google Cloud Platform (GCP)', value: 'gcp' },
    { label: 'Microsoft Azure', value: 'azure' },
    { label: 'Cloudflare Workers', value: 'cloudflare' },
  ];

  computeOptions: UiRadioOption[] = [
    {
      label: 'Shared Burstable',
      value: 'burstable',
      description: '2 vCPU / 4GB RAM. Low cost development instance.',
    },
    {
      label: 'Standard Dedicated',
      value: 'standard',
      description: '4 vCPU / 16GB RAM. Production API & worker workloads.',
    },
    {
      label: 'High Memory Compute',
      value: 'highmem',
      description: '16 vCPU / 64GB RAM. Machine learning & in-memory caches.',
    },
  ];
}
