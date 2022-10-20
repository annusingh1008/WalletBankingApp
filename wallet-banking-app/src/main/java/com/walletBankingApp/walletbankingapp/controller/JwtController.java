//package com.walletBankingApp.walletbankingapp.controller;
//
////import com.walletBankingApp.walletbankingapp.entity.Credentials;
////import com.walletBankingApp.walletbankingapp.helper.JwtUtil;
////import com.walletBankingApp.walletbankingapp.service.CustomUserDetailsService;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.http.ResponseEntity;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
////import org.springframework.security.core.userdetails.UserDetails;
////import org.springframework.security.core.userdetails.UsernameNotFoundException;
////import org.springframework.web.bind.annotation.PostMapping;
////import org.springframework.web.bind.annotation.RequestBody;
////import org.springframework.web.bind.annotation.RestController;
////
////@RestController
////public class JwtController {
////
////    @Autowired
////    private AuthenticationManager authenticationManager;
////
////    @Autowired
////    private CustomUserDetailsService customUserDetailsService;
////
////    @Autowired
////    private JwtUtil jwtUtil;
////
////    @PostMapping(value = "/token")
////    public ResponseEntity<?> generateToken(@RequestBody Credentials credentials) throws Exception {
////        System.out.println(credentials.toString());
////        try{
////            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword()));
////        }catch (UsernameNotFoundException e){
////            e.printStackTrace();
////            throw new Exception("Bad credentials");
////        }
////
////        UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(credentials.getEmail());
////        System.out.println("userDetails "+userDetails);
////
////        String token = this.jwtUtil.generateToken(userDetails);
////        System.out.println("Token is generated");
////        System.out.println(token +" my token");
////
////        return ResponseEntity.ok(new JwtResponse(token));
////    }
////}
//
//import java.util.Objects;
//
//import com.walletBankingApp.walletbankingapp.entity.JwtRequest;
//import com.walletBankingApp.walletbankingapp.entity.JwtResponse;
//import com.walletBankingApp.walletbankingapp.helper.JwtUtil;
//import com.walletBankingApp.walletbankingapp.service.CustomUserDetailsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@CrossOrigin("http://localhost:3000")
//public class JwtController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private CustomUserDetailsService userDetailsService;
//
//    @RequestMapping(method = RequestMethod.POST, value = "/token")
//    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
//        System.out.println("12345678");
//        System.out.println(jwtRequest);
//
//        try{
//            System.out.println("12345");
//            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(),jwtRequest.getPassword()));
//        }
//        catch (UsernameNotFoundException e){
//            e.printStackTrace();
//            System.out.println("Bad Credentials");
//        }catch (BadCredentialsException e){
//            e.printStackTrace();
//            throw new BadCredentialsException("Bad Credentials");
//        }
//
//        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getEmail());
//        System.out.println(userDetails);
//        String token = this.jwtUtil.generateToken(userDetails);
//        System.out.println(userDetails.getUsername());
//        System.out.println("JWT token "+ token);
//        return ResponseEntity.ok(new JwtResponse(token));
//    }
//}
