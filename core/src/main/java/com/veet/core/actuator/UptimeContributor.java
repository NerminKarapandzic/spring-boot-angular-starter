package com.veet.core.actuator;

import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;

@Component
public class UptimeContributor implements InfoContributor {

    private final long startTime;

    public UptimeContributor() {
      this.startTime = System.currentTimeMillis();
    }

    @Override
    public void contribute(Info.Builder builder) {
      builder.withDetail("uptime", System.currentTimeMillis() - startTime);
    }

}
