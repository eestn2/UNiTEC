/**
 * @file user.ts
 * @description Type definition for User objects used in the application.
 * Represents the structure of a user as stored in the session and received from the backend.
 * @author Haziel Magallanes
 * @date May 19, 2025
 */

/**
 * Represents a user entity.
 *
 * @property {number} id - Unique identifier for the user.
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email address.
 * @property {string} type - The user's role (e.g., "student", "enterprise", "admin").
 * @property {string} location - The user's location (e.g., city, country).
 * @property {string} status - The user's current status (e.g., "active", "inactive").
 * @property {string} description - The user's description or bio.
 * @property {string} portfolio - The user's portfolio or website URL.
 * @property {string} [profile_picture] - Optional URL to the user's profile picture.
 */
export type user = {
    /** Unique identifier for the user. */
    id: number;
    /** The user's full name. */
    name: string;
    /** The user's email address. */
    email: string;
    /** The user's location (e.g., city, country). */
    location: string;
    /** The user's current status (e.g., "active", "inactive"). */
    status: UserStatusEnum
    /** The user's description or bio. */
    description: string;
    /** The user's portfolio or website URL. */
    portfolio: string;
    /** The user's role (e.g., "student", "enterprise", "admin"). */
    type: UserTypeEnum;
    /** Optional URL to the user's profile picture. */
    profile_picture?: string;
};
/** Enum de estados de usuario, 0 = Estudiando, 1 = Buscando trabajo, 2 = Trabajando, 3 = Egresado */
export enum UserStatusEnum {
    Estudiando = 1,
    Buscando = 2,
    Trabajando = 3,
    Egresado = 4
};


/** Enum de tipos de usuario 0 = Empresa, 1 = Estudiante, 2 = Egresado, 3 = Administrador. */
export enum UserTypeEnum {
    Empresa = 1,
    Estudiante = 2,
    Egresado = 3,
    Administrador = 4
}
export default user;