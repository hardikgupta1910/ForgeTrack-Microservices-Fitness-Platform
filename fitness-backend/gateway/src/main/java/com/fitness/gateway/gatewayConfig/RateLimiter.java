package com.fitness.gateway.gatewayConfig;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component

public class RateLimiter implements GlobalFilter, Ordered {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final int WINDOW = 60;

    public RateLimiter(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        System.out.println("RATE LIMIT FILTER HIT");
        String userId = extractUserId(exchange);
        String role = exchange.getRequest().getHeaders().getFirst("X-User-Role");
        String path = exchange.getRequest().getURI().getPath();

        System.out.println("USER = " + userId);
        System.out.println("PATH = " + path);
        if(userId==null){
            return chain.filter(exchange);
        }
        if (!path.contains("/api") && !path.contains("/ai")) {
            return chain.filter(exchange);
        }


        int limit = getLimit(role, path);
        int window=getWindow(path);


        String key="rate_limit:"+ userId+":"+path;
        if (path.contains("/api/ai/chat")) {
            key = "rate_limit:" + userId + ":ai_chat";
        } else if (path.contains("/api/recommendations")) {
            key = "rate_limit:" + userId + ":ai_recommend";
        } else {
            key = "rate_limit:" + userId + ":default";
        }

        Long count=redisTemplate.opsForValue().increment(key);

        System.out.println("KEY = " + key);
        System.out.println("COUNT = " + count);
        System.out.println("LIMIT = " + limit);
        if (count!=null && count==1){
            redisTemplate.expire(key, Duration.ofSeconds(window));
        }

        if(count!=null && count>limit){
            exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            exchange.getResponse().getHeaders().add("Content-Type", "application/json");

            String body = "{ \"error\": \"Rate limit exceeded\", \"status\": 429 }";


            byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
            DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);

            return exchange.getResponse().writeWith(Mono.just(buffer));

        }

        return chain.filter(exchange);

    }

    @Override
    public int getOrder() {
        return -1;
    }
    private int getLimit(String role, String path) {

        if (path.contains("/api/ai/chat")) {
            return 3;
        }

        if (path.contains("/api/recommendations")) {
            return 2;
        }

        if ("ROLE_ADMIN".equals(role)) {
            return 20;
        }



        return 5;
    }

    private int getWindow(String path) {

        if (path.contains("/api/recommendations")) {
            return 300;
        }

        return 60;
    }

    private String extractUserId(ServerWebExchange exchange) {

        String userId = exchange.getRequest().getHeaders().getFirst("X-User-Id");

        return userId; // already passed from auth filter
    }
}
