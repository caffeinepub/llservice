import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactRequest {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getAllContactRequests(): Promise<Array<ContactRequest>>;
    getAllContactRequestsByEmail(): Promise<Array<ContactRequest>>;
    getContactRequest(id: string): Promise<ContactRequest>;
    submitContactRequest(id: string, name: string, phone: string, email: string, message: string): Promise<void>;
}
