package com.veet.core.model.entity.httpexchange;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Optional;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.actuate.web.exchanges.HttpExchange.Principal;

@Entity
@NoArgsConstructor
@Getter
public class PrincipalEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;

  public PrincipalEntity(Principal principal) {
    if (principal != null) {
      this.name = principal.getName();
    }
  }

  public Principal toPrincipal(PrincipalEntity principal) {
    return new Principal(Optional.ofNullable(principal).map(PrincipalEntity::getName).orElse(null));
  }
}
