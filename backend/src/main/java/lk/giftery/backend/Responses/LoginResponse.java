package lk.giftery.backend.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String name;
    private long expiresIn;

    public LoginResponse(String name, long expiresIn) {
        this.name = name;
        this.expiresIn = expiresIn;
    }

    
}
