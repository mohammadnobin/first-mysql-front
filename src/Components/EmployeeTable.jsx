import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { employeeAPI } from '../services/api';
import EmployeeModal from './EmployeeModal';

const EmployeeTable = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: employees = [], isLoading, error } = useQuery({
        queryKey: ['employees'],
        queryFn: () => employeeAPI.getAll().then(res => res.data)
    });

    const deleteMutation = useMutation({
        mutationFn: employeeAPI.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
            Swal.fire({
                title: 'Deleted!',
                text: 'Employee has been deleted successfully.',
                icon: 'success',
                confirmButtonColor: '#10b981',
                timer: 3000,
                timerProgressBar: true,
            });
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.error || error.message || 'Something went wrong';
            Swal.fire({
                title: 'Error!',
                text: `Error deleting employee: ${errorMessage}`,
                icon: 'error',
                confirmButtonColor: '#ef4444',
            });
        }
    });

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = (employee) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${employee.name}. This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: '#fff',
            iconColor: '#eab308',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(employee.id);
            }
        });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    if (isLoading) {
        return (
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-blue-100">
                <div className="flex items-center justify-center py-8 sm:py-12">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-blue-100">
                <div className="text-center py-6 sm:py-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Error Loading Products</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{error.message}</p>
                    <button 
                        onClick={() => queryClient.refetchQueries(['employees'])}
                        className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg border-2 border-purple-100 overflow-hidden">
                {/* Header */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-200 bg-purple-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800"> Products Directory</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                {employees.length} {employees.length === 1 ? 'Product' : 'Products'} found
                            </p>
                        </div>
                    </div>
                </div>

                {employees.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 px-4 sm:px-6">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">No Employees Found</h3>
                        <p className="text-sm sm:text-base text-gray-600">Get started by adding your first employee to the system.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-purple-50">
                                <tr>
                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Products
                                    </th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Country
                                    </th>
                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-200">
                                {employees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-purple-50 transition-colors">
                                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-purple-600 rounded-full flex items-center justify-center">
                                                    <span className="text-xs sm:text-sm font-medium text-white">
                                                        {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-2 sm:ml-3 lg:ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {employee.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        ID: #{employee.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">
                                                ${parseFloat(employee.salary).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-sm text-gray-900">{employee.city}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                                                <button
                                                    onClick={() => handleEdit(employee)}
                                                    className="text-purple-600 hover:text-purple-800 transition-colors p-1 sm:p-2 rounded hover:bg-blue-100 border border-blue-200"
                                                    title="Edit employee"
                                                >
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(employee)}
                                                    disabled={deleteMutation.isLoading}
                                                    className="text-red-600 hover:text-red-800 transition-colors p-1 sm:p-2 rounded hover:bg-red-100 border border-red-200 disabled:opacity-50"
                                                    title="Delete employee"
                                                >
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <EmployeeModal
                    employee={selectedEmployee}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                />
            )}
        </>
    );
};

export default EmployeeTable;