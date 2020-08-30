import { Photo } from './Photo';

export interface User {
    id: number;
    email: string;
    firstName: string; // can be delete
    lastName: string; // can be delete
    gender: string;  // can be delete
    age: number; // can be delete
    knownAs: string; // can be delete
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string; // can be delete
    country: string; // can be delete
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo[];
}
