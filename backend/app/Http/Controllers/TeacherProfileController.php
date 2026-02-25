<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TeacherProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeacherProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::with('teacher')->where('user_type', 'teacher')->latest()->get();

            return response()->json([
                'status' => true,
                'data' => $users
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch teachers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
                                'name' => 'required|string|max:255',
                                'email' => 'required|email|unique:users,email',
                                'password' => 'required|min:6',
                                'phone' => 'nullable|string',
                                'gender' => 'nullable|in:male,female,other',
                                'status' => 'nullable|in:active,inactive',
                                'nid_number' => 'nullable|string|max:50',
                                'address' => 'nullable|string',
                                'joining_date' => 'nullable|date',
                            ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

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
                'user_type' => 'teacher',
                'is_verified' => 'pending'
            ]);

            // Create Teacher
            TeacherProfile::create([
                'user_id' => $user->id,
                'nid_number' => $request->nid_number,
                'about_self' => $request->about_self,
                'joining_date' => $request->joining_date,
                'commission_percentage' => $request->commission_percentage,
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Teacher created successfully',
                'data' => $user->load('teacher')
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Teacher creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {

            $user = User::with('teacher')->where('user_type', 'teacher')->findOrFail($id);

            return response()->json([
                'status' => true,
                'data' => $user
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Teacher not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update User + Teacher
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
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

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }
        try {

            $user = User::findOrFail($id);

            DB::beginTransaction();

            // Update User
            $user->update([
                'name' => $request->name ?? $user->name,
                'email' => $request->email ?? $user->email,
                'password' => $request->password ? Hash::make($request->password) : $user->password,
                'phone' => $request->phone ?? $user->phone,
                'gender' => $request->gender ?? $user->gender,
                'status' => $request->status ?? $user->status,
            ]);

            // Update or Create Teacher
            if ($user->teacher) {
                $user->teacher->update([
                    'nid_number' => $request->nid_number,
                    'about_self' => $request->about_self,
                    'joining_date' => $request->joining_date,
                    'commission_percentage' => $request->commission_percentage
                ]);
            } else {
                TeacherProfile::create([
                    'user_id' => $user->id,
                    'nid_number' => $request->nid_number,
                    'address' => $request->address,
                    'joining_date' => $request->joining_date,
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Teacher updated successfully',
                'data' => $user->load('teacher')
            ], 200);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Teacher update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete Teacher (User সহ)
     */
    public function destroy($id)
    {
        try {

            $user = User::where('user_type', 'teacher')->findOrFail($id);

            DB::beginTransaction();

            $user->delete(); // cascade হলে Teacher auto delete হবে

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Teacher deleted successfully'
            ], 200);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Teacher deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
