
    export type RemoteKeys = 'appointments/Counter' | 'appointments/Page1' | 'appointments/AppointmentPage';
    type PackageType<T> = T extends 'appointments/BookingPage' ? typeof import('appointments/AppointmentPage') :T extends 'appointments/Page1' ? typeof import('appointments/Page1') :T extends 'appointments/Counter' ? typeof import('appointments/Counter') :any;