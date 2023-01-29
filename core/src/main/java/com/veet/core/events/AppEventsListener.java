package com.veet.core.events;

import com.veet.core.events.handlers.ApplicationStartedHandlers;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppEventsListener {

  private final ApplicationStartedHandlers applicationStartedHandlers;

  @EventListener
  public void onAppStartup(ApplicationStartedEvent event) {
    applicationStartedHandlers.createSuperAdmin();
  }
}
