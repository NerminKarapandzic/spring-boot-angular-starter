package com.veet.core.api.controller.users;

import com.veet.core.api.dto.request.CreateUserRequest;
import com.veet.core.api.service.users.UserService;
import com.veet.core.model.entity.User;
import com.veet.core.security.AppRoles;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {

  private final UserService userService;

  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody @Validated CreateUserRequest request) {
    var response = userService.createUser(request);
    return ResponseEntity.ok(response);
  }

  /**
   * Only SUPERADMIN role should be able to access any user information.
   * To access your own information, use /api/me endpoint.
   */
  @GetMapping("/{id}")
  @RolesAllowed(AppRoles.SUPER_ADMIN)
  public ResponseEntity<User> getUser(@PathVariable String id) {
    return ResponseEntity.ok(userService.getUser(id));
  }
}
