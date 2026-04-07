package dev.kaimier.backend.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

  @GetMapping("/health")
  public Map<String, Object> health() {
    return Map.of("ok", true, "service", "backend");
  }

  @GetMapping("/api/hello")
  public Map<String, String> hello() {
    return Map.of("message", "Hello from Spring Boot backend");
  }
}
