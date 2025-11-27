import React from 'react';
import EmployeeForm from '../Components/EmployeeForm';
import EmployeeTable from '../Components/EmployeeTable';

const HomePage = () => {
    return (
         <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">P</span>
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Products Manager
                                </h1>
                                <p className="text-xs text-gray-500 hidden sm:block">
                                    Streamline your inventory
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <button className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                                Dashboard
                            </button>
                            <button className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:shadow-lg transition-all">
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900">200</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">In Stock</p>
                        <p className="text-2xl font-bold text-green-600">50</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Low Stock</p>
                        <p className="text-2xl font-bold text-orange-600">80</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Categories</p>
                        <p className="text-2xl font-bold text-purple-600">10</p>
                    </div>
                </div>

                {/* Two Column Layout - Form on Left, Table on Right */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
                    {/* Form Section - Sidebar Style */}
                    <div className="xl:col-span-4">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-6">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Add New Product
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Fill in the details below
                                </p>
                            </div>
                            <div className="p-6">
                                <EmployeeForm />
                            </div>
                        </div>
                    </div>

                    {/* Table Section - Main Content Area */}
                    <div className="xl:col-span-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Product Inventory
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Manage all your products in one place
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                            Filter
                                        </button>
                                        <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <EmployeeTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;