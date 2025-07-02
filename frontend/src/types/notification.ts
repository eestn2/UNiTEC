/**
 * @file notification.ts
 * @description Type definition for Notification objects used in the application.
 * Represents the structure of a notification as received from the backend.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */


/**
 * Represents a notification entity.
 *
 * @property {number} id - Unique identifier for the notification.
 * @property {number} type - Type/category of the notification.
 * @property {string} message - The main content or message of the notification.
 * @property {number} sender_id - The user ID of the sender.
 * @property {number} receiver_id - The user ID of the receiver.
 * @property {string | null} action - Optional action associated with the notification (e.g., a route or action name).
 */
export type notification = {
    /*** Unique identifier for the notification.*/
    id: number;
    /*** Type/category of the notification.*/
    type: number;
    /*** The main content or message of the notification.*/
    message: string;
    /*** The user ID of the sender.*/
    sender_id: number;
    /*** The user ID of the receiver.*/
    receiver_id: number;
    /*** Optional action associated with the notification (e.g., a route or action name).*/
    action: string | null;
};