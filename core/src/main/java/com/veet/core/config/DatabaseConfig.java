package com.veet.core.config;

import com.veet.core.model.entity.User;
import com.veet.core.model.repository.UserRepository;
import java.util.HashMap;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

@Configuration
@EnableJpaRepositories(
    basePackageClasses = UserRepository.class,
    entityManagerFactoryRef = "entityManagerFactory"
)
public class DatabaseConfig {
  @Value("${pgsql.url}") String url;
  @Value("${pgsql.user}") String username;
  @Value("${pgsql.password}") String password;

  @Bean public DataSource coreDatasource() {
    return DataSourceBuilder.create()
        .driverClassName("org.postgresql.Driver")
        .url(url)
        .username(username)
        .password(password)
        .build();
  }

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder,
      @Qualifier("coreDatasource") DataSource dataSource) {
    HashMap<String, String> properties = new HashMap<>();
    properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
    properties.put("hibernate.hbm2ddl.auto", "create");

    return builder
        .dataSource(dataSource)
        .packages(User.class)
        .persistenceUnit("veet")
        .properties(properties)
        .build();
  }
}
