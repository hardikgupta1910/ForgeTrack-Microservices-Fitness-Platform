

package com.fitness.UserService.controller;

import com.fitness.UserService.dto.*;
import com.fitness.UserService.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

	private final UserService userService;

	// REGISTER
	@PostMapping("/register")
	public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
		return ResponseEntity.ok(userService.register(request));
	}

	//LOGIN
	@PostMapping("/validate-login")
	public ResponseEntity<UserResponse> validateLogin(@RequestBody LoginRequest request) {
		return ResponseEntity.ok(userService.validateLogin(request));
	}

	//GET USER
	@GetMapping("/{userId}")
	public ResponseEntity<UserResponse> getUser(
			@PathVariable String userId,
			@RequestHeader("Authorization") String authHeader,
			@RequestHeader("X-User-Id") String headerUserId,
			@RequestHeader("X-User-Role") String headerRole
	) {
		return ResponseEntity.ok(
				userService.getUserById(userId, authHeader, headerUserId, headerRole)
		);
	}

	// UPDATE
	@PutMapping("/{id}")
	public ResponseEntity<UserResponse> updateUser(
			@PathVariable String id,
			@RequestBody UpdateUserRequest request,
			@RequestHeader("Authorization") String authHeader,
			@RequestHeader("X-User-Id") String headerUserId,
			@RequestHeader("X-User-Role") String headerRole
	) {
		return ResponseEntity.ok(
				userService.updateUser(id, request, authHeader, headerUserId, headerRole)
		);
	}

	//  DELETE
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(
			@PathVariable String id,
			@RequestHeader("Authorization") String authHeader,
			@RequestHeader("X-User-Id") String headerUserId,
			@RequestHeader("X-User-Role") String headerRole
	) {
		userService.deleteUser(id, authHeader, headerUserId, headerRole);
		return ResponseEntity.ok("User deleted");
	}

	//  ROLE
	@PutMapping("/{id}/role")
	public ResponseEntity<String> updateRole(
			@PathVariable String id,
			@RequestParam("role") String roleParam,
			@RequestHeader("Authorization") String authHeader,
			@RequestHeader("X-User-Id") String headerUserId,
			@RequestHeader("X-User-Role") String headerRole
	) {
		userService.updateUserRole(id, roleParam, authHeader, headerUserId, headerRole);
		return ResponseEntity.ok("Role updated");
	}

	//  GET ALL
	@GetMapping("/all")
	public ResponseEntity<List<UserResponse>> getAllUsers(
			@RequestHeader("Authorization") String authHeader,
			@RequestHeader("X-User-Id") String headerUserId,
			@RequestHeader("X-User-Role") String headerRole
	) {
		return ResponseEntity.ok(
				userService.getAllUsers(authHeader, headerUserId, headerRole)
		);
	}
}