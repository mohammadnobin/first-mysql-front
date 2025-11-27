import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { employeeAPI } from '../services/api';

const EmployeeModal = ({ employee, isOpen, onClose }) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: employee?.name || '',
            salary: employee?.salary || '',
            city: employee?.city || ''
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

    const updateMutation = useMutation({
        mutationFn: (data) => employeeAPI.update(employee.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
            showSuccessAlert('Employee updated successfully!');
            onClose();
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.error || error.message || 'Something went wrong';
            showErrorAlert(`Error updating employee: ${errorMessage}`);
        }
    });

    const onSubmit = (data) => {
        const submitData = {
            ...data,
            salary: parseFloat(data.salary)
        };
        updateMutation.mutate(submitData);
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay with blur */}
                <div
                    className="fixed inset-0 transition-opacity backdrop-blur-sm bg-gray-500 bg-opacity-50"
                    onClick={handleCancel}
                ></div>

                {/* Modal panel */}
                <div className="relative inline-block w-full max-w-sm sm:max-w-md mx-auto px-3 sm:px-4 pt-4 sm:pt-5 pb-4 sm:pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg border-2 border-blue-100 sm:my-8 sm:align-middle">
                    {/* Close Button */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <button
                            onClick={handleCancel}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 border border-gray-300"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                        <div className="w-full mt-2 sm:mt-0 text-center sm:text-left">
                            {/* Header */}
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                                    Edit Employee
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Update the employee information below.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="modal-name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Employee Name *
                                    </label>
                                    <input
                                        id="modal-name"
                                        type="text"
                                        {...register('name', {
                                            required: 'Employee name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Name must be at least 2 characters'
                                            }
                                        })}
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200"
                                        placeholder="Enter employee name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-600 flex items-center">
                                            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Salary Field */}
                                <div>
                                    <label htmlFor="modal-salary" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Salary ($) *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                                        <input
                                            id="modal-salary"
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
                                            className="w-full pl-8 pr-3 py-2 text-sm sm:text-base border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    {errors.salary && (
                                        <p className="mt-1 text-xs text-red-600 flex items-center">
                                            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.salary.message}
                                        </p>
                                    )}
                                </div>

                                {/* City Field */}
                                <div>
                                    <label htmlFor="modal-city" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        City *
                                    </label>
                                    <input
                                        id="modal-city"
                                        type="text"
                                        {...register('city', {
                                            required: 'City is required',
                                            minLength: {
                                                value: 2,
                                                message: 'City must be at least 2 characters'
                                            }
                                        })}
                                        className="w-full px-3 py-2 text-sm sm:text-base border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200"
                                        placeholder="Enter city name"
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-xs text-red-600 flex items-center">
                                            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.city.message}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2 sm:space-x-3 pt-2 sm:pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-purple-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:py-2 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors flex items-center justify-center border border-blue-700 text-sm sm:text-base"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-xs sm:text-sm">Updating...</span>
                                            </>
                                        ) : (
                                            'Update Employee'
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-3 sm:py-2 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 border border-gray-600 text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;