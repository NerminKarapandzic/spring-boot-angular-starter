package com.veet.core.config;

import com.veet.core.security.filters.JwtTokenAuthenticationFilter;
import com.veet.core.security.providers.JwtTokenAuthenticationProvider;
import com.veet.core.security.service.TokenService;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
    securedEnabled = true,
    jsr250Enabled = true
)
public class SecurityConfig {

  @Autowired
  TokenService tokenService;
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http = http.cors().and().csrf().disable();

    http = http
        .sessionManagement().disable();

    http
        .authorizeHttpRequests((authorize) -> {
          authorize.
              requestMatchers("/",
                  "/api/auth/login",
                  "/api/auth/request-verification/**",
                  "/api/auth/reset-password",
                  "/api/auth/verify/**",
                  "/api/auth/register",
                  "/api/auth/request-password-reset/**",
                  "/api/auth/reset-password/**").permitAll()
              .requestMatchers("/_/**", "/actuator/**").hasRole("SUPER_ADMIN")
              .anyRequest().authenticated();
        });

    http.exceptionHandling()
        .authenticationEntryPoint(((request, response, authException) -> {
          response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        }));

    http.addFilterBefore(jwtTokenAuthenticationFilter(), LogoutFilter.class);
    return http.build();
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web
        .debug(false)
        .ignoring()
        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/error");
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:4200"));
    configuration.setAllowedMethods(List.of("GET","POST","PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"));
    configuration.setAllowCredentials(true);
    configuration.setAllowedHeaders(List.of("Authorization", "Requestor-Type", "content-type", "x-requested-with"));
    configuration.setExposedHeaders(List.of("X-Get-Header"));
    configuration.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  public JwtTokenAuthenticationFilter jwtTokenAuthenticationFilter() throws Exception {
    return new JwtTokenAuthenticationFilter(authenticationManager());
  }

  @Bean
  public AuthenticationManager authenticationManager() throws Exception {
    var provider = new JwtTokenAuthenticationProvider(tokenService);
    return new ProviderManager(provider);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
