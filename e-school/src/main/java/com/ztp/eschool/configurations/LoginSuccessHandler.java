package com.ztp.eschool.configurations;

import com.ztp.eschool.enums.Role;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {

        SpringDataJpaUserDetails userDetails = (SpringDataJpaUserDetails) authentication.getPrincipal();

        response.sendRedirect(userDetails.hasRole(Role.ADMIN) ? "admin" : "view");
    }

}
