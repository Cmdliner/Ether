"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchemas, FormData } from "@/lib/formValidation";
import { countries } from "@/lib/countries";
import { redirect } from "next/navigation";

const steps = [
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Medical History" },
  { id: 3, label: "Account Credentials" },
];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;
  const [formData, setFormData] = useState<Partial<FormData>>({
    full_name: "",
    gender: undefined,
    nationality: "",
    age: 0,
    allergies: undefined,
    medications: undefined,
    genotype: undefined,
    email: "",
    password: "",
    confirm_password: "",
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(validationSchemas[currentStep]),
    defaultValues: formData,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: Partial<FormData>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    if (isLastStep) {
      if(updatedData.password !== updatedData.confirm_password) {
        // throw new form error that says that confirm pasword doesnt match password
      }

      // !todo => Send request (excluding confirm_password) to /api/register;
      const { confirm_password, ...userData } = updatedData;
      const res = await fetch("/api/auth/register", {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if(data.status === 201) {
        redirect("/");
      }
      // ! todo => Handle other kinds of errors and error states
      return;
    }
    setCurrentStep((prev) => prev + 1);
    reset(updatedData);
  };

  const goBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex  items-center justify-center m-[2em]">
      <div className="w-full max-w-lg py-[5em] md:py-0 p-6 bg-white rounded-lg shadow-lg">
        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          {steps[currentStep].label}
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Render Fields Dynamically */}
            {currentStep === 0 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    {...register("full_name")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.age.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nationality
                  </label>
                  <select
                    {...register("nationality")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Select Country --</option>
                    {countries.map((country: string) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {errors.nationality && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nationality.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Allergies
                  </label>
                  <input
                    {...register("allergies")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.allergies && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.allergies.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medications
                  </label>
                  <input
                    {...register("medications")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.medications && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.medications.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Genotype
                  </label>
                  <input
                    {...register("genotype")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.genotype && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.genotype.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    type="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirm_password")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    type="password"
                  />
                  {errors.confirm_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:ring focus:ring-gray-300"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
              >
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
