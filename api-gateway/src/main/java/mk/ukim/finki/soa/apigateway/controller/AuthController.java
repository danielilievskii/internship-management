package mk.ukim.finki.soa.apigateway.controller;

import mk.ukim.finki.soa.apigateway.controller.dto.LoginRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Value("${keycloak.server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String keycloakRealm;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-secret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) {

        String keycloakUrl = String.format("%s/realms/%s/protocol/openid-connect/token", keycloakServerUrl, keycloakRealm);

        Map<String, String> params = new LinkedHashMap<>();
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("grant_type", "password");
        params.put("username", loginRequest.getEmail());
        params.put("password", loginRequest.getPassword());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        StringBuilder body = new StringBuilder();
        params.forEach((k, v) -> {
            if (!body.isEmpty()) {
                body.append("&");
            }
            body.append(k).append("=").append(v);
        });

        HttpEntity<String> request = new HttpEntity<>(body.toString(), headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(keycloakUrl, HttpMethod.POST, request, String.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials", "message", e.getMessage()));
        }
    }
}
