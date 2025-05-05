import { Utilisateur } from '../../utilisateur/utilisateur.entity';

declare module 'express' {
  interface Request {
    user: Utilisateur;
  }
}
