
    export type RemoteKeys = 'remote/Counter';
    type PackageType<T> = T extends 'remote/Counter' ? typeof import('remote/Counter') :any;