import { Component, OnInit, HostListener, OnDestroy, AfterViewInit, viewChild, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { AssessmentsService, Levels } from '../../assessment/assessments.service';
import { Router } from '@angular/router';
import { MediaService } from '../../media-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  //Observable arrays of academic levels received from the server
  levels$: Observable<Levels[]> | undefined; 

  //If the user's device is extra small
  deviceXs:boolean = false;

  rowspan = 1; //default mat-grid row span

  //If the user's device is medium
  deviceSm: boolean = false;
  mediaSubscription?:Subscription;

  


  //welcome message displayable on large screens
  welcomeMsg = "Embark on your academic journey with us and unlock a world of knowledge and growth. Whether you're a student striving for excellence or an educator dedicated to nurturing minds, our platform is here to empower you every step of the way. Explore our comprehensive range of assessments tailored to junior and senior high school levels, designed to challenge and inspire. Dive into subjects that spark your curiosity, from mathematics to literature, and beyond. With personalized profiles, real-time feedback, and insightful analytics, your learning experience is as unique as you are. Join a community of learners committed to success and discover your full potential with e-Kademiks. Start your adventure now. The path to greatness awaits";

  //welcome message displayable on extra small screens
  weclome2 = "Embark on your academic journey with us by exploring our different range of assessments tailored for both students of junior and senior categories."
  
  //the user selected assessment test, as recieved from the radio button selection
  selectedLevel ='';
  
  constructor(private mediaService: MediaService, 
    private assessmentService:AssessmentsService,
  private router:Router){}
 

  ngOnInit(): void {
    this.mediaSubscription = this.mediaAlias();
    
   
  }


  private mediaAlias() {
   
    return this.mediaService.mediaChanges().subscribe((changes:MediaChange[]) =>{

      this.deviceXs = changes.some(change => change.mqAlias === 'xs');
      this.deviceSm = changes.some(change => change.mqAlias === 'sm');
      changes.forEach(c => console.log(c.mqAlias));

      this.rowspan = changes.some(change => change.mqAlias === 'lg' ||  change.mqAlias === 'md') ? 1.5 : 1;
    })
    
  }

  ngOnDestroy(): void {
   this.mediaSubscription?.unsubscribe();
  }

  //calls the service to retrieve the academic levels
  getAcademicLevels(){

     this.levels$ = this.assessmentService.getAssessmentLevels();
    
  }

  //handles user selection of choice of academic level for assessment to proceed
  handleSelection(){
    
    this.router.navigate(['/assessments', this.selectedLevel]);
  }


}

