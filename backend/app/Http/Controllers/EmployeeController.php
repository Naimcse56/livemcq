<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    /**
     * Employee list (User ভিত্তিক)
     */
    public function index()
    {
        try {
            $users = User::with('employee')->latest()->get();

            return response()->json([
                'status' => true,
                'data' => $users
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch employees',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store User + Employee
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone' => 'nullable|string',
            'user_type' => 'required|in:admin,staff',
            'gender' => 'nullable|in:male,female,other',
            'status' => 'nullable|in:active,inactive',

            'nid_number' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'joining_date' => 'nullable|date',
        ]);

        try {

            DB::beginTransaction();

            // Create User
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'gender' => $request->gender,
                'status' => $request->status,
                'user_type' => $request->user_type,
            ]);

            // Create Employee
            Employee::create([
                'user_id' => $user->id,
                'nid_number' => $request->nid_number,
                'address' => $request->address,
                'joining_date' => $request->joining_date,
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Employee created successfully',
                'data' => $user->load('employee')
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Employee creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show Employee by User ID
     */
    public function show($id)
    {
        try {

            $user = User::with('employee')
                ->where('user_type', 'employee')
                ->findOrFail($id);

            return response()->json([
                'status' => true,
                'data' => $user
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Employee not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update User + Employee
     */
    public function update(Request $request, $id)
    {
        try {

            $user = User::where('user_type', 'employee')
                ->findOrFail($id);

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $id,
                'password' => 'nullable|min:6',
                'phone' => 'nullable|string',
                'user_type' => 'required|in:admin,staff',
                'gender' => 'nullable|in:male,female,other',
                'status' => 'nullable|in:active,inactive',

                'nid_number' => 'nullable|string|max:50',
                'address' => 'nullable|string',
                'joining_date' => 'nullable|date',
            ]);

            DB::beginTransaction();

            // Update User
            $user->update([
                'name' => $request->name ?? $user->name,
                'email' => $request->email ?? $user->email,
                'password' => $request->password ? Hash::make($request->password) : $user->password,
                'phone' => $request->phone ?? $user->phone,
                'gender' => $request->gender ?? $user->gender,
                'status' => $request->status ?? $user->status,
                'user_type' => $request->user_type,
            ]);

            // Update or Create Employee
            if ($user->employee) {
                $user->employee->update([
                    'nid_number' => $request->nid_number,
                    'address' => $request->address,
                    'joining_date' => $request->joining_date,
                ]);
            } else {
                Employee::create([
                    'user_id' => $user->id,
                    'nid_number' => $request->nid_number,
                    'address' => $request->address,
                    'joining_date' => $request->joining_date,
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Employee updated successfully',
                'data' => $user->load('employee')
            ], 200);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Employee update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete Employee (User সহ)
     */
    public function destroy($id)
    {
        try {

            $user = User::where('user_type', 'employee')
                ->findOrFail($id);

            DB::beginTransaction();

            $user->delete(); // cascade হলে employee auto delete হবে

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Employee deleted successfully'
            ], 200);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Employee deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}