/**
 * @file Response.ts
 * @description Type definitions for standard API responses used throughout the application.
 * Provides a generic interface for typed backend responses, including status, message, and optional data.
 * Used by components such as Notification.tsx to ensure type safety when handling API data.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */

/**
 * Represents a generic API response structure.
 *
 * @property {string} status - The status of the response (e.g., "success", "failed").
 * @property {string} message - A message describing the result of the API call.
 * @property {unknown} [data] - Optional data payload returned by the API.
 */
export type Response = {
    /*** The status of the response (e.g., "success", "error").*/
    status: string;
    /*** A message describing the result of the API call.*/
    message: string;
    /*** Optional data payload returned by the API.*/
    data?: unknown;
}

/**
 * Represents a typed API response with a specific data type.
 *
 * @template T - The type of the data payload.
 * @extends Response
 * @property {T} data - The strongly-typed data payload returned by the API.
 *
 * @example
 * // Usage in Notification.tsx:
 * // const notification = response.data as TypedResponse<notification>;
 */
export interface TypedResponse<T> extends Response {
    /**
     *  The strongly-typed data payload returned by the API.
     *  @type {T} */
    data: T;
}