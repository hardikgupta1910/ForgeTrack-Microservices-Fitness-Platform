package com.fitness.UserService.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
	
	private String id;
	private String email;
	private String firstName;
	private String lastName;
	private String role;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
