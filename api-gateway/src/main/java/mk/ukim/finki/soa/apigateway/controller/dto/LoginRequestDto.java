package mk.ukim.finki.soa.apigateway.controller.dto;

import lombok.Data;

@Data
public class LoginRequestDto {

    private String email;
    private String password;
}
