
    export type RemoteKeys = 'innoclinic_appointments/AppointmentsPage';
    type PackageType<T> = T extends 'innoclinic_appointments/BookingsPage' ? typeof import('innoclinic_appointments/AppointmentsPage') :any;