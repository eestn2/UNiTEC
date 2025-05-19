/**
 * @file offer.ts
 * @description Type definition for a job offer object as returned by the backend API.
 * Includes all attributes present in the job offer response.
 * @author Haziel Magallanes
 * @date May 17, 2025
 *
 * @property {number} id - Unique identifier for the job offer.
 * @property {number} creator_id - ID of the user who created the job offer.
 * @property {string} title - Title of the job offer.
 * @property {string} date - ISO timestamp representing the creation date of the job offer.
 * @property {string} description - Detailed description of the job offer.
 * @property {number} status - Status code of the job offer.
 */
export type offer = {
    /** Unique identifier for the job offer */
    id: number;
    /** ID of the user who created the job offer */
    creator_id: number;
    /** Title of the job offer */
    title: string;
    /** ISO timestamp representing the creation date of the job offer */
    date: string;
    /** Detailed description of the job offer */
    description: string;
    /** Status code of the job offer */
    status: number;
};

