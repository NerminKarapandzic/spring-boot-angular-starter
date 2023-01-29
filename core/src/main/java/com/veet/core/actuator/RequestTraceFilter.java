package com.veet.core.actuator;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Set;
import org.springframework.boot.actuate.web.exchanges.HttpExchangeRepository;
import org.springframework.boot.actuate.web.exchanges.Include;
import org.springframework.boot.actuate.web.exchanges.servlet.HttpExchangesFilter;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

@Component
public class RequestTraceFilter extends HttpExchangesFilter {

  private final String[] excludedPatterns = new String[] {"/actuator/**", "/favicon.ico"};

  public RequestTraceFilter(
      HttpExchangeRepository repository,
      Set<Include> includes) {
    super(repository, includes);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    return Arrays.stream(excludedPatterns).anyMatch(pattern -> new AntPathMatcher().match(pattern, request.getRequestURI()));
  }


}
