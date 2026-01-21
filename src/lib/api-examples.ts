/**
 * API Client Usage Examples
 *
 * This file demonstrates how to use the api-client helper function
 * in various scenarios within your Next.js application
 */

import apiClient, { ApiResponse, downloadFile, uploadFile } from './api-client';

// ============================================
// Example 1: Basic GET Request
// ============================================

export async function getUsers() {
  try {
    const users = await apiClient.get('/api/users');
    return users;
  } catch (error: any) {
    console.error('Failed to fetch users:', error.message);
    throw error;
  }
}

// ============================================
// Example 2: GET with Query Parameters
// ============================================

export async function searchProducts(query: string, page: number = 1) {
  try {
    const response = await apiClient.get('/api/products', {
      params: {
        q: query,
        page,
        limit: 10
      }
    });
    return response;
  } catch (error: any) {
    console.error('Search failed:', error.message);
    throw error;
  }
}

// ============================================
// Example 3: POST Request (Login)
// ============================================

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse extends ApiResponse {
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
  };
}

export async function login(credentials: LoginCredentials) {
  try {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);

    if (response.success && response.data?.token) {
      // Store token (example using localStorage)
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    }

    throw new Error(response.error || 'Login failed');
  } catch (error: any) {
    console.error('Login error:', error.message);
    throw error;
  }
}

// ============================================
// Example 4: PUT Request (Update Profile)
// ============================================

interface UpdateProfileData {
  name?: string;
  phone?: string;
  address?: string;
}

export async function updateProfile(userId: string, data: UpdateProfileData) {
  try {
    const response = await apiClient.put(`/api/users/${userId}`, data);
    return response;
  } catch (error: any) {
    console.error('Update profile failed:', error.message);
    throw error;
  }
}

// ============================================
// Example 5: PATCH Request (Partial Update)
// ============================================

export async function toggleUserStatus(userId: string, active: boolean) {
  try {
    const response = await apiClient.patch(`/api/users/${userId}`, {
      active
    });
    return response;
  } catch (error: any) {
    console.error('Toggle user status failed:', error.message);
    throw error;
  }
}

// ============================================
// Example 6: DELETE Request
// ============================================

export async function deleteUser(userId: string) {
  try {
    const response = await apiClient.delete(`/api/users/${userId}`);
    return response;
  } catch (error: any) {
    console.error('Delete user failed:', error.message);
    throw error;
  }
}

// ============================================
// Example 7: File Upload
// ============================================

export async function uploadAvatar(userId: string, file: File) {
  try {
    const response = await uploadFile(
      `/api/users/${userId}/avatar`,
      file,
      'avatar', // field name
      { userId } // additional data
    );
    return response;
  } catch (error: any) {
    console.error('Upload avatar failed:', error.message);
    throw error;
  }
}

// ============================================
// Example 8: File Download
// ============================================

export async function downloadInvoice(invoiceId: string) {
  try {
    await downloadFile(`/api/invoices/${invoiceId}/download`, `invoice-${invoiceId}.pdf`);
  } catch (error: any) {
    console.error('Download invoice failed:', error.message);
    throw error;
  }
}

// ============================================
// Example 9: Custom Headers & Timeout
// ============================================

export async function getProtectedData() {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const response = await apiClient.get('/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Custom-Header': 'custom-value'
      },
      timeout: 30000 // 30 seconds
    });

    return response;
  } catch (error: any) {
    console.error('Failed to fetch protected data:', error.message);
    throw error;
  }
}

// ============================================
// Example 10: In a React Component (Client)
// ============================================

/*
'use client';

import { useState } from 'react';
import { login } from '@/lib/api-examples';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login({ email, password });
      console.log('Login successful:', data);
      // Redirect or update state
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
}
*/

// ============================================
// Example 11: In a Server Component
// ============================================

/*
import apiClient from '@/lib/api-client';

export default async function UsersPage() {
  try {
    const users = await apiClient.get('/api/users', {
      // Next.js specific options
      cache: 'no-store', // or 'force-cache'
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });

    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
}
*/
