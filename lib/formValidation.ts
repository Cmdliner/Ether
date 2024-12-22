import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .positive("Age must be positive")
    .int("Age must be a whole number"),
});

export const medicalHistorySchema = z.object({
  allergies: z.string().min(1, "Allergies are required"),
  medications: z.string().min(1, "Medications are required"),
});

// Combine all schemas
export const validationSchemas = [personalInfoSchema, medicalHistorySchema];


type PersonalInfo = z.infer<typeof personalInfoSchema>;
type MedicalHistory = z.infer<typeof medicalHistorySchema>;

export type FormData = PersonalInfo & MedicalHistory;