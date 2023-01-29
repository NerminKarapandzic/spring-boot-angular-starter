package com.veet.core.api.service.users;

import com.veet.core.api.dto.request.CreateUserRequest;
import com.veet.core.exception.AppException;
import com.veet.core.exception.ErrorMessage;
import com.veet.core.model.entity.User;
import com.veet.core.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public User createUser(CreateUserRequest request) {
    ///return new User();
    return null;
  }

  public User getUser(String id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new AppException(ErrorMessage.USER_NOT_FOUND, 404));
  }
}
