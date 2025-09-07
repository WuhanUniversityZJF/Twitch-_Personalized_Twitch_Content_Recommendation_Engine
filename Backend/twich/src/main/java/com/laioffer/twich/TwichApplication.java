package com.laioffer.twich;


//import cn.hutool.http.HttpUtil;
import com.laioffer.twich.config.ProxyConfig;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.ConfigurableApplicationContext;

//import org.springframework.http.ResponseEntity;
//import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableFeignClients
@EnableCaching  //
public class TwichApplication {



	public static void main(String[] args) {
		ProxyConfig.setGlobalProxy("127.0.0.1",10809);

		//ConfigurableApplicationContext run = SpringApplication.run(TwichApplication.class, args);

		SpringApplication.run(TwichApplication.class, args);
	}
}
