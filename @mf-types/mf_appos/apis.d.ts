
    export type RemoteKeys = 'mf_appos/Counter';
    type PackageType<T> = T extends 'mf_appos/Counter' ? typeof import('mf_appos/Counter') :any;