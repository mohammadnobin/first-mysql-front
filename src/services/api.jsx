import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Employees API
export const employeeAPI = {
    // Get all employees
    getAll: () => api.get('/employees'),
    
    // Get employee by ID
    getById: (id) => api.get(`/employees/${id}`),
    
    // Create new employee
    create: (employeeData) => api.post('/employees', employeeData),
    
    // Update employee
    update: (id, employeeData) => api.put(`/employees/${id}`, employeeData),
    
    // Delete employee
    delete: (id) => api.delete(`/employees/${id}`),
};

export default api;