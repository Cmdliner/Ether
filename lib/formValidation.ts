import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .positive("Age must be positive")
    .int("Age must be a whole number"),
  nationality: z.string().min(1, "Nationality required"),
  gender: z.enum(["F", "M"], {
    required_error: "Gender required", 
    invalid_type_error: `Gender has to be either "F" or "M"`
  })

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
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string()
})

  // Combine all schemas
  export const validationSchemas = [personalInfoSchema, medicalHistorySchema];


  type PersonalInfo = z.infer<typeof personalInfoSchema>;
  type MedicalHistory = z.infer<typeof medicalHistorySchema>;
  type AccountCredentials = z.infer<typeof accountCredentialsSchema>;

  export type FormData = PersonalInfo & MedicalHistory & AccountCredentials;