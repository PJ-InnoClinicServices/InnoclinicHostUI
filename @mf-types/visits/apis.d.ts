
    export type RemoteKeys = 'visits/Counter';
    type PackageType<T> = T extends 'visits/Counter' ? typeof import('visits/Counter') :any;