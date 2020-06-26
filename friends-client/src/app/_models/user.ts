import { Photo } from './Photo';

export interface User {
    id: number;
    email: string;
    firstName: string;
    LastName: string;
    Gender: string;
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
