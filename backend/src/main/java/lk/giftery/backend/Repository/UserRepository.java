package lk.giftery.backend.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import lk.giftery.backend.Model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    Optional<User> findByEmail(String email);
    
    Optional<User> findByVerificationCode(String verificationCode);
}
