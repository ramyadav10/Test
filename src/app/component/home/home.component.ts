import { MediaMatcher } from '@angular/cdk/layout';
import { PlatformLocation } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/dataservice.service';
import { UtilityService } from 'src/app/service/utility.service';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { EditProfileComponent } from '../editProfile/editProfile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  filteredString: string = '';
  
  mobileQuery: MediaQueryList;
  changeText;
  applyColour!: String;
  applyColourToSettings!: String;
  showSettings = false;
  isMenuOpen = true;
  contentMargin = 210;
  private _mobileQueryListener: () => void;
  openCard: any;
  showsearchbarinlearnercomponents: boolean = false;
  onlearners: boolean = true;
  dontShowSearchBar=false;
  searchedName: any;
  nna="Ram";
  
  constructor( public dataService : DataService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public openDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    location: PlatformLocation 
  ) {
    this.changeText = false;

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    location.onPopState(() => {
      if (location.pathname === '/home/recruitment') {
        this.applyColour = 'Recuriment';
        this.showSettings = false;
      } else if (location.pathname === '/home/batch/Trial') {
        this.applyColour = 'Home';
        this.showSettings = false;
      } else if (location.pathname === '/home/batch/RFP') {
        this.applyColour = 'RFP';
        this.showSettings = false;
      } else if (location.pathname === '/home/batch/CFP') {
        this.applyColour = 'CFP';
        this.showSettings = false;
      } else if (location.pathname === '/home/batch/LFP') {
        this.applyColour = 'LFP';
        this.showSettings = false;
      } else if (location.pathname === '/home/batch/CQA') {
        this.applyColour = 'CQA';
        this.showSettings = false;
      } else if (location.pathname.includes('home/batchinfo')) {
        this.applyColour = 'Home';
        this.showSettings = false;
      } else if (location.pathname === '/home/dashboard') {
        this.applyColour = 'Dashboard';
        this.showSettings = false;
      } else if (location.pathname === '/home/learners') {
        this.applyColour = 'Leaners';
        this.showSettings = false;
      } else if (location.pathname === '/home/mentor') {
        this.applyColour = 'Mentor';
        this.showSettings = false;
      } else if (location.pathname === '/home/requirement') {
        this.applyColour = 'Requirement';
        this.showSettings = false;
      } else if (location.pathname === '/home/assignment') {
        this.applyColour = 'Assignment';
        this.showSettings = false;
      } else if (location.pathname === '/home/configuration') {
        this.showSettings = true;
        this.applyColour = 'Settings';
        this.applyColourToSettings = 'Configuration';
      } else if (location.pathname === '/home/fellowship') {
        this.showSettings = true;
        this.applyColour = 'Settings';
        this.applyColourToSettings = 'Fellowship';
      } else if (this.router.url === '/home/companylisting') {
        // this.showSettings = true;
        this.applyColour = 'Companies';
        // this.applyColourToSettings = 'Fellowship';
      }
    });
  }

  changetext() {
    if (this.changeText) {
      this.changeText = false;
    } else {
      this.changeText = true;
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  
  applyFilter(event: any) {
    this.searchedName = event.target.value;
    this.dataService.changeMessage=this.searchedName;
  }
  
  ngOnInit() {
    console.log(this.nna);
    console.log(this.applyColour);
    
    
    // this.showsearchbarinlearnercomponents;
    if (this.router.url === '/home/recruitment') {
      this.applyColour = 'Recuriment';
    } else if (this.router.url === '/home/batch/Trial') {
      this.applyColour = 'Home';
    } else if (this.router.url === '/home/batch/RFP') {
      this.applyColour = 'RFP';
    } else if (this.router.url === '/home/batch/CFP') {
      this.applyColour = 'CFP';
    } else if (this.router.url === '/home/batch/LFP') {
      this.applyColour = 'LFP';
    } else if (this.router.url === '/home/batch/CQA') {
      this.applyColour = 'CQA';
    } else if (this.router.url.includes('/home/batchinfo')) {
      this.applyColour = 'Home';
    } else if (this.router.url.includes('/home/dashboard')) {
      this.applyColour = 'Dashboard';
    } else if (this.router.url === '/home/coordinator') {
      this.applyColour = 'Cooradinator';
    } else if (this.router.url === '/home/learners') {
      this.showsearchbarinlearnercomponents=true;
      this.applyColour = 'Learners';
    } else if (this.router.url === '/home/mentor') {
      this.applyColour = 'Mentor';
    } else if (this.router.url === '/home/onboarding') {
      this.applyColour = 'Onboarding';
    } else if (this.router.url === '/home/requirement') {
      this.applyColour = 'Requirement';
    } else if (this.router.url === '/home/assignment') {
      this.applyColour = 'Assignment';
    } else if (this.router.url === '/home/newSetting') {
      this.showSettings = true;
      this.applyColour = 'Settings';
      this.applyColourToSettings = 'Configuration';
    } else if (this.router.url === '/home/fellowship') {
      this.showSettings = true;
      this.applyColour = 'Settings';
      this.applyColourToSettings = 'Fellowship';
    } else if (this.router.url === '/home/companylisting') {
      // this.showSettings = true;
      this.applyColour = 'Companies';
      // this.applyColourToSettings = 'Fellowship';
    }

  }

  toDashboard() {
    this.showsearchbarinlearnercomponents=false;
    this.applyColour == 'Dashboard';
    this.buttonSelected('Dashboard');
    this.router.navigateByUrl('home/dashboard');
  }

  toBatches() {
    this.showsearchbarinlearnercomponents=false;
    this.applyColour == 'Home';
    this.buttonSelected('Home');
    this.router.navigateByUrl('home/batch/Trial');
  }

  toRFPBatch() {
    this.showsearchbarinlearnercomponents=false;
    this.applyColour == 'RFP';
    this.buttonSelected('RFP');
    this.router.navigateByUrl('home/batch/RFP');
  }

  toCFPBatch() {
    this.showsearchbarinlearnercomponents=false;
    this.applyColour == 'CFP';
    this.buttonSelected('CFP');
    this.router.navigateByUrl('home/batch/CFP');
  }

  toCQABatch() {
    this.showsearchbarinlearnercomponents=false;
    this.applyColour == 'CQA';
    this.buttonSelected('CQA');
    this.router.navigateByUrl('home/batch/CQA');
  }

  toLFPBatch() {
    this.showsearchbarinlearnercomponents=false;
    this.applyColour == 'LFP';
    this.buttonSelected('LFP');
    this.router.navigateByUrl('home/batch/LFP');
  }

  toRecruitment() {
    this.router.navigateByUrl('home/recruitment');
  }

  toCoordinator() {
    this.showsearchbarinlearnercomponents=false;
    this.router.navigateByUrl('home/coordinator');
  }
  toLearners() {
    this.showsearchbarinlearnercomponents=true;
    // this.showsearchbarinlearnercomponents=false;
    this.router.navigateByUrl('home/learners');
  }
  toMentor() {
    this.showsearchbarinlearnercomponents=false;
    this.router.navigateByUrl('home/mentor');
  }
  toOnBoarding() {
    this.router.navigateByUrl('home/onboarding');
  }
  toRequirement() {
    this.router.navigateByUrl('home/requirement');
  }
  toAssignment() {
    this.router.navigateByUrl('home/assignment');
  }
  toCompanies() {
    this.router.navigateByUrl('home/companylisting');
  }
  toSettings() {
    this.router.navigateByUrl('home/newSetting');
  }

  toFellowship() {
    this.router.navigateByUrl('home/fellowship');
  }
  toConfiguration() {
    this.router.navigateByUrl('home/configuration');
  }

  buttonSelected(buttonColor: String) {
    this.applyColour = buttonColor;
    if (buttonColor === 'Settings') {
      this.showSettings = true;
      this.applyColourToSettings = 'Configuration';
    } else {
      this.showSettings = false;
    }
  }

  openProfileCard() {
    if (this.openCard) {
      this.openCard = false;
    } else {
      this.openCard = true;
    }
  }
  openSettings(settings: String) {
    this.applyColourToSettings = settings;
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  openChangePasswordDialog() {
    this.openCard = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '457px';
    dialogConfig.height = '327px';
    dialogConfig.panelClass = 'custom-dialog-container';
    this.openDialog.open(ChangepasswordComponent, dialogConfig);
  }

  openEditProfileDialog() {
    this.openCard = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '457px';
    dialogConfig.height = '347px';
    dialogConfig.panelClass = 'custom-dialog-container';
    this.openDialog.open(EditProfileComponent, dialogConfig);
  }

  onLearnerShowsearchBar() {
    this.showsearchbarinlearnercomponents = true;
  }

  onToolbarMenuToogle() {
    
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 72;
      // document.getElementById("setting-slider").style['margin-left'] = "5%"
    } else {
      this.contentMargin = 210;
      // document.getElementById("setting-slider").style['margin-left'] = "0%"
    }
  }
}