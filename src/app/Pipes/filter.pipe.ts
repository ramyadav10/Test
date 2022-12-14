import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../service/dataservice.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string) {
    if (value.length === 0 || filterString === '') {
      //  return value;
    } else {
      console.log("filterString ::: ",filterString);

      return value.filter(
        (student: { fullName: string }) =>
          student.fullName.toLowerCase().indexOf(filterString.toLowerCase()) !==
          -1
      );
    }
  }
}

@Pipe({
  name: 'filterCoordinator',
})
export class FilterPipeCoordinator implements PipeTransform {
  searchData: any;
  showListData: boolean | undefined;
  constructor(private dataService: DataService) {}

  transform(value: any, filterString: string) {
    if (value.length === 0 || filterString === '') {
      return value;
    } else {
      this.dataService.searchMessage.subscribe((text: any) => {
        this.searchData = text;
        if (text == null || text == '') {
          this.showListData = false;
        } else {
          this.showListData = this.showListData;
        }
      });

      if (this.searchData === 'firstName') {
        let coordinatorsList = value.filter(
          (student: { firstName: string }) =>
            student.firstName
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
        return coordinatorsList;
      }

      if (this.searchData === 'lastName') {
        return value.filter(
          (student: { lastName: string }) =>
            student.lastName
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }

      if (this.searchData === 'emailId') {
        return value.filter(
          (student: { emailId: string }) =>
            student.emailId
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'mobileNo') {
        return value.filter(
          (student: { mobileNo: string }) =>
            student.mobileNo
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'secondaryMobileNo') {
        return value.filter(
          (student: { secondaryMobileNo: string }) =>
            student.secondaryMobileNo
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
    }
  }
}

@Pipe({
  name: 'filterMentor',
})
export class FilterPipeMentor implements PipeTransform {
  searchData: any;
  showListData: boolean | undefined;
  constructor(private dataService: DataService) {}

  transform(value: any, filterString: string) {
    console.log('data of filter', filterString);

    if (value.length === 0 || filterString === '') {
      return value;
    } else {
      console.log('filter string data', filterString);

      this.dataService.searchMessage.subscribe((text: any) => {
        this.searchData = text;
        if (text == null || text == '') {
          this.showListData = false;
        } else {
          this.showListData = this.showListData;
        }
      });
      console.log('search data', this.showListData);

      if (this.searchData === 'firstName') {
        let mentorsList = value.filter(
          (student: { firstName: string }) =>
            student.firstName
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
        return mentorsList;
      }

      if (this.searchData === 'lastName') {
        return value.filter(
          (student: { lastName: string }) =>
            student.lastName
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }

      if (this.searchData === 'email') {
        return value.filter(
          (student: { email: string }) =>
            student.email.toLowerCase().indexOf(filterString.toLowerCase()) !==
            -1
        );
      }
      if (this.searchData === 'mobileNumber') {
        return value.filter(
          (student: { mobileNumber: string }) =>
            student.mobileNumber
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'mentorRole') {
        return value.filter(
          (student: { mentorRole: string }) =>
            student.mentorRole
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'employeeId') {
        return value.filter(
          (student: { employeeId: string }) =>
            student.employeeId
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }

      if (this.searchData === 'experienceYears') {
        return value.filter(
          (student: { experienceYears: string }) =>
            student.experienceYears
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'status') {
        return value.filter(
          (student: { status: string }) =>
            student.status.toLowerCase().indexOf(filterString.toLowerCase()) !==
            -1
        );
      }
    }
  }
}

@Pipe({
  name: 'filterLearners',
})
export class FilterPipeBatch implements PipeTransform {
  searchData: any;
  showListData: boolean | undefined;
  constructor(private dataService: DataService) {}

  transform(value: any, filterString: string) {
    console.log('value :::: ', value);
    console.log('data of filter', filterString);

    if (value.length === 0 || filterString === '') {
      return value;
    } else {
      console.log('filter string data', filterString);

      this.dataService.searchMessage.subscribe((text: any) => {
        this.searchData = text;
        if (text == null || text == '') {
          this.showListData = false;
        } else {
          this.showListData = this.showListData;
        }
      });
      console.log('searchData :::: ', this.searchData);

      if (this.searchData === 'CIC_ID') {
        let mentorsList = value.filter(
          (candidate: { cicId: any }) =>
            candidate.cicId
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
        return mentorsList;
      }

      if (this.searchData === 'NAME') {
        return value.filter(
          (candidate: { fullName: any }) =>
            candidate.fullName
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }

      if (this.searchData === 'EMAIL') {
        return value.filter(
          (candidate: { email: any }) =>
            candidate.email
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'PHONE_NUMBER') {
        return value.filter(
          (candidate: { mobileNum: any }) =>
            candidate.mobileNum
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'DEGREE') {
        return value.filter(
          (student: { degree: any }) =>
            student.degree.toLowerCase().indexOf(filterString.toLowerCase()) !==
            -1
        );
      }
      if (this.searchData === 'PERCENTAGE') {
        return value.filter(
          (candidate: { aggrPer: any }) =>
            candidate.aggrPer
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }

      if (this.searchData === 'YEAR') {
        return value.filter(
          (candidate: { passedOutYear: any }) =>
            candidate.passedOutYear
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
    }
  }
}

@Pipe({
  name: 'filterAllBatch',
})
export class FilterPipeAllBatch implements PipeTransform {
  searchData: any;
  showListData: boolean | undefined;
  constructor(private dataService: DataService) {}

  transform(value: any, filterString: string) {
    console.log('value :::: ', value);
    console.log('data of filter', filterString);

    if (value.length === 0 || filterString === '') {
      return value;
    } else {
      console.log('filter string data', filterString);

      this.dataService.searchMessage.subscribe((text: any) => {
        this.searchData = text;
        if (text == null || text == '') {
          this.showListData = false;
        } else {
          this.showListData = this.showListData;
        }
      });
      console.log('searchData :::: ', this.searchData);

      if (this.searchData === 'NAME') {
        let mentorsList = value.filter(
          (Batch: { batchName: any }) =>
            Batch.batchName
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
        return mentorsList;
      }

      if (this.searchData === 'TECHSTACK') {
        return value.filter(
          (Batch: { techStack: any }) =>
            Batch.techStack
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }

      if (this.searchData === 'STARTDATE') {
        return value.filter(
          (Batch: { startDate: any }) =>
            Batch.startDate
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'ENDDATE') {
        return value.filter(
          (Batch: { computedFinishDate: any }) =>
            Batch.computedFinishDate
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'PRACTICEHEAD') {
        return value.filter(
          (Batch: { praticeHead: any }) =>
            Batch.praticeHead
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
      if (this.searchData === 'COORDINATOR') {
        return value.filter(
          (Batch: { coordinator: any }) =>
            Batch.coordinator
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }

      if (this.searchData === 'SESSIONTIME') {
        return value.filter(
          (Batch: { sessionTime: any }) =>
            Batch.sessionTime
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1
        );
      }
    }
  }
}
