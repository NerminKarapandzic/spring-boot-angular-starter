package com.veet.core.security.filters;

import com.veet.core.security.tokens.JwtAuthenticationToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

  private final AuthenticationManager authenticationManager;

  public JwtTokenAuthenticationFilter(
      AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String token = request.getHeader("Authorization");

    if(token == null || !token.startsWith("Bearer ")){
      /*
       * Continue down the chain, last filter in the chain (FilterSecurityInterceptor) will authorize the request
       * based on the configuration provided in security config class
       */
      filterChain.doFilter(request, response);
      return;
    }

    /*
     * Delegate the validation of the token to the JwtAuthenticationProvider, passed to
     * AuthenticationManager (ProviderManager) in the config class
     */
    JwtAuthenticationToken authentication =
        (JwtAuthenticationToken) authenticationManager
            .authenticate(new JwtAuthenticationToken(token.substring(7)));

    /*
     * Sets the return value from the JwtTokenAuthenticationProvider to the SecurityContextHolder
     * Value will be either an authenticated user or null, either way request continues down the chain
     * and the last filter in the chain will authorize the request based on the provided authentication
     */
    SecurityContextHolder.getContext().setAuthentication(authentication);
    filterChain.doFilter(request, response);
  }
}
