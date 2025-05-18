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
/**
 * Represents a typed API response where data is an object with a named array property.
 * 
 * @template T - The type of the array elements.
 * @template K - The name of the array property in the data object.
 * 
 * @extends Response
 * @property {{ [key in K]: T[] }} data - The strongly-typed data payload returned by the API, where the data is an object with a named array property.
 * 
 * @example
 * // Usage in FeedBox.tsx:
 * // const notification = response.data as TypedResponseWNamedArray<notification, "notifications">;
 * // const jobOffers = response.data as TypedResponseWNamedArray<offer, "job_offers">;
 */
export interface TypedResponseWNamedArray<T, K extends string> extends Response {
    /**
     * The strongly-typed data payload returned by the API.
     * @type {{ [key in K]: T[] }}
     */
    data: {
        [key in K]: T[];
    };
}