import { Photo } from './Photo';

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo[];
}
