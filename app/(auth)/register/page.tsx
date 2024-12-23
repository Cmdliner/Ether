"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchemas, FormData } from "@/lib/formValidation";

const steps = [
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Medical History" },
  { id: 3, label: "Account Credentials" },
];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;

  const methods = useForm<FormData>({
    resolver: zodResolver(validationSchemas[currentStep]),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: undefined,
      nationality: "",
      age: undefined,
      allergies: "",
      medications: "",
      genotype: undefined,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormData) => {
    if (isLastStep) {
      console.log("Final Submission Data:", data);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex  items-center justify-center m-[2em]">
      <div className="w-full max-w-lg py-[5em] md:py-0 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-[1rem]">
          Eather | Register
        </h1>
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
                    First Name
                  </label>
                  <input
                    {...register("first_name")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    {...register("last_name")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.last_name.message}
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
                  <input
                    {...register("gender")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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
                  <input
                    {...register("nationality")}
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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
