package com.veet.core.events.handlers;

import com.veet.core.model.entity.Role;
import com.veet.core.model.entity.User;
import com.veet.core.model.repository.RolesRepository;
import com.veet.core.model.repository.UserRepository;
import com.veet.core.security.AppRoles;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationStartedHandlers {

  private final UserRepository userRepository;
  private final RolesRepository rolesRepository;
  private final Environment environment;
  private final PasswordEncoder passwordEncoder;

  public void createSuperAdmin() {
    // First make sure roles are created
    var roles = Stream.of(AppRoles.SUPER_ADMIN)
        .map(role -> rolesRepository.save(new Role(role))).toList();
    log.info("Created roles: {}", roles.stream().map(Role::getName).toList());

    // Check if there is an admin user in the db, if not check if there is properties defined for it and create it
    var superAdmin = userRepository.findSuperAdmin();
    if (superAdmin.isEmpty()) {
      log.info("No super admin found, checking if there is properties defined for it");
      if (environment.containsProperty("super-admin.username") && environment.containsProperty(
          "super-admin.password")) {
        log.info("Creating super admin");
        User superadmin = new User();
        superadmin.setUsername(environment.getProperty("super-admin.username"));
        superadmin.setPassword(passwordEncoder.encode(environment.getProperty("super-admin.password")));
        superadmin.setEmail(environment.getProperty("super-admin.email"));
        superadmin.setRoles(List.of(new Role(AppRoles.SUPER_ADMIN)));
        superadmin.setVerified(true);
        var saved = userRepository.save(superadmin);
        log.info("Super admin created with id: {}", saved.getId());
      }
    }
  }
}
