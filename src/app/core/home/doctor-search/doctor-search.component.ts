import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatMenu } from '@angular/material/menu'; // Import MatMenu if needed
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.scss']
})
export class DoctorSearchComponent implements OnInit {
  public routes = routes;


  hideSingleSelectionIndicator = signal(false);
  value = 'Clear me';
  selected='';

  // foods = [
  //   { value: 'option1', viewValue: 'Option 1' },
  //   { value: 'option2', viewValue: 'Option 2' },
  //   { value: 'option3', viewValue: 'Option 3' }
  // ];
  // specialties = ['Specialty 1', 'Specialty 2', 'Specialty 3'];
  // governates = ['Governate 1', 'Governate 2', 'Governate 3'];
  // areas = ['Area 1', 'Area 2', 'Area 3'];
  searchByName: string='';



  selectSpecialty(specialty: string) {
    // Handle selected specialty
    console.log('Selected Specialty:', specialty);
  }

  selectGovernate(governate: string) {
    // Handle selected governate
    console.log('Selected Governate:', governate);
  }

  selectArea(area: string) {
    // Handle selected area
    console.log('Selected Area:', area);
  }

  search() {
    // Handle search action
    console.log('Searching for:', this.searchByName);
  }
  selectedFood: string=''; // Property to bind selected value
  specialties: string[] = [
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Psychiatry',
    'Urology',
  ];

  cities: string[] = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Philadelphia',
    'Phoenix',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ];

  areas: string[] = [
    'Manhattan',
    'Brooklyn',
    'Queens',
    'The Bronx',
    'Staten Island',
    'Downtown',
    'Midtown',
    'Uptown',
    'West Side',
    'East Side',
  ];

  selectedSpecialty: string = '';
  selectedCity: string = '';
  selectedArea: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToSearch(): void {
    // Placeholder for search functionality
    this.router.navigate(['/home/home-page'], { queryParams: { selectedSpecialty : `${this.selectedSpecialty}` } });
    console.log(`Searching for ${this.selectedSpecialty} doctor in ${this.selectedCity} / ${this.selectedArea}`);
  }
}