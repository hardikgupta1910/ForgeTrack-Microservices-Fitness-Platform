package com.fitness.AuthService.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class authJwtUtil {

    private final String SECRET = "bXlTdXBlclNlY3JldEtleU15U3VwZXJTZWNyZXRLZXk=";



//    public String generateToken(String username, String role, String userId) {
//        return Jwts.builder()
//                .setSubject(username)
//                .claim("role", role)//  CRITICAL
//                .claim("userId",userId)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
//                .signWith(key)
//                .compact();
//    }
private SecretKey getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET);
    return Keys.hmacShaKeyFor(keyBytes);
}

    public String generateToken(String email, String userId, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(getSigningKey())   // ✅ FIXED
                .compact();
    }


}
