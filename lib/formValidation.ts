import { z } from "zod";
import { countries } from "./countries";

export const personalInfoSchema = z.object({
  full_name: z.string().min(1, "First name is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .positive("Age must be positive")
    .int("Age must be a whole number"),
  nationality: z.enum(countries as [string, ...string[]], {
    required_error: "Nationality required",
  }),
  gender: z.enum(["F", "M"], {
    required_error: "Gender required",
    invalid_type_error: `Gender has to be either "F" or "M"`,
  }),
});

export const medicalHistorySchema = z.object({
  allergies: z.string().optional(),
  medications: z.string().optional(),
  genotype: z.enum(["AS", "AA", "AC", "SS", "SC", "CC"], {
    required_error: "Genotype is required",
    invalid_type_error: "Invalid genotype"
  })
});

export const accountCredentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirm_password: z.string()
});


export const loginValidationSchema  = z.object({
  email: z.string().email(),
  password: z.string()
});

export const otpValidationSchema = z.object({
  otp: z.object({
    value: z.string(),
    kind: z.enum(["password_reset", "email_verification"] as [string, ...string[]]),
    expires_at: z.date()
  }).optional()
})

export const validationSchemas = [personalInfoSchema, medicalHistorySchema, accountCredentialsSchema];

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type MedicalHistory = z.infer<typeof medicalHistorySchema>;
type AccountCredentials = z.infer<typeof accountCredentialsSchema>;
type Otp = z.infer<typeof otpValidationSchema>;

export type FormData = PersonalInfo & MedicalHistory & AccountCredentials;
export type LoginData = z.infer<typeof loginValidationSchema>;

export type IUser = Omit<FormData, 'confirm_password'> & Otp;