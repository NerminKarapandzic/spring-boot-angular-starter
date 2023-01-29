package com.veet.core.model.entity.httpexchange;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Optional;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.actuate.web.exchanges.HttpExchange.Session;

@Entity
@Getter
@NoArgsConstructor
public class SessionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long _id;
  private String id;

  public SessionEntity(Session session) {
    if (session != null) {
      this.id = session.getId();
    }
  }

  public Session toSession(SessionEntity session) {
    return new Session(Optional.ofNullable(session).map(SessionEntity::getId).orElse(null));
  }
}
