// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  googleMapConfig: {
    GOOGLE_MAPS_API_URL: 'https://maps.googleapis.com/maps/api/js?key=',
    GOOGLE_MAPS_API_KEY: 'AIzaSyBI2qfEHOHhY0hfqTzSC_qs1a4LomhVmTI',
    InitCoords: { lat: 41.7151377, lng: 44.827096 }
  }
};
