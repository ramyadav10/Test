// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    //ejetLMSServiceURL:'https://lms.devapi.bridgelabz.com/',
    ejetLMSServiceURL:'http://localhost:8080/',


  // coordinatorServiceURL: 'https://lms-coord-stg.incubation.bridgelabz.com/',
  s3BucketURL: 'https://lms-bucket-preprod.s3.ap-south-1.amazonaws.com/'

  // ************** localhost URL *******************

  // hiringServiceURL: "http://localhost:8080/",
  //  batchServiceURL: "http://localhost:8080/",
  //  learnerServiceURL: "http://localhost:8080/",
  //  adminServiceURL:   "http://localhost:8080/",

  // ************** REMOTE URL *******************
  // ejetLMSServiceURL:'http://localhost:8080/'
  // batchServiceURL: 'https://lms.devapi.bridgelabz.com/',
  // learnerServiceURL: 'https://lms.devapi.bridgelabz.com/',
  // adminServiceURL: 'https://lms.devapi.bridgelabz.com/',
  // hiringServiceURL: 'https://lms-batch-stg.incubation.bridgelabz.com/',
  // adminServiceURL: "https://lms-admin-backend-stg.incubation.bridgelabz.com/",
  //  batchServiceURL: "https://lms-batch-stg.incubation.bridgelabz.com/",
};
/*

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
