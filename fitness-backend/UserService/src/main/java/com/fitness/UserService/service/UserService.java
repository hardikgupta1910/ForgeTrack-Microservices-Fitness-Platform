package com.fitness.UserService.service;

import com.fitness.UserService.dto.LoginRequest;
import com.fitness.UserService.dto.RegisterRequest;
import com.fitness.UserService.dto.UpdateUserRequest;
import com.fitness.UserService.dto.UserResponse;
import com.fitness.UserService.models.User;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserService {



	UserResponse register(RegisterRequest request);

	UserResponse validateLogin(LoginRequest request);

	UserResponse getUserById(String requestedId,
	                         String authHeader,
	                         String headerUserId,
	                         String headerRole);

	UserResponse updateUser(String id,
	                        UpdateUserRequest request,
	                        String authHeader,
	                        String headerUserId,
	                        String headerRole);

	void deleteUser(String id,
	                String authHeader,
	                String headerUserId,
	                String headerRole);

	void updateUserRole(String id,
	                    String roleParam,
	                    String authHeader,
	                    String headerUserId,
	                    String headerRole);

	List<UserResponse> getAllUsers(String authHeader,
	                               String headerUserId,
	                               String headerRole);


}
