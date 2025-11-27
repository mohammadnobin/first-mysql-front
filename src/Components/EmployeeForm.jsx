import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { employeeAPI } from '../services/api';

const EmployeeForm = () => {
    const queryClient = useQueryClient();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: '',
            salary: '',
            city: ''
        }
    });

    const showSuccessAlert = (message) => {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#10b981',
            timer: 3000,
            timerProgressBar: true,
        });
    };

    const showErrorAlert = (message) => {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ef4444',
        });
    };

    const createMutation = useMutation({
        mutationFn: employeeAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
            showSuccessAlert('Employee created successfully!');
            reset();
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.error || error.message || 'Something went wrong';
            showErrorAlert(`Error creating employee: ${errorMessage}`);
        }
    });

    const onSubmit = (data) => {
        const submitData = {
            ...data,
            salary: parseFloat(data.salary)
        };
        createMutation.mutate(submitData);
    };

    return (
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-purple-100">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                    Add New Product
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                    Fill in the details to add a new Product to the system
                </p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { 
                                required: 'Employee name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters'
                                }
                            })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
                            placeholder="Enter employee full name"
                        />
                        {errors.name && (
                            <p className="mt-1 sm:mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Salary Field */}
                    <div>
                        <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-2">
                            Price ($) *
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">$</span>
                            <input
                                id="salary"
                                type="number"
                                step="0.01"
                                min="0"
                                {...register('salary', { 
                                    required: 'Salary is required',
                                    min: {
                                        value: 0,
                                        message: 'Salary must be positive'
                                    },
                                    valueAsNumber: true
                                })}
                                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
                                placeholder="0.00"
                            />
                        </div>
                        {errors.salary && (
                            <p className="mt-1 sm:mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {errors.salary.message}
                            </p>
                        )}
                    </div>

                    {/* City Field */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                            Country *
                        </label>
                        <input
                            id="city"
                            type="text"
                            {...register('city', { 
                                required: 'City is required',
                                minLength: {
                                    value: 2,
                                    message: 'City must be at least 2 characters'
                                }
                            })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
                            placeholder="Enter city name"
                        />
                        {errors.city && (
                            <p className="mt-1 sm:mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-purple-700"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-sm sm:text-base">Adding Products...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-sm sm:text-base">Add Products</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;