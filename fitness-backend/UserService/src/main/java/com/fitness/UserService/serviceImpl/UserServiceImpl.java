

package com.fitness.UserService.serviceImpl;

import com.fitness.UserService.Enums.UserRole;
import com.fitness.UserService.Repository.UserRepository;
import com.fitness.UserService.dto.*;
import com.fitness.UserService.models.User;
import com.fitness.UserService.service.UserService;
import com.fitness.UserService.userConfig.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	//COMMON AUTH VALIDATION
	private UserContext validateAndExtract(String authHeader,
	                                       String headerUserId,
	                                       String headerRole) {

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");
		}

		String token = authHeader.substring(7);

		if (!jwtUtil.validateToken(token)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
		}

		String tokenUserId = jwtUtil.extractUserId(token);
		String tokenRole = jwtUtil.extractRole(token);

		// Anti-spoof check
		if (!tokenUserId.equals(headerUserId) || !tokenRole.equals(headerRole)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Header spoofing detected");
		}

		return new UserContext(tokenUserId, tokenRole);
	}

	// REGISTER
	@Override
    @CacheEvict(value = "users_all", allEntries = true)

    public UserResponse register(RegisterRequest request) {

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
		}

		User user = new User();
		user.setEmail(request.getEmail());
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(UserRole.ROLE_USER);

		try {
			return map(userRepository.save(user));
		} catch (DataIntegrityViolationException e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Email exists");
		}
	}

	// LOGIN

public UserResponse validateLogin(LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

    boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());

    System.out.println("LOGIN EMAIL: " + request.getEmail());
    System.out.println("PASSWORD MATCH: " + matches);

    if (!matches) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    return map(user);
}
	

	//  GET USER
	@Override
	@Cacheable(value = "users", key = "#p0")
	public UserResponse getUserById(String requestedId,
	                                String authHeader,
	                                String headerUserId,
	                                String headerRole) {

		UserContext ctx = validateAndExtract(authHeader, headerUserId, headerRole);

		if (!isAdmin(ctx.role) && !requestedId.equals(ctx.userId)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}

		return map(userRepository.findById(requestedId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
	}

	// UPDATE
	@Override
    @Caching(evict = {
            @CacheEvict(value = "users", key = "#id"),
            @CacheEvict(value = "users_all", allEntries = true)
    })
    public UserResponse updateUser(String id,
	                               UpdateUserRequest req,
	                               String authHeader,
	                               String headerUserId,
	                               String headerRole) {

		UserContext ctx = validateAndExtract(authHeader, headerUserId, headerRole);

		if (!isAdmin(ctx.role) && !id.equals(ctx.userId)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}

		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

		user.setFirstName(req.getFirstName());
		user.setLastName(req.getLastName());

		return map(userRepository.save(user));
	}

	//  DELETE
	@Override
    @Caching(evict = {
            @CacheEvict(value = "users", key = "#id"),
            @CacheEvict(value = "users_all", allEntries = true)
    })
	public void deleteUser(String id,
	                       String authHeader,
	                       String headerUserId,
	                       String headerRole) {

		UserContext ctx = validateAndExtract(authHeader, headerUserId, headerRole);

		if (!isAdmin(ctx.role)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}

		userRepository.deleteById(id);
	}

	// ROLE
	@Override
    @Caching(evict = {@CacheEvict(value = "users", key = "#id"),
            @CacheEvict(value = "users_all", allEntries = true)
    })
	public void updateUserRole(String id, String roleParam, String authHeader, String headerUserId, String headerRole) {

		UserContext ctx = validateAndExtract(authHeader, headerUserId, headerRole);

		if (!isAdmin(ctx.role)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}

		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

		user.setRole(UserRole.valueOf(roleParam));
		userRepository.save(user);
	}

	//  GET ALL
	@Override
	@Cacheable(value = "users_all", key = "'all'")

	public List<UserResponse> getAllUsers(String authHeader, String headerUserId, String headerRole) {

		UserContext ctx = validateAndExtract(authHeader, headerUserId, headerRole);

		if (!isAdmin(ctx.role)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}

		List<UserResponse> list = new ArrayList<>();

		for (User u : userRepository.findAll()) {
			list.add(map(u));
		}

		return list;
	}

	// HELPERS

	private boolean isAdmin(String role) {
		return "ROLE_ADMIN".equals(role);
	}

	private UserResponse map(User u) {
		return UserResponse.builder()
				.id(u.getId())
				.email(u.getEmail())
				.firstName(u.getFirstName())
				.lastName(u.getLastName())
				.role(u.getRole().name())
				.createdAt(u.getCreatedAt())
				.updatedAt(u.getUpdatedAt())
				.build();
	}

	//  internal class
	private record UserContext(String userId, String role) {}
}
