interface CatInfo {
    age: number;
    breed: string;
}

type part = 'registration' | 'login' | 'auth';

const cats: Record<part, CatInfo> = {
    registration: { age: 10, breed: 'Persian' },
    login: { age: 5, breed: 'Maine Coon' },
    auth: { age: 16, breed: 'British Shorthair' },
};

// export class Info() {
//     constructor(private _parent?: Info) {

//     }

// }
