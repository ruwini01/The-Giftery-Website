package lk.giftery.backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lk.giftery.backend.Model.User;
import lk.giftery.backend.Repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users =  new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
}
